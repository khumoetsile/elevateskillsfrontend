import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { HeroComponent } from '../../components/hero/hero.component';
import { CourseCardComponent } from '../../components/course-card/course-card.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { TestimonialComponent } from '../../components/testimonial/testimonial.component';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { BRAND } from '../../config/brand.constants';
import { CourseService } from '../../services/course.service';
import { RegisterInterestService } from '../../services/register-interest.service';

@Component({
  selector: 'es-home',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    HeroComponent,
    CourseCardComponent,
    CategoryCardComponent,
    TestimonialComponent,
    LoadingSpinnerComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-hero></es-hero>

    <!-- Learning partners -->
    <section
      aria-labelledby="partners-heading"
      class="relative overflow-hidden border-b border-slate-200 bg-white"
    >
      <div
        class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-brand-50/80 to-transparent lg:block"
      ></div>
      <div class="container-xl relative py-6 sm:py-7">
        <div class="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
          <div class="max-w-2xl">
            <h2
              id="partners-heading"
              class="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl"
            >
              Quality learning, backed by trusted partners
            </h2>
            <p class="mt-1.5 max-w-xl text-sm leading-relaxed text-slate-600">
              We work with established education and learning technology
              providers to deliver practical, credible online training.
            </p>
          </div>

          <ul
            aria-label="Our learning partners"
            class="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap lg:justify-end"
          >
          @for (partner of BRAND.partners; track partner.name) {
            <li class="partner-card">
              <img
                [src]="partner.image"
                [alt]="partner.name"
                class="h-10 w-full max-w-[140px] object-contain sm:h-11"
                decoding="async"
              />
            </li>
          }
          </ul>
        </div>
      </div>
    </section>

    <!-- Categories -->
    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <span class="chip">Categories</span>
            <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Browse by topic
            </h2>
            <p class="mt-1.5 text-slate-600 max-w-2xl text-sm sm:text-base">
              Find practical online courses across business, tech, finance, and more.
            </p>
          </div>
          <a routerLink="/courses" class="btn-secondary self-start sm:self-end">
            View all courses
          </a>
        </div>

        @if (catalogLoading$ | async) {
          <es-loading-spinner message="Loading categories…" />
        } @else {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            @for (category of categories$ | async; track category.id) {
              <es-category-card [data]="category"></es-category-card>
            }
          </div>
        }
      </div>
    </section>

    <!-- Popular courses -->
    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <span class="chip">Popular</span>
            <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Popular courses right now
            </h2>
            <p class="mt-1.5 text-slate-600 max-w-2xl text-sm sm:text-base">
              Hand-picked courses across in-demand skills, delivered fully online.
            </p>
          </div>
          <a routerLink="/courses" class="btn-secondary self-start sm:self-end">
            Browse all
          </a>
        </div>

        @if (catalogLoading$ | async) {
          <es-loading-spinner message="Loading courses…" />
        } @else {
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            @for (course of featured$ | async; track course.id) {
              <es-course-card [data]="course"></es-course-card>
            }
          </div>
        }
      </div>
    </section>

    <!-- Audience pathways -->
    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="text-center max-w-3xl mx-auto mb-5">
          <span class="chip">Learning Pathways</span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Built for every learner
          </h2>
          <p class="mt-2 text-slate-600 text-sm sm:text-base">
            Whether you're growing your career, your business, or your team,
            Elevate Skills has a path for you.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          @for (audience of audiences; track audience.title) {
            <div class="card p-6 h-full flex flex-col">
              <div
                class="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center mb-4"
              >
                <span class="text-lg font-bold">{{ audience.initial }}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900">
                {{ audience.title }}
              </h3>
              <p class="mt-1.5 text-sm text-slate-600 flex-1">
                {{ audience.description }}
              </p>
              <a routerLink="/courses" class="mt-4 font-semibold text-sm text-brand-700 hover:text-brand-800 inline-flex items-center">
                Start learning
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Why Elevate Skills -->
    <section class="section bg-slate-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <span class="chip">Why Elevate Skills</span>
            <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Practical online training for real-world growth
            </h2>
            <p class="mt-2 text-slate-600 leading-relaxed text-sm sm:text-base">
              We focus on skills that learners can apply immediately, whether
              at work, in business, or for personal development.
            </p>

            <ul class="mt-5 space-y-3">
              @for (value of values; track value.title) {
                <li class="flex gap-4">
                  <div class="w-10 h-10 rounded-lg bg-brand-700 text-white flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="font-semibold text-slate-900">{{ value.title }}</h4>
                    <p class="text-sm text-slate-600 mt-1 leading-relaxed">{{ value.description }}</p>
                  </div>
                </li>
              }
            </ul>
          </div>

          <div class="relative">
            <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=1200&auto=format&fit=crop&q=70"
                alt="African professionals collaborating in a training meeting"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-5 w-56 border border-slate-100">
              <div class="text-3xl font-extrabold text-brand-700">100%</div>
              <div class="text-sm text-slate-600 mt-1">Online & flexible learning</div>
            </div>
            <div class="hidden sm:block absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-5 w-56 border border-slate-100">
              <div class="text-3xl font-extrabold text-brand-700">Botswana</div>
              <div class="text-sm text-slate-600 mt-1">Proudly built & supported locally</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- For Corporates callout -->
    <section class="section">
      <div class="container-xl">
        <div class="rounded-3xl bg-gradient-to-br from-brand-800 to-brand-600 text-white p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <div>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
              For Corporates
            </span>
            <h2 class="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight">
              Scale training across your entire organisation
            </h2>
            <p class="mt-2 text-brand-100 leading-relaxed text-sm sm:text-base">
              Train smarter, track progress, and scale up practical skills
              across departments, teams, and onboarding groups.
            </p>
            <div class="mt-4 flex flex-wrap gap-3">
              <a routerLink="/for-business" class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50">
                Request Corporate Solution
              </a>
              <a routerLink="/contact" class="btn-outline-white">
                Talk to our team
              </a>
            </div>
          </div>
          <ul class="grid grid-cols-2 gap-4 sm:gap-6">
            @for (feature of corporateHighlights; track feature) {
              <li class="bg-white/10 ring-1 ring-white/20 rounded-xl p-4 text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mb-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {{ feature }}
              </li>
            }
          </ul>
        </div>
      </div>
    </section>

    <!-- How it works -->
    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="text-center max-w-2xl mx-auto mb-5">
          <span class="chip">How It Works</span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Start learning in three simple steps
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (step of steps; track step.number) {
            <div class="card p-5 h-full">
              <div class="w-10 h-10 rounded-xl bg-brand-700 text-white flex items-center justify-center text-sm font-bold">
                {{ step.number }}
              </div>
              <h3 class="mt-3 text-base font-bold text-slate-900">
                {{ step.title }}
              </h3>
              <p class="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section">
      <div class="container-xl">
        <div class="text-center max-w-2xl mx-auto mb-5">
          <span class="chip">Testimonials</span>
          <h2 class="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Trusted by learners and organisations
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          @for (t of testimonials$ | async; track t.id) {
            <es-testimonial [data]="t"></es-testimonial>
          }
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-7 sm:py-8 bg-brand-900 text-white">
      <div class="container-xl">
        <div class="text-center max-w-3xl mx-auto">
          <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Start Learning Today
          </h2>
          <p class="mt-2 text-brand-100 text-base leading-relaxed">
            Join hundreds of learners and organisations investing in their
            future with Elevate Skills.
          </p>
          <div class="mt-4 flex flex-wrap justify-center gap-3">
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
        </div>
      </div>
    </section>
  `
})
export class HomeComponent {
  private readonly courseService = inject(CourseService);
  private readonly interest = inject(RegisterInterestService);

  readonly BRAND = BRAND;
  readonly featured$ = this.courseService.getFeaturedCourses(8);
  readonly categories$ = this.courseService.getCategories();
  readonly catalogLoading$ = this.courseService.catalogLoading$;
  readonly testimonials$ = this.courseService.getTestimonials();

  openRegister(): void {
    this.interest.open({ intent: 'register' });
  }

  openLogin(): void {
    this.interest.open({ intent: 'login' });
  }

  readonly audiences = [
    {
      initial: 'I',
      title: 'Individuals',
      description: 'Upskill on your own terms and grow your career flexibly.'
    },
    {
      initial: 'P',
      title: 'Professionals',
      description:
        'Stay sharp with short, relevant courses aligned to your role.'
    },
    {
      initial: 'E',
      title: 'Entrepreneurs',
      description:
        'Practical business and operations skills to grow your venture.'
    },
    {
      initial: 'O',
      title: 'Organisations',
      description:
        'Scalable online training solutions for employees and teams.'
    }
  ];

  readonly values = [
    {
      title: 'Flexible online learning',
      description:
        'Learn anytime, anywhere, at your own pace — on any device.'
    },
    {
      title: 'Practical content',
      description:
        'Focused on outcomes and skills you can apply immediately.'
    },
    {
      title: 'Learner-friendly platform',
      description:
        'A smooth, professional learner experience.'
    },
    {
      title: 'Corporate-ready delivery',
      description:
        'Scale structured training across entire teams and branches.'
    }
  ];

  readonly corporateHighlights = [
    'Flexible learning for teams',
    'Progress tracking & reporting',
    'Branded learner experience',
    'Structured learning paths',
    'Certificates on completion',
    'Dedicated local support'
  ];

  readonly steps = [
    {
      number: '01',
      title: 'Browse courses',
      description:
        'Explore our catalog by category, level, or topic — and find the right fit.'
    },
    {
      number: '02',
      title: 'Register interest',
      description:
        'Submit your interest and we will notify you when selected courses are ready.'
    },
    {
      number: '03',
      title: 'Learn online',
      description:
        'Access your course, track progress, complete quizzes, and earn certificates.'
    }
  ];
}
