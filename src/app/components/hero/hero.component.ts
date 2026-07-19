import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { BRAND } from '../../config/brand.constants';
import { RegisterInterestService } from '../../services/register-interest.service';

@Component({
  selector: 'es-hero',
  standalone: true,
  imports: [RouterLink, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section
      class="relative overflow-hidden bg-[linear-gradient(to_right,_#0f172a_0%,_#0f172a_55%,_white_100%)] text-white"
    >
      <div
        class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.14),transparent_40%),radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.08),transparent_40%)]"
      ></div>

      <div class="container-xl relative py-16 sm:py-20 lg:py-24">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div class="order-2 lg:order-1">
            <span
              class="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 ring-1 ring-slate-200"
            >
              Botswana's Online Learning Platform
            </span>

            <h1
              class="mt-5 text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight tracking-tight text-white"
            >
              Empowering Skills.<br />
              <span class="text-brand-200">Elevating Potential.</span>
            </h1>

            <p
              class="mt-5 text-base sm:text-lg text-slate-100/90 max-w-2xl leading-relaxed"
            >
              Elevate Skills is Botswana's online learning platform for
              individuals, professionals, entrepreneurs, trainers, and
              organisations seeking to build practical, workplace-ready skills
              through flexible, accessible, and measurable online training.
            </p>

            <form
              (ngSubmit)="onSearch()"
              class="mt-8 bg-white rounded-2xl shadow-xl p-2 sm:p-3 flex flex-col sm:flex-row gap-2"
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

            <div class="mt-8 flex flex-wrap gap-3">
              <a routerLink="/courses" class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50">
                Browse Courses
              </a>
              <button type="button" class="btn-outline-white" (click)="openRegister()">
                Register
              </button>
              <button type="button" class="btn-outline-white" (click)="openLogin()">
                Login
              </button>
              <a routerLink="/for-business" class="btn-outline-white">
                For Corporates
              </a>
            </div>

            <div
              class="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-slate-100/80"
            >
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                Practical, outcomes-driven learning
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                Flexible, accessible training
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-white rounded-full"></span>
                Built for Botswana
              </div>
            </div>
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
  private readonly interest = inject(RegisterInterestService);
  query = '';

  constructor(private readonly router: Router) {}

  openRegister(): void {
    this.interest.open({ intent: 'register' });
  }

  openLogin(): void {
    this.interest.open({ intent: 'login' });
  }

  onSearch(): void {
    const q = this.query.trim();
    this.router.navigate(['/courses'], {
      queryParams: q ? { q } : undefined
    });
  }
}
