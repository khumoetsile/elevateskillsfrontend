import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { RegisterInterestService } from '../../services/register-interest.service';

@Component({
  selector: 'es-how-it-works',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-14 sm:py-20">
      <div class="container-xl max-w-3xl">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
          How It Works
        </span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Your learning journey, simplified
        </h1>
        <p class="mt-4 text-brand-100 text-lg leading-relaxed">
          From discovery to certificate — here's how learners experience
          Elevate Skills.
        </p>
      </div>
    </section>

    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          @for (step of steps; track step.number) {
            <div class="card p-7 h-full">
              <div class="w-12 h-12 rounded-xl bg-brand-700 text-white flex items-center justify-center text-lg font-bold">
                {{ step.number }}
              </div>
              <h3 class="mt-5 text-lg font-bold text-slate-900">
                {{ step.title }}
              </h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                {{ step.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section bg-slate-50">
      <div class="container-xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="chip">Your learner portal</span>
          <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
            A professional learner experience
          </h2>
          <p class="mt-3 text-slate-600">
            All learning, progress tracking, quizzes, and certificates live on
            our secure online learner portal.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          @for (f of lmsFeatures; track f) {
            <div class="card p-5 h-full flex items-start gap-3">
              <span class="w-9 h-9 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </span>
              <span class="text-sm text-slate-700 leading-snug">{{ f }}</span>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section bg-brand-50">
      <div class="container-xl text-center">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Ready to begin?
        </h2>
        <p class="mt-3 text-slate-600 max-w-2xl mx-auto">
          Browse our courses or register directly on our learner portal.
        </p>
        <div class="mt-6 flex flex-wrap justify-center gap-3">
          <a routerLink="/courses" class="btn-primary">Browse Courses</a>
          <button type="button" class="btn-secondary" (click)="openRegister()">Register</button>
          <button type="button" class="btn-ghost" (click)="openLogin()">Login</button>
        </div>
      </div>
    </section>
  `
})
export class HowItWorksComponent {
  private readonly interest = inject(RegisterInterestService);

  readonly steps = [
    {
      number: '01',
      title: 'Discover courses',
      description:
        'Explore categories, search topics, and find courses that match your goals.'
    },
    {
      number: '02',
      title: 'Register or log in',
      description:
        'Create an account or sign in via our secure learner portal.'
    },
    {
      number: '03',
      title: 'Learn and earn certificates',
      description:
        'Complete your courses, track progress, and earn certificates on completion.'
    }
  ];

  readonly lmsFeatures = [
    'Secure learner accounts',
    'Course catalog and enrolment',
    'Progress & completion tracking',
    'Quizzes and assessments',
    'Certificates on completion',
    'Learning paths and groups',
    'Mobile-friendly delivery',
    'Corporate reporting'
  ];

  openRegister(): void {
    this.interest.open({ intent: 'register' });
  }

  openLogin(): void {
    this.interest.open({ intent: 'login' });
  }
}
