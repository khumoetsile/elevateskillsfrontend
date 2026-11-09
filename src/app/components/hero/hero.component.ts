import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { BRAND } from '../../config/brand.constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'es-hero',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="page-hero__glow" aria-hidden="true"></div>

      <div class="container-xl relative py-7 sm:py-8 lg:py-9">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          <div class="order-2 lg:order-1">
            <span class="page-hero__eyebrow">
              Botswana's Online Learning Platform
            </span>

            <h1
              class="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white"
            >
              Practical Skills.<br />
              Flexible Learning.<br />
              <span class="text-brand-200">Real Growth.</span>
            </h1>

            <p
              class="mt-3 text-sm sm:text-base text-slate-100/90 max-w-2xl leading-relaxed"
            >
              Elevate Skills is Botswana’s online learning platform for individuals,
              professionals, entrepreneurs, trainers and organisations seeking
              practical, workplace-ready skills through flexible, accessible and
              measurable online training.
            </p>

            <form
              (ngSubmit)="onSearch()"
              class="mt-4 bg-white rounded-2xl shadow-xl p-2 sm:p-2.5 flex flex-col sm:flex-row gap-2"
            >
              <div class="flex-1 flex items-center gap-3 px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 text-slate-400 flex-shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
                <input
                  type="text"
                  [(ngModel)]="query"
                  name="q"
                  placeholder="Search for courses, skills, or topics"
                  class="flex-1 bg-transparent text-slate-800 placeholder-slate-400 focus:outline-none py-3 text-sm sm:text-base"
                />
              </div>
              <button type="submit" class="btn-primary w-full sm:w-auto">
                Search
              </button>
            </form>

            <div class="mt-4 flex flex-wrap gap-2.5">
              <a routerLink="/courses" class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50">
                Browse Courses
              </a>
              @if (auth.user()) {
                <button type="button" class="btn-outline-white" (click)="auth.openLearnerPortal()">
                  My learning
                </button>
              } @else {
                <a routerLink="/register" class="btn-outline-white">Register</a>
                <a routerLink="/login" class="btn-outline-white">Login</a>
              }
              <a routerLink="/for-business" class="btn-outline-white">
                For Corporates
              </a>
            </div>

            <p
              class="mt-4 text-xs sm:text-sm text-white/90 font-medium tracking-wide"
            >
              Self-Paced Courses
              <span class="mx-2 text-white/40">|</span>
              Certificates of Completion
              <span class="mx-2 text-white/40">|</span>
              Learn Anywhere, Anytime
              <span class="mx-2 text-white/40">|</span>
              Workplace-Ready Skills
            </p>
          </div>

          <div class="relative order-1 lg:order-2 lg:pl-4">
            <div
              class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
            >
              <img
                [src]="BRAND.heroHome"
                alt="Professionals celebrating skills development and training success"
                class="w-full h-full object-cover object-center"
                decoding="async"
                fetchpriority="high"
              />
            </div>
            <div
              class="absolute -bottom-4 left-4 sm:-bottom-6 sm:left-6 bg-white rounded-xl shadow-xl px-5 py-4 border border-white/80 max-w-[220px]"
            >
              <p class="text-2xl font-extrabold text-brand-900 leading-none">100%</p>
              <p class="mt-1 text-sm text-slate-600 leading-snug">
                Online and flexible learning
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {
  readonly BRAND = BRAND;
  readonly auth = inject(AuthService);
  query = '';

  constructor(private readonly router: Router) {}

  onSearch(): void {
    const q = this.query.trim();
    this.router.navigate(['/courses'], {
      queryParams: q ? { q } : undefined
    });
  }
}
