import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  signal
} from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BRAND } from '../../config/brand.constants';
import { CourseService } from '../../services/course.service';
import { CourseLevel } from '../../models/course.model';

@Component({
  selector: 'es-browse-courses',
  standalone: true,
  imports: [AsyncPipe, FormsModule, CourseCardComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
            Course Catalog
          </span>
          <h1 class="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            Browse our online courses
          </h1>
          <p class="mt-2 text-brand-100 max-w-xl leading-relaxed text-sm sm:text-base">
            Practical training across business, digital, finance, entrepreneurship,
            and personal development.
          </p>
        </div>
        <div class="aspect-[16/10] max-h-52 lg:max-h-60 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
          <img
            [src]="BRAND.heroCourses"
            alt="Learners collaborating on practical online skills training"
            class="w-full h-full object-cover"
            decoding="async"
          />
        </div>
      </div>
    </section>

    <section class="py-7 sm:py-9 bg-brand-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <!-- Sidebar filters -->
          <aside class="lg:col-span-1">
            <div class="card p-4 lg:sticky lg:top-20">
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

              <div class="mt-4">
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
                    @for (cat of availableCategories(); track cat.id) {
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

              @if (availableLevels().length > 0) {
                <div class="mt-4">
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
                    @for (lvl of availableLevels(); track lvl) {
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
              }

              <button
                type="button"
                (click)="clearFilters()"
                class="mt-4 w-full btn-secondary"
              >
                Clear filters
              </button>
            </div>
          </aside>

          <!-- Courses grid -->
          <div class="lg:col-span-3">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm text-slate-600">
                @if (catalogLoading()) {
                  Loading courses…
                } @else if (filtered().length > 0) {
                  Showing
                  <span class="font-semibold text-slate-900">{{ rangeStart() }}–{{ rangeEnd() }}</span>
                  of
                  <span class="font-semibold text-slate-900">{{ filtered().length }}</span>
                  courses
                } @else {
                  Showing
                  <span class="font-semibold text-slate-900">0</span>
                  of {{ (allCourses$ | async)?.length ?? 0 }} courses
                }
              </p>
            </div>

            @if (catalogLoading()) {
              <es-loading-spinner message="Loading courses…" />
            } @else if (filtered().length > 0) {
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                @for (course of pagedCourses(); track course.id) {
                  <es-course-card [data]="course"></es-course-card>
                }
              </div>

              @if (totalPages() > 1) {
                <nav
                  class="mt-6 flex flex-wrap items-center justify-center gap-2"
                  aria-label="Course pagination"
                >
                  <button
                    type="button"
                    class="btn-secondary !px-3 !py-2"
                    [disabled]="currentPage() <= 1"
                    (click)="goToPage(currentPage() - 1)"
                  >
                    Previous
                  </button>

                  @for (page of pageNumbers(); track page) {
                    <button
                      type="button"
                      class="min-w-[2.25rem] !px-2.5 !py-2 rounded-lg text-sm font-semibold border transition"
                      [class.bg-brand-900]="page === currentPage()"
                      [class.text-white]="page === currentPage()"
                      [class.border-brand-900]="page === currentPage()"
                      [class.bg-white]="page !== currentPage()"
                      [class.text-slate-700]="page !== currentPage()"
                      [class.border-slate-200]="page !== currentPage()"
                      [class.hover:bg-slate-50]="page !== currentPage()"
                      (click)="goToPage(page)"
                      [attr.aria-current]="page === currentPage() ? 'page' : null"
                    >
                      {{ page }}
                    </button>
                  }

                  <button
                    type="button"
                    class="btn-secondary !px-3 !py-2"
                    [disabled]="currentPage() >= totalPages()"
                    (click)="goToPage(currentPage() + 1)"
                  >
                    Next
                  </button>
                </nav>
              }
            } @else {
              <div class="card p-8 text-center">
                <h3 class="text-lg font-bold text-slate-900">No courses found</h3>
                <p class="mt-2 text-slate-600 text-sm">
                  Try adjusting your search or filters.
                </p>
                <button
                  type="button"
                  (click)="clearFilters()"
                  class="mt-4 btn-primary"
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

  readonly BRAND = BRAND;
  readonly pageSize = 9;
  readonly categories$ = this.courseService.getCategories();
  readonly categories = toSignal(this.categories$, { initialValue: [] });
  private readonly levels: CourseLevel[] = ['Beginner', 'Intermediate', 'Advanced'];

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
  readonly currentPage = signal(1);

  /** Only categories that currently have at least one course. */
  readonly availableCategories = computed(() => {
    const courses = this.allCoursesSig();
    return this.categories().filter((cat) =>
      courses.some((c) => c.category === cat.id)
    );
  });

  /** Only levels that currently have at least one course. */
  readonly availableLevels = computed(() => {
    const courses = this.allCoursesSig();
    return this.levels.filter((lvl) => courses.some((c) => c.level === lvl));
  });

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

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / this.pageSize))
  );

  readonly pagedCourses = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize;
    return this.filtered().slice(start, start + this.pageSize);
  });

  readonly rangeStart = computed(() =>
    this.filtered().length === 0 ? 0 : (this.currentPage() - 1) * this.pageSize + 1
  );

  readonly rangeEnd = computed(() =>
    Math.min(this.currentPage() * this.pageSize, this.filtered().length)
  );

  readonly pageNumbers = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const windowSize = 5;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = Math.min(total, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
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
        this.currentPage.set(1);
      });

    effect(() => {
      // Keep page in range when filters shrink the result set.
      const total = this.totalPages();
      if (this.currentPage() > total) {
        this.currentPage.set(total);
      }
    });
  }

  onQueryChange(value: string): void {
    this.querySig.set(value);
    this.currentPage.set(1);
  }

  setCategory(value: string): void {
    this.selectedCategory.set(value);
    this.currentPage.set(1);
  }

  setLevel(value: CourseLevel | ''): void {
    this.selectedLevel.set(value);
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.query = '';
    this.querySig.set('');
    this.selectedCategory.set('');
    this.selectedLevel.set('');
    this.currentPage.set(1);
  }

  goToPage(page: number): void {
    const next = Math.min(Math.max(1, page), this.totalPages());
    this.currentPage.set(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
