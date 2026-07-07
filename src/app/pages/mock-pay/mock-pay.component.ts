import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';

import { CheckoutService, OrderView } from '../../services/checkout.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';

/**
 * Simulated hosted payment page — stands in for the DPO checkout page while
 * DPO onboarding is in progress. Will be removed when PAYMENT_PROVIDER=dpo.
 */
@Component({
  selector: 'es-mock-pay',
  standalone: true,
  imports: [RouterLink, LoadingSpinnerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="min-h-[70vh] bg-slate-100 py-16">
      <div class="max-w-md mx-auto px-4">
        @if (loading()) {
          <es-loading-spinner message="Loading payment…" />
        } @else {
          @if (order(); as o) {
          <div class="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            <div class="bg-slate-900 px-6 py-4 flex items-center justify-between">
              <span class="text-white font-bold tracking-wide text-sm">SIMULATED PAYMENT GATEWAY</span>
              <span class="text-[10px] font-bold uppercase bg-amber-400 text-slate-900 rounded-full px-2.5 py-1">
                Test mode
              </span>
            </div>

            <div class="p-6">
              <p class="text-xs text-slate-500 uppercase font-bold tracking-widest">Paying to</p>
              <p class="mt-1 font-bold text-slate-900">Elevate Skills (Pty) Ltd</p>

              <div class="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-4">
                <p class="text-sm text-slate-600">{{ o.course.name }}</p>
                <p class="mt-2 text-3xl font-extrabold text-slate-900">
                  {{ o.course.currency }} {{ o.course.amount.toFixed(2) }}
                </p>
                <p class="mt-1 text-xs text-slate-400">Order {{ o.order_number }}</p>
              </div>

              @if (processing()) {
                <div class="mt-6">
                  <es-loading-spinner message="Processing payment…" />
                </div>
              } @else {
                <button
                  type="button"
                  class="mt-6 w-full rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 text-sm transition"
                  (click)="pay('success')"
                >
                  Pay now (simulate success)
                </button>
                <button
                  type="button"
                  class="mt-3 w-full rounded-xl bg-white border border-red-300 text-red-700 hover:bg-red-50 font-semibold py-3 text-sm transition"
                  (click)="pay('fail')"
                >
                  Simulate failed payment
                </button>
              }

              <p class="mt-5 text-[11px] text-slate-400 leading-relaxed text-center">
                This page simulates the DPO Pay hosted checkout. No real money moves.
                When DPO goes live, buyers will see the real DPO payment page here.
              </p>
            </div>
          </div>
          } @else {
          <div class="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
            <h1 class="text-xl font-extrabold text-slate-900">Payment link invalid</h1>
            <p class="mt-2 text-sm text-slate-600">
              This payment link is invalid or has expired.
            </p>
            <a routerLink="/courses" class="btn-primary inline-flex mt-6">Browse courses</a>
          </div>
          }
        }
      </div>
    </section>
  `
})
export class MockPayComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly checkout = inject(CheckoutService);

  readonly processing = signal(false);

  private readonly orderId = this.route.snapshot.paramMap.get('orderId') ?? '';
  private readonly token = this.route.snapshot.queryParamMap.get('token') ?? '';

  private readonly orderSig = toSignal<OrderView | null | undefined>(
    of(null).pipe(
      switchMap(() =>
        this.orderId && this.token
          ? this.checkout.getOrder(this.orderId, this.token).pipe(
              map((res) => (res.ok ? res.order : null)),
              catchError(() => of(null))
            )
          : of(null)
      )
    ),
    { initialValue: undefined }
  );

  readonly loading = () => this.orderSig() === undefined;
  readonly order = () => this.orderSig() ?? null;

  pay(outcome: 'success' | 'fail'): void {
    if (this.processing()) return;
    this.processing.set(true);
    this.checkout.confirmMockPayment(this.orderId, this.token, outcome).subscribe({
      next: () => this.goToResult(),
      error: () => this.goToResult()
    });
  }

  private goToResult(): void {
    this.router.navigate(['/checkout/result', this.orderId], {
      queryParams: { token: this.token }
    });
  }
}
