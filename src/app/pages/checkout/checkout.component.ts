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
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

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
        </div>
      </section>

      <section class="py-12 bg-brand-50">
        <div class="container-xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <!-- Buyer details -->
          <form class="lg:col-span-2 card p-6 sm:p-8" (ngSubmit)="submit(course.id)" #f="ngForm">
            <h2 class="text-xl font-extrabold text-slate-900">Your details</h2>
            <p class="mt-1 text-sm text-slate-600">
              We use these details to create your learner account and confirm your enrolment.
            </p>

            @if (error()) {
              <div class="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm">
                {{ error() }}
              </div>
            }

            <div class="mt-6 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label-base" for="checkout-first-name">First name *</label>
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
                  <label class="label-base" for="checkout-last-name">Last name *</label>
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

              <div>
                <label class="label-base" for="checkout-email">Email address *</label>
                <input
                  id="checkout-email"
                  type="email"
                  name="email"
                  [(ngModel)]="email"
                  required
                  autocomplete="email"
                  class="input-base"
                  placeholder="you@example.com"
                />
                <p class="mt-1.5 text-xs text-slate-500">
                  Your course access details will be linked to this email.
                </p>
              </div>

              <div>
                <label class="label-base" for="checkout-phone">Contact number</label>
                <input
                  id="checkout-phone"
                  type="tel"
                  name="phone"
                  [(ngModel)]="phone"
                  autocomplete="tel"
                  class="input-base"
                  placeholder="+267 71 234 567"
                />
              </div>
            </div>

            <label class="mt-6 flex items-start gap-3 cursor-pointer text-sm text-slate-700">
              <input
                type="checkbox"
                name="consent"
                [(ngModel)]="consent"
                required
                class="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
              />
              <span>
                I agree to the
                <a routerLink="/terms" class="text-brand-700 font-semibold hover:underline">Terms and Conditions</a>
                and consent to my details being used to create my learner account. *
              </span>
            </label>

            <button
              type="submit"
              class="btn-primary w-full sm:w-auto mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
              [disabled]="submitting() || f.invalid"
            >
              {{ submitLabel() }}
            </button>
          </form>

          <!-- Order summary -->
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
                  No payment required. After confirming your details you will be enrolled automatically
                  and emailed your access information.
                } @else {
                  Payment is processed securely. After a successful payment you are automatically
                  enrolled and emailed your access details.
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

  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  consent = false;

  readonly submitting = signal(false);
  readonly error = signal('');

  readonly courseState = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('courseId') ?? ''),
      switchMap((id) => this.courseService.getCourseByIdState(id))
    ),
    { initialValue: { loading: true, course: undefined } }
  );

  readonly priceLabel = computed(() => {
    const course = this.courseState().course;
    if (!course) return '';
    const raw = (course.price || '').trim();
    if (!raw || raw === '0' || raw === '0.00' || raw === '$0' || raw === '$0.00') return 'Free';
    return /^[0-9.,\s]+$/.test(raw) ? `BWP ${raw}` : raw;
  });

  readonly isFree = computed(() => this.priceLabel() === 'Free');

  readonly submitLabel = computed(() => {
    if (this.submitting()) {
      return this.isFree() ? 'Completing enrolment…' : 'Preparing payment…';
    }
    return this.isFree() ? 'Complete enrolment' : 'Continue to payment';
  });

  submit(courseId: string): void {
    if (this.submitting()) return;
    this.error.set('');
    this.submitting.set(true);

    const course = this.courseState().course;
    this.checkout
      .createOrder({
        courseId,
        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
        email: this.email.trim(),
        phone: this.phone.trim() || undefined,
        consent: this.consent,
        courseName: course?.title,
        coursePrice: course?.price
      })
      .subscribe({
        next: (res) => {
          this.submitting.set(false);
          if (res.ok && res.payment_url) {
            this.router.navigateByUrl(res.payment_url);
          } else {
            this.error.set(res.message || 'Unable to start checkout. Please try again.');
          }
        },
        error: (err) => {
          this.submitting.set(false);
          this.error.set(
            err?.error?.message || 'Unable to start checkout. Please try again shortly.'
          );
        }
      });
  }
}
