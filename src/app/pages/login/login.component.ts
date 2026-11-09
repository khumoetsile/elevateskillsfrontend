import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'es-login',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-10 sm:py-14">
      <div class="container-xl max-w-lg">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-200">Learner account</p>
        <h1 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">Log in</h1>
        <p class="mt-3 text-brand-100 text-sm sm:text-base leading-relaxed">
          Sign in once on Elevate Skills. You’ll stay logged in here, and can open the learner
          portal without using a separate login page.
        </p>
      </div>
    </section>

    <section class="py-12 bg-brand-50">
      <div class="container-xl max-w-lg">
        <form class="card p-6 sm:p-8 space-y-5" (ngSubmit)="onSubmit()" #f="ngForm">
          @if (error()) {
            <div class="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
              {{ error() }}
            </div>
          }

          <div>
            <label class="label-base" for="login-id">Email or username *</label>
            <input
              id="login-id"
              type="text"
              name="login"
              [(ngModel)]="login"
              required
              autocomplete="username"
              class="input-base"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label class="label-base" for="login-password">Password *</label>
            <input
              id="login-password"
              type="password"
              name="password"
              [(ngModel)]="password"
              required
              autocomplete="current-password"
              class="input-base"
            />
          </div>

          <label class="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              name="openPortal"
              [(ngModel)]="openPortal"
              class="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
            />
            <span>Also open my learner portal after login</span>
          </label>

          @if (submitting()) {
            <es-loading-spinner message="Signing you in…" [compact]="true" size="sm" />
          }

          <button
            type="submit"
            class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            [disabled]="f.invalid || submitting()"
          >
            {{ submitting() ? 'Signing in…' : 'Log in' }}
          </button>

          <p class="text-sm text-slate-600 text-center">
            Don’t have an account?
            <a routerLink="/register" class="text-brand-700 font-semibold hover:underline">Register</a>
          </p>
        </form>
      </div>
    </section>
  `
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  login = '';
  password = '';
  openPortal = false;

  readonly submitting = signal(false);
  readonly error = signal('');

  constructor() {
    if (this.auth.user()) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/courses';
      void this.router.navigateByUrl(returnUrl);
    }
  }

  onSubmit(): void {
    if (this.submitting()) return;
    this.error.set('');
    this.submitting.set(true);

    this.auth.login({ login: this.login.trim(), password: this.password }).subscribe({
      next: (res) => {
        this.submitting.set(false);
        if (!res.ok || !res.user) {
          this.error.set(res.message || 'Unable to log in.');
          return;
        }
        if (this.openPortal && res.portal_login_url) {
          window.open(res.portal_login_url, '_blank', 'noopener,noreferrer');
        }
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/courses';
        void this.router.navigateByUrl(returnUrl);
      },
      error: (err) => {
        this.submitting.set(false);
        this.error.set(err?.error?.message || 'Invalid email/username or password.');
      }
    });
  }
}
