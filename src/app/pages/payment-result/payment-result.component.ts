import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap, takeWhile, timer } from 'rxjs';

import { CheckoutService, OrderView } from '../../services/checkout.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

const SETTLED = ['completed', 'enrolment_failed', 'payment_failed', 'cancelled'];

@Component({
  selector: 'es-payment-result',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-[70vh] bg-brand-50 py-16">
      <div class="max-w-xl mx-auto px-4">
        @if (order(); as o) {
          @switch (o.status) {
            @case ('completed') {
              <div class="card p-8 text-center">
                <div class="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h1 class="mt-5 text-2xl font-extrabold text-slate-900">You're enrolled!</h1>
                <p class="mt-2 text-slate-600 text-sm leading-relaxed">
                  Payment received for <strong>{{ o.course.name }}</strong>. Your enrolment is
                  confirmed — order <strong>{{ o.order_number }}</strong>.
                </p>

                @if (o.lms_access; as access) {
                  <div class="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-5 text-left">
                    <p class="text-xs font-bold uppercase tracking-widest text-slate-500">
                      Your learner access
                    </p>
                    @if (access.login) {
                      <p class="mt-3 text-sm text-slate-700">
                        Username: <strong class="text-slate-900">{{ access.login }}</strong>
                      </p>
                    }
                    @if (access.temp_password) {
                      <p class="mt-1 text-sm text-slate-700">
                        Temporary password:
                        <strong class="text-slate-900">{{ access.temp_password }}</strong>
                      </p>
                      <p class="mt-2 text-xs text-slate-500">
                        Save these now — also emailed to {{ o.buyer.email }}. Change your
                        password after your first login.
                      </p>
                    } @else {
                      <p class="mt-2 text-xs text-slate-500">
                        Use your existing learner account ({{ o.buyer.email }}) to sign in.
                      </p>
                    }
                    <a
                      [href]="access.portal_url"
                      target="_blank"
                      rel="noopener"
                      class="btn-primary w-full mt-4 inline-flex justify-center"
                    >
                      Go to your course
                    </a>
                  </div>
                }

                <a routerLink="/courses" class="inline-block mt-6 text-sm font-semibold text-brand-700 hover:underline">
                  Browse more courses
                </a>
              </div>
            }
            @case ('payment_failed') {
              <div class="card p-8 text-center">
                <div class="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </div>
                <h1 class="mt-5 text-2xl font-extrabold text-slate-900">Payment unsuccessful</h1>
                <p class="mt-2 text-slate-600 text-sm">
                  Your payment for <strong>{{ o.course.name }}</strong> was not completed.
                  You have not been charged.
                </p>
                <a [routerLink]="['/checkout', o.course.id]" class="btn-primary inline-flex mt-6">
                  Try again
                </a>
              </div>
            }
            @case ('enrolment_failed') {
              <div class="card p-8 text-center">
                <div class="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
                  </svg>
                </div>
                <h1 class="mt-5 text-2xl font-extrabold text-slate-900">Payment received — enrolment pending</h1>
                <p class="mt-2 text-slate-600 text-sm leading-relaxed">
                  Your payment for <strong>{{ o.course.name }}</strong> (order
                  <strong>{{ o.order_number }}</strong>) was successful, but we could not complete
                  your enrolment automatically. Our team has been notified and will finish your
                  enrolment shortly — no action needed.
                </p>
                <p class="mt-3 text-xs text-slate-500">
                  Questions? Contact help&#64;elevateskills.online and quote your order number.
                </p>
              </div>
            }
            @default {
              <div class="card p-8">
                <es-loading-spinner message="Finalising your enrolment…" />
              </div>
            }
          }
        } @else {
          <div class="card p-8">
            <es-loading-spinner message="Checking your order…" />
          </div>
        }
      </div>
    </section>
  `
})
export class PaymentResultComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly checkout = inject(CheckoutService);

  private readonly orderId = this.route.snapshot.paramMap.get('orderId') ?? '';
  private readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  // Poll every 2.5s until the order reaches a settled state.
  private readonly orderSig = toSignal(
    timer(0, 2500).pipe(
      switchMap(() =>
        this.checkout.getOrder(this.orderId, this.token).pipe(
          map((res) => (res.ok ? res.order : null)),
          catchError(() => of(null))
        )
      ),
      takeWhile((order) => !order || !SETTLED.includes(order.status), true)
    ),
    { initialValue: null as OrderView | null }
  );

  readonly order = () => this.orderSig();
}
