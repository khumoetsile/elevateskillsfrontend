import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';

import { CourseService } from '../../services/course.service';
import { CheckoutService } from '../../services/checkout.service';
import { AuthService } from '../../services/auth.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { decodeHtmlEntities } from '../../utils/html-entities';

type CheckoutMode = 'new' | 'existing';

@Component({
  selector: 'es-checkout',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let state = courseState();

    @if (state.loading) {
      <section class="py-24">
        <div class="container-xl">
          <es-loading-spinner message="Loading checkout…" />
        </div>
      </section>
    } @else {
      @if (state.course; as course) {
      <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-10">
        <div class="container-xl">
          <p class="text-xs font-bold uppercase tracking-widest text-brand-200">Checkout</p>
          <h1 class="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight">
            Enrol in {{ course.title }}
          </h1>
          <p class="mt-2 text-brand-100 text-sm sm:text-base max-w-2xl">
            @if (mode() === 'existing') {
              We’ll verify your learner account, then add this course after payment.
            } @else {
              Complete checkout to get access. A learner account is created for you if you don’t have one yet.
            }
          </p>
        </div>
      </section>

      <section class="py-12 bg-brand-50">
        <div class="container-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <form class="lg:col-span-2 card p-6 sm:p-8" (ngSubmit)="submit(course.id)" #f="ngForm">
            @if (!sessionLocked()) {
              <div
                class="inline-flex w-full sm:w-auto rounded-xl bg-slate-100 p-1 gap-1"
                role="tablist"
                aria-label="Checkout type"
              >
                <button
                  type="button"
                  role="tab"
                  class="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                  [class.bg-white]="mode() === 'existing'"
                  [class.text-slate-900]="mode() === 'existing'"
                  [class.shadow-sm]="mode() === 'existing'"
                  [class.text-slate-600]="mode() !== 'existing'"
                  [attr.aria-selected]="mode() === 'existing'"
                  (click)="setMode('existing')"
                >
                  I already have an account
                </button>
                <button
                  type="button"
                  role="tab"
                  class="flex-1 sm:flex-none px-4 py-2.5 rounded-lg text-sm font-semibold transition"
                  [class.bg-white]="mode() === 'new'"
                  [class.text-slate-900]="mode() === 'new'"
                  [class.shadow-sm]="mode() === 'new'"
                  [class.text-slate-600]="mode() !== 'new'"
                  [attr.aria-selected]="mode() === 'new'"
                  (click)="setMode('new')"
                >
                  I’m new here
                </button>
              </div>
            }

            <h2 class="mt-6 text-xl font-extrabold text-slate-900">
              @if (sessionLocked()) {
                Confirm your enrolment
              } @else if (mode() === 'existing') {
                Find your account
              } @else {
                Your details
              }
            </h2>
            <p class="mt-1 text-sm text-slate-600">
              @if (sessionLocked()) {
                You’re signed in as <strong>{{ email }}</strong>. Confirm the order details below to
                enrol this course into your account.
              } @else if (mode() === 'existing') {
                Enter the email on your Elevate Skills learner account. We’ll check it against the
                learning portal before you continue to payment.
              } @else {
                We’ll create your learner account and enrol you after payment.
              }
            </p>

            @if (error()) {
              <div class="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
                {{ error() }}
              </div>
            }

            <div class="mt-6 space-y-4">
              <div>
                <label class="label-base" for="checkout-email">
                  {{ mode() === 'existing' ? 'Account email *' : 'Email address *' }}
                </label>
                <div class="flex flex-col sm:flex-row gap-2">
                  <input
                    id="checkout-email"
                    type="email"
                    name="email"
                    [(ngModel)]="email"
                    (ngModelChange)="onEmailChange()"
                    required
                    autocomplete="email"
                    class="input-base flex-1"
                    [readonly]="sessionLocked()"
                    [placeholder]="mode() === 'existing' ? 'email used for your learner login' : 'you@example.com'"
                  />
                  @if (mode() === 'existing' && !sessionLocked()) {
                    <button
                      type="button"
                      class="btn-outline whitespace-nowrap disabled:opacity-60"
                      [disabled]="lookingUp() || !email.trim()"
                      (click)="verifyAccount()"
                    >
                      {{ lookingUp() ? 'Checking…' : 'Verify account' }}
                    </button>
                  }
                </div>
                <p class="mt-1.5 text-xs text-slate-500">
                  @if (sessionLocked()) {
                    Enrolment will be added to this signed-in account.
                  } @else if (mode() === 'existing') {
                    Must match the email on your existing learner account.
                  } @else {
                    This becomes your account email and course access login.
                  }
                </p>
              </div>

              @if (mode() === 'existing' && verified() && !sessionLocked()) {
                <div class="rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-900 px-4 py-3 text-sm">
                  Account found
                  @if (verifiedLogin()) {
                    <span> (username: <strong>{{ verifiedLogin() }}</strong>)</span>
                  }
                  . Continue to enrol this course into that account.
                </div>
              }

              @if (mode() === 'new' || verified()) {
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base" for="checkout-first-name">
                      {{ mode() === 'existing' ? 'First name (for this order) *' : 'First name *' }}
                    </label>
                    <input
                      id="checkout-first-name"
                      type="text"
                      name="firstName"
                      [(ngModel)]="firstName"
                      required
                      autocomplete="given-name"
                      class="input-base"
                      placeholder="e.g. Kabo"
                    />
                  </div>
                  <div>
                    <label class="label-base" for="checkout-last-name">
                      {{ mode() === 'existing' ? 'Last name (for this order) *' : 'Last name *' }}
                    </label>
                    <input
                      id="checkout-last-name"
                      type="text"
                      name="lastName"
                      [(ngModel)]="lastName"
                      required
                      autocomplete="family-name"
                      class="input-base"
                      placeholder="e.g. Modise"
                    />
                  </div>
                </div>

                @if (mode() === 'new') {
                  <div>
                    <label class="label-base" for="checkout-phone">Contact number</label>
                    <input
                      id="checkout-phone"
                      type="tel"
                      name="phone"
                      [(ngModel)]="phone"
                      autocomplete="tel"
                      class="input-base"
                      placeholder="+267 77608200"
                    />
                  </div>
                }

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
                    <a routerLink="/privacy" target="_blank" class="text-brand-700 font-semibold hover:underline">Privacy Notice</a>
                    and agree to the
                    <a routerLink="/terms" target="_blank" class="text-brand-700 font-semibold hover:underline">Terms and Conditions</a>.
                    @if (mode() === 'existing') {
                      I consent to Elevate Skills processing this order and enrolling me in this course. *
                    } @else {
                      I consent to Elevate Skills creating my learner account and enrolling me in this course. *
                    }
                  </span>
                </label>

                <button
                  type="submit"
                  class="btn-primary w-full sm:w-auto disabled:opacity-60 disabled:cursor-not-allowed"
                  [disabled]="submitting() || f.invalid || (mode() === 'existing' && !verified())"
                >
                  {{ submitLabel() }}
                </button>
              }
            </div>
          </form>

          <aside class="lg:col-span-1">
            <div class="card p-6 lg:sticky lg:top-20">
              <h2 class="text-sm font-bold uppercase tracking-widest text-slate-500">Order summary</h2>
              <div class="mt-4 flex gap-4 items-start">
                <img
                  [src]="course.image"
                  [alt]="course.title"
                  class="w-20 h-14 rounded-lg object-cover flex-shrink-0 ring-1 ring-slate-200"
                />
                <div class="min-w-0">
                  <p class="font-bold text-slate-900 leading-snug">{{ course.title }}</p>
                  <p class="mt-1 text-xs text-slate-500">{{ course.level }} · {{ course.delivery }}</p>
                </div>
              </div>
              <div class="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span class="text-sm text-slate-500">Total</span>
                <span class="text-2xl font-extrabold text-brand-800">{{ priceLabel() }}</span>
              </div>
              <p class="mt-4 text-xs text-slate-500 leading-relaxed">
                @if (isFree()) {
                  No payment required. After confirming your details you will be enrolled automatically.
                } @else if (mode() === 'existing') {
                  After your account is verified and payment succeeds, this course is added to that account.
                } @else {
                  Payment is processed securely. After payment you are enrolled and emailed access details.
                }
              </p>
            </div>
          </aside>
        </div>
      </section>
      } @else {
      <section class="py-24">
        <div class="container-xl text-center">
          <h1 class="text-3xl font-extrabold text-slate-900">Course not found</h1>
          <a routerLink="/courses" class="mt-6 btn-primary inline-flex">Browse all courses</a>
        </div>
      </section>
      }
    }
  `
})
export class CheckoutComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly courseService = inject(CourseService);
  private readonly checkout = inject(CheckoutService);
  private readonly auth = inject(AuthService);

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  consent = false;

  readonly mode = signal<CheckoutMode>('new');
  readonly sessionLocked = signal(false);
  readonly submitting = signal(false);
  readonly lookingUp = signal(false);
  readonly verified = signal(false);
  readonly verifiedLogin = signal<string | null>(null);
  readonly error = signal('');

  readonly courseState = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('courseId') ?? ''),
      switchMap((id) => this.courseService.getCourseByIdState(id))
    ),
    { initialValue: { loading: true, course: undefined } }
  );

  constructor() {
    const account = this.route.snapshot.queryParamMap.get('account');
    if (account === 'existing' || account === 'returning') {
      this.mode.set('existing');
    }

    const sessionUser = this.auth.user();
    if (sessionUser) {
      this.sessionLocked.set(true);
      this.mode.set('existing');
      this.email = sessionUser.email;
      this.firstName = sessionUser.first_name || this.firstName;
      this.lastName = sessionUser.last_name || this.lastName;
      // Session already proves the TalentLMS account — skip manual verify.
      this.verified.set(true);
      this.verifiedLogin.set(sessionUser.login);
    }
  }

  readonly priceLabel = computed(() => {
    const course = this.courseState().course;
    if (!course) return '';
    const decoded = decodeHtmlEntities((course.price || '').trim());
    // TalentLMS returns prices with a $ marker regardless of the real
    // checkout currency — strip any currency symbol and show BWP instead.
    const numeric = decoded.replace(/[^0-9.,]/g, '').trim();
    if (!numeric || /^[0.,]+$/.test(numeric)) return 'Free';
    return `BWP ${numeric}`;
  });

  readonly isFree = computed(() => this.priceLabel() === 'Free');

  readonly submitLabel = computed(() => {
    if (this.submitting()) {
      return this.isFree() ? 'Completing enrolment…' : 'Preparing payment…';
    }
    if (this.mode() === 'existing') {
      return this.isFree() ? 'Enrol in this course' : 'Continue to payment';
    }
    return this.isFree() ? 'Create account & enrol' : 'Continue to payment';
  });

  setMode(next: CheckoutMode): void {
    if (this.sessionLocked()) return;
    this.mode.set(next);
    this.error.set('');
    this.verified.set(false);
    this.verifiedLogin.set(null);
    this.consent = false;
  }

  onEmailChange(): void {
    if (this.mode() === 'existing') {
      this.verified.set(false);
      this.verifiedLogin.set(null);
      this.error.set('');
    }
  }

  verifyAccount(): void {
    const email = this.email.trim();
    if (!email || this.lookingUp()) return;

    this.lookingUp.set(true);
    this.error.set('');
    this.verified.set(false);
    this.verifiedLogin.set(null);

    this.checkout.lookupAccount(email).subscribe({
      next: (res) => {
        this.lookingUp.set(false);
        if (!res.ok) {
          this.error.set(res.message || 'Unable to verify this email.');
          return;
        }
        if (!res.exists || !res.account) {
          this.error.set(
            res.message ||
              'No learner account was found for this email. Switch to “I’m new here” to create one, or check the email and try again.'
          );
          return;
        }

        this.verified.set(true);
        this.verifiedLogin.set(res.account.login);
        if (!this.firstName.trim() && res.account.first_name) {
          this.firstName = res.account.first_name;
        }
        if (!this.lastName.trim() && res.account.last_name) {
          this.lastName = res.account.last_name;
        }
      },
      error: (err) => {
        this.lookingUp.set(false);
        this.error.set(
          err?.error?.message || 'Unable to verify this email right now. Please try again shortly.'
        );
      }
    });
  }

  submit(courseId: string): void {
    if (this.submitting()) return;
    if (this.mode() === 'existing' && !this.verified()) {
      this.error.set('Please verify your account email before continuing.');
      return;
    }

    this.error.set('');
    this.submitting.set(true);

    const course = this.courseState().course;
    this.checkout
      .createOrder({
        courseId,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        phone: this.mode() === 'new' ? this.phone.trim() || undefined : undefined,
        consent: this.consent,
        accountMode: this.mode(),
        courseName: course?.title,
        coursePrice: course?.price
      })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          if (res.ok && res.payment_url) {
            this.openPaymentPage(res.payment_url);
          } else {
            this.error.set(res.message || 'Unable to start checkout. Please try again.');
          }
        },
        error: (err) => {
          this.submitting.set(false);
          const code = err?.error?.code as string | undefined;
          if (code === 'account_not_found') {
            this.verified.set(false);
          }
          if (code === 'account_exists') {
            this.setMode('existing');
            this.error.set(err?.error?.message || '');
            return;
          }
          if (code === 'already_enrolled') {
            this.error.set(
              err?.error?.message ||
                'You are already enrolled in this course. Open My learning to continue.'
            );
            return;
          }
          this.error.set(
            err?.error?.message || 'Unable to start checkout. Please try again shortly.'
          );
        }
      });
  }

  private openPaymentPage(paymentUrl: string): void {
    try {
      const url = new URL(paymentUrl, window.location.origin);
      if (url.origin === window.location.origin) {
        this.router.navigateByUrl(`${url.pathname}${url.search}${url.hash}`);
        return;
      }
      if (url.protocol !== 'https:' || url.hostname !== 'secure.3gdirectpay.com') {
        throw new Error('Unapproved payment destination');
      }
      window.location.assign(url.href);
    } catch {
      this.error.set('The secure payment page could not be opened. Please try again.');
    }
  }
}
