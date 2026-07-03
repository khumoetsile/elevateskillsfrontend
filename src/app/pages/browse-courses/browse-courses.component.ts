import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { CourseService } from '../../services/course.service';
import { CourseLevel } from '../../models/course.model';

@Component({
  selector: 'es-browse-courses',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CourseCardComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 sm:py-20">
      <div class="container-xl">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
          Course Catalog
        </span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Browse our online courses
        </h1>
        <p class="mt-3 text-brand-100 max-w-2xl leading-relaxed">
          Practical training across business, digital, finance, entrepreneurship,
          and personal development.
        </p>
      </div>
    </section>

    <section class="py-10 sm:py-14 bg-brand-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <!-- Sidebar filters -->
          <aside class="lg:col-span-1">
            <div class="card p-5 lg:sticky lg:top-20">
              <div>
                <label class="label-base">Search</label>
                <input
                  type="text"
                  [(ngModel)]="query"
                  (ngModelChange)="onQueryChange($event)"
                  placeholder="Search courses..."
                  class="input-base"
                />
              </div>

              <div class="mt-6">
                <h4 class="label-base !mb-2">Category</h4>
                @if (catalogLoading()) {
                  <es-loading-spinner
                    message="Loading categories…"
                    [compact]="true"
                    size="sm"
                  />
                } @else {
                  <div class="space-y-2">
                    <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value=""
                        [checked]="selectedCategory() === ''"
                        (change)="setCategory('')"
                        class="text-brand-700 focus:ring-brand-600"
                      />
                      All categories
                    </label>
                    @for (cat of categories(); track cat.id) {
                      <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                        <input
                          type="radio"
                          name="category"
                          [value]="cat.id"
                          [checked]="selectedCategory() === cat.id"
                          (change)="setCategory(cat.id)"
                          class="text-brand-700 focus:ring-brand-600"
                        />
                        {{ cat.name }}
                      </label>
                    }
                  </div>
                }
              </div>

              <div class="mt-6">
                <h4 class="label-base !mb-2">Level</h4>
                <div class="space-y-2">
                  <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      value=""
                      [checked]="selectedLevel() === ''"
                      (change)="setLevel('')"
                      class="text-brand-700 focus:ring-brand-600"
                    />
                    All levels
                  </label>
                  @for (lvl of levels; track lvl) {
                    <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        [value]="lvl"
                        [checked]="selectedLevel() === lvl"
                        (change)="setLevel(lvl)"
                        class="text-brand-700 focus:ring-brand-600"
                      />
                      {{ lvl }}
                    </label>
                  }
                </div>
              </div>

              <button
                type="button"
                (click)="clearFilters()"
                class="mt-6 w-full btn-secondary"
              >
                Clear filters
              </button>
            </div>
          </aside>

          <!-- Courses grid -->
          <div class="lg:col-span-3">
            <div class="flex items-center justify-between mb-5">
              <p class="text-sm text-slate-600">
                Showing
                <span class="font-semibold text-slate-900">{{ filtered().length }}</span>
                of {{ (allCourses$ | async)?.length ?? 0 }} courses
              </p>
            </div>

            @if (catalogLoading()) {
              <es-loading-spinner message="Loading courses…" />
            } @else if (filtered().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                @for (course of filtered(); track course.id) {
                  <es-course-card [data]="course"></es-course-card>
                }
              </div>
            } @else {
              <div class="card p-10 text-center">
                <h3 class="text-lg font-bold text-slate-900">No courses found</h3>
                <p class="mt-2 text-slate-600 text-sm">
                  Try adjusting your search or filters.
                </p>
                <button
                  type="button"
                  (click)="clearFilters()"
                  class="mt-5 btn-primary"
                >
                  Clear filters
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class BrowseCoursesComponent {
  private readonly courseService = inject(CourseService);
  private readonly route = inject(ActivatedRoute);

  readonly categories$ = this.courseService.getCategories();
  readonly categories = toSignal(this.categories$, { initialValue: [] });
  readonly levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

  readonly allCourses$ = this.courseService.getAllCourses();
  readonly catalogLoading = toSignal(this.courseService.catalogLoading$, {
    initialValue: true
  });
  private readonly allCoursesSig = toSignal(this.allCourses$, {
    initialValue: []
  });

  query = '';
  readonly querySig = signal('');
  readonly selectedCategory = signal('');
  readonly selectedLevel = signal<CourseLevel | ''>('');

  readonly filtered = computed(() => {
    const courses = this.allCoursesSig();
    const q = this.querySig().toLowerCase().trim();
    const cat = this.selectedCategory();
    const lvl = this.selectedLevel();

    return courses.filter((c) => {
      const matchQ =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q);
      const matchCat = !cat || c.category === cat;
      const matchLvl = !lvl || c.level === lvl;
      return matchQ && matchCat && matchLvl;
    });
  });

  constructor() {
    this.route.queryParamMap
      .pipe(takeUntilDestroyed())
      .subscribe((params) => {
        const q = params.get('q') ?? '';
        const category = params.get('category') ?? '';
        const level = (params.get('level') as CourseLevel | null) ?? '';
        this.query = q;
        this.querySig.set(q);
        this.selectedCategory.set(category);
        this.selectedLevel.set(level);
      });
  }

  onQueryChange(value: string): void {
    this.querySig.set(value);
  }

  setCategory(value: string): void {
    this.selectedCategory.set(value);
  }

  setLevel(value: CourseLevel | ''): void {
    this.selectedLevel.set(value);
  }

  clearFilters(): void {
    this.query = '';
    this.querySig.set('');
    this.selectedCategory.set('');
    this.selectedLevel.set('');
  }
}
