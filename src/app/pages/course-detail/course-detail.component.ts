import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';

import { CourseService } from '../../services/course.service';
import { RegisterInterestService } from '../../services/register-interest.service';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'es-course-detail',
  standalone: true,
  imports: [RouterLink, CourseCardComponent, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let state = courseState();

    @if (state.loading) {
      <section class="py-24">
        <div class="container-xl">
          <es-loading-spinner message="Loading course…" />
        </div>
      </section>
    } @else {
      @if (state.course; as course) {
      <section class="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 sm:py-20">
        <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20 uppercase">
              {{ categoryLabel() }}
            </span>
            <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              {{ course.title }}
            </h1>
            <p class="mt-4 text-brand-100 text-lg leading-relaxed">
              {{ course.summary }}
            </p>

            <div class="mt-6 flex flex-wrap gap-3 text-sm">
              <span class="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {{ course.duration }}
              </span>
              <span class="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18M7 14l3-3 4 4 5-6" />
                </svg>
                {{ course.level }}
              </span>
              <span class="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0v-8m0-4h.01" />
                </svg>
                {{ course.delivery }}
              </span>
            </div>

            <div class="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50"
                (click)="openEnrol(course.title)"
              >
                Enrol Now
              </button>
              <button type="button" class="btn-outline-white" (click)="openLogin(course.title)">
                Login to enrol
              </button>
              <a routerLink="/courses" class="btn-outline-white">
                Back to catalog
              </a>
            </div>
          </div>

          <div class="order-first lg:order-last">
            <div class="aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
              <img [src]="course.image" [alt]="course.title" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section class="py-14 sm:py-20 bg-brand-50">
        <div class="container-xl grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div class="lg:col-span-2 space-y-10">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                About this course
              </h2>
              <p class="mt-3 text-slate-700 leading-relaxed">
                {{ course.description }}
              </p>
            </div>

            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                What you'll learn
              </h2>
              <ul class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                @for (outcome of course.outcomes; track outcome) {
                  <li class="flex gap-3 text-sm text-slate-700">
                    <span class="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    </span>
                    {{ outcome }}
                  </li>
                }
              </ul>
            </div>

            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                Who this course is for
              </h2>
              <ul class="mt-4 space-y-2">
                @for (a of course.audience; track a) {
                  <li class="flex gap-3 text-sm text-slate-700">
                    <span class="text-brand-700">•</span>
                    {{ a }}
                  </li>
                }
              </ul>
            </div>
          </div>

          <!-- Sticky enrol card -->
          <aside class="lg:col-span-1">
            <div class="card p-6 lg:sticky lg:top-20">
              <div class="space-y-4 text-sm">
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Duration</span>
                  <span class="font-semibold text-slate-900">{{ course.duration }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Level</span>
                  <span class="font-semibold text-slate-900">{{ course.level }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-slate-500">Delivery</span>
                  <span class="font-semibold text-slate-900 text-right">{{ course.delivery }}</span>
                </div>
              </div>

              <button type="button" class="btn-primary w-full mt-6" (click)="openEnrol(course.title)">
                Enrol Now
              </button>
              <button type="button" class="btn-secondary w-full mt-3" (click)="openLogin(course.title)">
                Login to enrol
              </button>
            </div>
          </aside>
        </div>
      </section>

      <!-- Related courses -->
      @if (related().length > 0) {
        <section class="py-14 sm:py-20 bg-slate-50">
          <div class="container-xl">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-8">
              Related courses
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (c of related(); track c.id) {
                <es-course-card [data]="c"></es-course-card>
              }
            </div>
          </div>
        </section>
      }
    } @else {
      <section class="py-24">
        <div class="container-xl text-center">
          <h1 class="text-3xl font-extrabold text-slate-900">
            Course not found
          </h1>
          <p class="mt-3 text-slate-600">
            The course you're looking for doesn't exist or has moved.
          </p>
          <a routerLink="/courses" class="mt-6 btn-primary inline-flex">
            Browse all courses
          </a>
        </div>
      </section>
    }
    }
  `
})
export class CourseDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly courseService = inject(CourseService);
  private readonly interest = inject(RegisterInterestService);

  readonly courseState = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => this.courseService.getCourseByIdState(id))
    ),
    { initialValue: { loading: true, course: undefined } }
  );

  private readonly relatedSig = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => this.courseService.getCourseByIdState(id)),
      switchMap((state) =>
        state.course ? this.courseService.getRelatedCourses(state.course, 3) : of([])
      )
    ),
    { initialValue: [] }
  );

  readonly related = computed(() => this.relatedSig());

  readonly categoryLabel = computed(() => {
    const cat = this.courseState()?.course?.category ?? '';
    return cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  });

  openEnrol(courseTitle: string): void {
    this.interest.open({ intent: 'enrol', course: courseTitle });
  }

  openLogin(courseTitle: string): void {
    this.interest.open({ intent: 'login', course: courseTitle });
  }
}
