import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import {
  catchError,
  finalize,
  map,
  shareReplay,
  startWith,
  switchMap,
  timeout
} from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Course, CourseLevel } from '../models/course.model';
import { Category } from '../models/category.model';
import { Testimonial } from '../models/testimonial.model';
import { MOCK_COURSES } from '../data/mock-courses';
import { MOCK_CATEGORIES } from '../data/mock-categories';
import { MOCK_TESTIMONIALS } from '../data/mock-testimonials';
import { LmsService } from './lms.service';

const { courses: COURSES_API, categories: CATEGORIES_API } = environment.api;

interface RemoteCourseDto {
  id: string;
  name: string;
  code?: string;
  description?: string;
  price?: string;
  status?: string;
  level?: string;
  image?: string;
  category_id?: string;
  category_slug?: string;
  shared?: boolean;
  shared_url?: string;
  hide_from_catalog?: boolean;
  certification?: string;
  certification_duration?: string;
  creation_date?: string;
  lms_url?: string;
}

interface RemoteCategoryDto {
  id: string;
  name: string;
  slug: string;
  parent_category_id: string | null;
  price?: string;
}

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop&q=70';

const CATALOG_FETCH_TIMEOUT_MS = 15000;

export interface CourseLoadState {
  loading: boolean;
  course?: Course;
}

@Injectable({ providedIn: 'root' })
export class CourseService {
  private readonly http = inject(HttpClient);
  private readonly lms = inject(LmsService);
  private readonly courses$: Observable<Course[]>;
  private readonly categories$: Observable<Category[]>;
  private readonly catalogLoadingSubject = new BehaviorSubject(true);
  readonly catalogLoading$ = this.catalogLoadingSubject.asObservable();

  constructor() {
    const remoteCategories$ = this.http
      .get<RemoteCategoryDto[]>(CATEGORIES_API)
      .pipe(
        timeout(CATALOG_FETCH_TIMEOUT_MS),
        map((items) => items.map((c) => this.mapCategory(c))),
        catchError(() => of<Category[]>([]))
      );

    const remoteCourses$ = this.http
      .get<RemoteCourseDto[]>(COURSES_API)
      .pipe(
        timeout(CATALOG_FETCH_TIMEOUT_MS),
        map((items) => items.map((c) => this.mapCourse(c))),
        catchError(() => of<Course[] | null>(null))
      );

    const catalogFetch$ = forkJoin({
      categories: remoteCategories$,
      courses: remoteCourses$
    }).pipe(
      catchError(() => of({ categories: [] as Category[], courses: null as Course[] | null })),
      finalize(() => this.catalogLoadingSubject.next(false)),
      shareReplay(1)
    );

    this.categories$ = catalogFetch$.pipe(
      map(({ categories }) => this.mergeCategories(categories))
    );

    this.courses$ = catalogFetch$.pipe(
      map(({ courses }) => (courses && courses.length ? courses : MOCK_COURSES))
    );

    // Start fetch immediately — do not wait for a template subscription
    // (home hides async pipes behind the loading spinner).
    catalogFetch$.subscribe();
  }

  getAllCourses(): Observable<Course[]> {
    return this.courses$;
  }

  getCourseById(id: string): Observable<Course | undefined> {
    return this.getCourseByIdState(id).pipe(map((state) => state.course));
  }

  getCourseByIdState(id: string): Observable<CourseLoadState> {
    if (!id) return of({ loading: false, course: undefined });

    const fetch$ = this.http
      .get<RemoteCourseDto>(`${COURSES_API}/${encodeURIComponent(id)}`)
      .pipe(
        timeout(CATALOG_FETCH_TIMEOUT_MS),
        map((raw) => ({ loading: false, course: this.mapCourse(raw) })),
        catchError(() => of({ loading: false, course: undefined })),
        switchMap((state) =>
          state.course
            ? of(state)
            : this.courses$.pipe(
                map((courses) => ({
                  loading: false,
                  course: courses.find((c) => c.id === id)
                }))
              )
        )
      );

    return fetch$.pipe(startWith({ loading: true, course: undefined }));
  }

  getFeaturedCourses(limit = 6): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) => {
        const featured = courses.filter(
          (c) => c.badge === 'Popular' || c.badge === 'Recommended'
        );
        const fallback = courses.slice(0, limit);
        const list = featured.length ? featured : fallback;
        return list.slice(0, limit);
      })
    );
  }

  getRelatedCourses(course: Course, limit = 3): Observable<Course[]> {
    return this.courses$.pipe(
      map((courses) =>
        courses
          .filter((c) => c.category === course.category && c.id !== course.id)
          .slice(0, limit)
      )
    );
  }

  getCategories(): Observable<Category[]> {
    return this.categories$;
  }

  getTestimonials(): Observable<Testimonial[]> {
    return of(MOCK_TESTIMONIALS);
  }

  private mergeCategories(remote: Category[]): Category[] {
    if (!remote.length) return MOCK_CATEGORIES;
    const seen = new Set(remote.map((c) => c.id));
    const extras = MOCK_CATEGORIES.filter((c) => !seen.has(c.id));
    return [...remote, ...extras];
  }

  private mapCategory(raw: RemoteCategoryDto): Category {
    const slug = raw.slug || `cat-${raw.id}`;
    const fallback = MOCK_CATEGORIES.find(
      (c) => c.id === slug || c.name.toLowerCase() === (raw.name ?? '').toLowerCase()
    );
    return {
      id: slug,
      name: raw.name || fallback?.name || 'Category',
      description: fallback?.description ?? '',
      icon: fallback?.icon ?? 'briefcase',
      color: fallback?.color ?? 'bg-blue-50 text-blue-700'
    };
  }

  private mapCourse(raw: RemoteCourseDto): Course {
    const id = String(raw.id);
    const description = (raw.description ?? '').replace(/<[^>]+>/g, '').trim();
    const lmsUrl =
      raw.lms_url || raw.shared_url || this.lms.courseUrl(id);

    return {
      id,
      title: raw.name || 'Untitled course',
      summary: this.firstSentence(description) || raw.name || '',
      description: description || raw.name || '',
      image: raw.image || FALLBACK_IMAGE,
      category: raw.category_slug || 'general',
      level: this.mapLevel(raw.level),
      duration: 'Self-paced',
      delivery: 'Online, self-paced',
      audience: [],
      outcomes: [],
      trainer: undefined,
      badge: null,
      lmsUrl
    };
  }

  private mapLevel(level: string | undefined): CourseLevel {
    const v = (level ?? '').toString().toLowerCase();
    if (v === '3' || v === 'advanced') return 'Advanced';
    if (v === '2' || v === 'intermediate') return 'Intermediate';
    return 'Beginner';
  }

  private firstSentence(text: string): string {
    if (!text) return '';
    const trimmed = text.trim();
    const dot = trimmed.indexOf('.');
    if (dot > 30 && dot < 220) return trimmed.slice(0, dot + 1);
    return trimmed.length > 180 ? `${trimmed.slice(0, 180)}…` : trimmed;
  }
}
