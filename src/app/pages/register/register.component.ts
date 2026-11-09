import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { LmsService } from '../../services/lms.service';

@Component({
  selector: 'es-register',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-10 sm:py-14">
      <div class="container-xl max-w-2xl">
        <p class="text-xs font-bold uppercase tracking-widest text-brand-200">Learner account</p>
        <h1 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
          Create your account
        </h1>
        <p class="mt-3 text-brand-100 text-sm sm:text-base leading-relaxed">
          Register once to get a learner portal login. You can enrol in courses anytime
          from the catalogue — no need to create a new account for each course.
        </p>
      </div>
    </section>

    <section class="py-12 bg-brand-50">
      <div class="container-xl max-w-2xl">
        @if (created(); as account) {
          <div class="card p-6 sm:p-8 space-y-5">
            <div class="rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 p-4 text-sm leading-relaxed">
              Your learner account has been created. Save your login details below —
              a copy is also emailed to {{ account.email }} when mail delivery is configured.
            </div>
            <div class="rounded-xl bg-white border border-slate-200 p-4 text-sm space-y-2">
              <p><span class="text-slate-500">Email:</span> <strong>{{ account.email }}</strong></p>
              <p><span class="text-slate-500">Username:</span> <strong>{{ account.login }}</strong></p>
              <p>
                <span class="text-slate-500">Temporary password:</span>
                <strong class="font-mono">{{ account.temp_password }}</strong>
              </p>
              <p class="text-xs text-slate-500 pt-1">
                Please change your password after your first login.
              </p>
            </div>
            @if (loggedIn()) {
              <div class="rounded-xl bg-brand-50 border border-brand-100 text-brand-900 px-4 py-3 text-sm">
                You’re also signed in on Elevate Skills. Use the navigation to browse courses or open
                My learning anytime.
              </div>
            }
            <div class="flex flex-wrap gap-3">
              <button type="button" class="btn-primary" (click)="openPortal(account.portal_url)">
                Open learner portal
              </button>
              <a routerLink="/courses" class="btn-outline">Browse courses</a>
            </div>
          </div>
        } @else {
          <form class="card p-6 sm:p-8 space-y-5" (ngSubmit)="onSubmit()" #f="ngForm">
            @if (auth.user(); as user) {
              <div class="rounded-xl bg-brand-50 border border-brand-100 text-brand-900 px-4 py-3 text-sm">
                You’re already signed in as <strong>{{ user.email }}</strong>.
                <a routerLink="/courses" class="font-semibold underline ml-1">Browse courses</a>
                to enrol, or use My learning in the menu.
              </div>
            } @else {
              <p class="text-sm text-slate-600">
                Already registered?
                <a routerLink="/login" class="text-brand-700 font-semibold hover:underline">
                  Log in
                </a>
                , or
                <a routerLink="/courses" class="text-brand-700 font-semibold hover:underline">
                  enrol in a course
                </a>
                using your existing email.
              </p>
            }

            @if (error()) {
              <div class="rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
                {{ error() }}
              </div>
            }

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="label-base" for="reg-first">First name *</label>
                <input
                  id="reg-first"
                  type="text"
                  name="firstName"
                  [(ngModel)]="firstName"
                  required
                  autocomplete="given-name"
                  class="input-base"
                />
              </div>
              <div>
                <label class="label-base" for="reg-last">Last name *</label>
                <input
                  id="reg-last"
                  type="text"
                  name="lastName"
                  [(ngModel)]="lastName"
                  required
                  autocomplete="family-name"
                  class="input-base"
                />
              </div>
            </div>

            <div>
              <label class="label-base" for="reg-email">Email address *</label>
              <input
                id="reg-email"
                type="email"
                name="email"
                [(ngModel)]="email"
                required
                email
                autocomplete="email"
                class="input-base"
              />
            </div>

            <div>
              <label class="label-base" for="reg-phone">Contact number</label>
              <input
                id="reg-phone"
                type="tel"
                name="phone"
                [(ngModel)]="phone"
                autocomplete="tel"
                class="input-base"
              />
            </div>

            <label class="flex items-start gap-3 cursor-pointer text-sm text-slate-700">
              <input
                type="checkbox"
                name="consent"
                [(ngModel)]="consent"
                required
                class="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
              />
              <span>
                I have read the
                <a routerLink="/privacy" target="_blank" class="text-brand-700 font-semibold hover:underline">
                  Privacy Notice
                </a>
                and agree to the
                <a routerLink="/terms" target="_blank" class="text-brand-700 font-semibold hover:underline">
                  Terms and Conditions
                </a>
                . I consent to Elevate Skills creating my learner account and processing my
                personal information for that purpose. *
              </span>
            </label>

            @if (submitting()) {
              <es-loading-spinner message="Creating your account…" [compact]="true" size="sm" />
            }

            <button
              type="submit"
              class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
              [disabled]="f.invalid || submitting()"
            >
              {{ submitting() ? 'Creating account…' : 'Create account' }}
            </button>
          </form>
        }
      </div>
    </section>
  `
})
export class RegisterComponent {
  readonly auth = inject(AuthService);
  readonly lms = inject(LmsService);

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  consent = false;

  readonly submitting = signal(false);
  readonly error = signal('');
  readonly loggedIn = signal(false);
  readonly created = signal<{
    email: string;
    login: string;
    temp_password: string;
    portal_url: string | null;
  } | null>(null);
  private portalLoginUrl: string | null = null;

  onSubmit(): void {
    if (this.submitting()) return;
    this.error.set('');
    this.submitting.set(true);

    this.auth
      .register({
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim() || undefined,
        consent: this.consent
      })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          if (res.ok && res.account) {
            this.created.set(res.account);
            this.loggedIn.set(Boolean(res.user));
            this.portalLoginUrl = res.portal_login_url || null;
          } else {
            this.error.set(res.message || 'Unable to create your account.');
          }
        },
        error: (err) => {
          this.submitting.set(false);
          this.error.set(
            err?.error?.message ||
              'Unable to create your account right now. Please try again or contact help@elevateskills.online.'
          );
        }
      });
  }

  openPortal(fallback: string | null): void {
    if (this.portalLoginUrl) {
      window.open(this.portalLoginUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    if (this.auth.user()) {
      this.auth.openLearnerPortal();
      return;
    }
    window.open(fallback || this.lms.loginUrl, '_blank', 'noopener,noreferrer');
  }
}
