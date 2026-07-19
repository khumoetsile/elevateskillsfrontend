import {
  ChangeDetectionStrategy,
  Component,
  Input,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { Course } from '../../models/course.model';
import { isTalentLmsCourseImage } from '../../utils/course-image';

@Component({
  selector: 'es-course-card',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let c = course();
    @if (c) {
      <article
        class="card overflow-hidden flex flex-col group h-full"
      >
        @if (isLmsImage(c.image)) {
          <div class="relative flex items-center justify-center bg-slate-100 h-[160px]">
            <img
              [src]="c.image"
              [alt]="c.title"
              width="240"
              height="160"
              loading="lazy"
              decoding="async"
              class="block w-[240px] max-w-full h-auto"
            />
            @if (c.badge) {
              <span
                class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase"
                [class]="badgeClass()"
              >
                {{ c.badge }}
              </span>
            }
          </div>
        } @else {
          <div class="relative aspect-[16/10] overflow-hidden bg-slate-100">
            <img
              [src]="c.image"
              [alt]="c.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            @if (c.badge) {
              <span
                class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase"
                [class]="badgeClass()"
              >
                {{ c.badge }}
              </span>
            }
          </div>
        }

        <div class="p-5 flex flex-col flex-1">
          <span class="chip self-start mb-3">{{ categoryLabel() }}</span>
          <h3
            class="text-base font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-brand-900 transition"
          >
            {{ c.title }}
          </h3>
          <p class="mt-2 text-sm text-slate-600 line-clamp-2">
            {{ c.summary }}
          </p>

          <div
            class="mt-4 flex items-center gap-3 text-xs text-slate-500"
          >
            <span class="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              {{ c.duration }}
            </span>
            <span class="inline-flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.8"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3 3v18h18M7 14l3-3 4 4 5-6"
                />
              </svg>
              {{ c.level }}
            </span>
          </div>

          <a
            [routerLink]="['/courses', c.id]"
            class="mt-5 inline-flex items-center justify-center font-semibold text-sm text-brand-900 hover:text-brand-950 group/btn self-start"
          >
            View Course
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-4 h-4 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>
      </article>
    }
  `
})
export class CourseCardComponent {
  readonly course = signal<Course | null>(null);

  @Input({ required: true }) set data(value: Course) {
    this.course.set(value);
  }

  readonly badgeClass = computed(() => {
    const badge = this.course()?.badge;
    switch (badge) {
      case 'Popular':
        return 'bg-brand-900 text-white';
      case 'New':
        return 'bg-emerald-600 text-white';
      case 'Recommended':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  });

  readonly categoryLabel = computed(() => {
    const cat = this.course()?.category ?? '';
    return cat
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  });

  isLmsImage(url: string): boolean {
    return isTalentLmsCourseImage(url);
  }
}
