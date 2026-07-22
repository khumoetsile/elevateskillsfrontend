import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, of, switchMap } from 'rxjs';

import { CourseService } from '../../services/course.service';
import { RegisterInterestService } from '../../services/register-interest.service';
import { isTalentLmsCourseImage } from '../../utils/course-image';
import { decodeHtmlEntities } from '../../utils/html-entities';
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
      <section class="relative overflow-hidden bg-gradient-to-br from-brand-950 to-brand-800 text-white">
        <!-- Decorative blurred background derived from the course image (if present) -->
        @if (course.image) {
          <img
            [src]="course.image"
            aria-hidden="true"
            decoding="async"
            class="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-[1.05] opacity-30 pointer-events-none"
          />
        }

        <div class="relative py-4 sm:py-6">
          <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-6 items-center min-h-[140px]">
            <div class="z-10">
                <h1 class="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                  {{ course.title }}
                </h1>
            </div>

            <!-- Visual card: framed image that reads well even when source is small -->
            <div class="order-first lg:order-last flex justify-center lg:justify-end z-10">
              @if (isLmsImage(course.image)) {
                <div class="w-[200px] shrink-0 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white/5">
                  <img
                    [src]="course.image"
                    [alt]="course.title"
                    width="200"
                    height="120"
                    decoding="async"
                    class="block w-full h-auto"
                  />
                </div>
              } @else {
                <div class="w-full max-w-sm aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 bg-white/5">
                  <img
                    [src]="course.image"
                    [alt]="course.title"
                    decoding="async"
                    class="w-full h-full object-cover"
                    style="height:120px;"
                  />
                </div>
              }
            </div>
          </div>
        </div>
      </section>

      <!-- Moved course meta, summary and CTAs below the banner -->
      <section class="py-8 sm:py-12 bg-brand-50">
        <div class="container-xl">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div class="lg:col-span-2">
              <div class="rounded-[2rem] bg-white/95 p-6 sm:p-8 shadow-sm ring-1 ring-slate-200">
                <span class="inline-flex items-center gap-2 rounded-full bg-brand-100/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-slate-200 uppercase">
                  {{ categoryLabel() }}
                </span>

                <p class="mt-4 text-slate-700 text-lg leading-relaxed">
                  {{ course.summary }}
                </p>

                <div class="mt-5 flex flex-wrap gap-3 text-sm">
                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    {{ course.duration }}
                  </span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M3 3v18h18M7 14l3-3 4 4 5-6" />
                    </svg>
                    {{ course.level }}
                  </span>
                  <span class="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-slate-700 ring-1 ring-slate-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0v-8m0-4h.01" />
                    </svg>
                    {{ course.delivery }}
                  </span>
                </div>

                <div class="mt-7 border-t border-slate-200 pt-6 flex flex-wrap gap-3 items-center">
                  <a [routerLink]="['/checkout', course.id]" class="btn-primary bg-brand-800 text-white">
                    Enrol Now{{ priceSuffix(course.price) }}
                  </a>
                  <button type="button" class="btn-outline" (click)="openLogin(course.title)">
                    Login to enrol
                  </button>
                  <a routerLink="/courses" class="btn-outline">
                    Back to catalog
                  </a>
                </div>
              </div>
            </div>

            <!-- right column: enrol card placed next to the summary/actions -->
            <aside class="lg:col-span-1">
              <div class="card p-6">
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
                  @if (priceLabel(course.price); as label) {
                    <div class="flex items-center justify-between pt-3 border-t border-slate-200">
                      <span class="text-slate-500">Price</span>
                      <span class="font-extrabold text-brand-800 text-lg">{{ label }}</span>
                    </div>
                  }
                  @if (certificateLabel(course.certification); as certLabel) {
                    <div class="flex items-center justify-between">
                      <span class="text-slate-500">Certificate</span>
                      <span class="font-semibold text-slate-900 text-right">{{ certLabel }}</span>
                    </div>
                  }
                </div>

                <a [routerLink]="['/checkout', course.id]" class="btn-primary w-full mt-6 inline-flex justify-center">
                  Enrol Now
                </a>
                <button type="button" class="btn-secondary w-full mt-3" (click)="openLogin(course.title)">
                  Login to enrol
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="py-14 sm:py-20 bg-slate-50">
        <div class="container-xl">
          <div class="space-y-10">
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                About this course
              </h2>
              @if (descriptionHtml(course); as html) {
                <div
                  class="mt-3 text-slate-700 leading-relaxed prose prose-slate max-w-none [&_br]:block [&_br]:mb-2"
                  [innerHTML]="html"
                ></div>
              } @else {
                <p class="mt-3 text-slate-700 leading-relaxed">
                  {{ course.description }}
                </p>
              }
            </div>

            @if (course.outcomes.length > 0) {
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
            }

            @if (course.units && course.units.length > 1) {
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                Course content
              </h2>
              <ul class="mt-4 space-y-2">
                @for (unit of course.units; track unit.id) {
                  <li class="flex gap-3 text-sm text-slate-700">
                    <span class="text-brand-700">•</span>
                    {{ unit.name }}
                  </li>
                }
              </ul>
            </div>
            }

            @if (course.audience.length > 0) {
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
            }

            @if (course.rules && course.rules.length > 0) {
            <div>
              <h2 class="text-2xl font-extrabold text-slate-900">
                Completion requirements
              </h2>
              <ul class="mt-4 space-y-2">
                @for (rule of course.rules; track rule) {
                  <li class="flex gap-3 text-sm text-slate-700">
                    <span class="text-brand-700">•</span>
                    {{ rule }}
                  </li>
                }
              </ul>
            </div>
            }
          </div>
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
  private readonly sanitizer = inject(DomSanitizer);

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

  openLogin(courseTitle: string): void {
    this.interest.open({ intent: 'login', course: courseTitle });
  }

  isLmsImage(url: string): boolean {
    return isTalentLmsCourseImage(url);
  }

  descriptionHtml(course: { descriptionHtml?: string }): SafeHtml | null {
    const html = course.descriptionHtml?.trim();
    if (!html) return null;
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  priceLabel(price: string): string {
    const raw = decodeHtmlEntities((price || '').trim());
    if (!raw || raw === '0' || raw === '0.00') return 'Free';
    // Already carries a currency marker (e.g. "$14.68") — show as-is.
    return /^[0-9.,\s]+$/.test(raw) ? `BWP ${raw}` : raw;
  }

  priceSuffix(price: string): string {
    const label = this.priceLabel(price);
    return label === 'Free' ? '' : ` — ${label}`;
  }

  /** Public-facing certificate label — hide LMS placeholder names. */
  certificateLabel(value: string | undefined): string | null {
    const raw = (value ?? '').trim();
    if (!raw) return null;
    const lower = raw.toLowerCase();
    if (
      lower.includes('template') ||
      lower === 'null' ||
      lower === 'none' ||
      lower === 'n/a' ||
      lower === '-'
    ) {
      return 'Certificate of completion';
    }
    return raw;
  }
}
