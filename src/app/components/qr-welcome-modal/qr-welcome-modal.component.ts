import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * Shown only to visitors who arrive via the printed/shared QR code
 * (URL carries ?src=qr or ?qr=1), never to direct visitors.
 */
const QR_QUERY_PARAMS: Record<string, string[]> = {
  src: ['qr'],
  qr: ['1', 'true', 'yes']
};

@Component({
  selector: 'es-qr-welcome-modal',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-welcome-title"
      >
        <button
          type="button"
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          aria-label="Close"
          (click)="close()"
        ></button>

        <div class="relative w-full sm:max-w-md bg-brand-50 rounded-2xl shadow-2xl p-6 sm:p-8 text-center">
          <button
            type="button"
            class="absolute top-3 right-3 w-9 h-9 rounded-lg text-slate-500 hover:bg-white flex items-center justify-center"
            aria-label="Close"
            (click)="close()"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <span class="mx-auto inline-flex w-14 h-14 rounded-full bg-brand-100 text-brand-700 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-7 h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75h5.5v5.5h-5.5v-5.5Zm0 11h5.5v5.5h-5.5v-5.5Zm11-11h5.5v5.5h-5.5v-5.5Zm0 8.25h2.25m0 0h3.25m-3.25 0v3.25m0 0h3.25m-3.25 0v3.25" />
            </svg>
          </span>

          <h2 id="qr-welcome-title" class="mt-4 text-xl font-extrabold text-slate-900">
            Welcome to Elevate Skills!
          </h2>
          <p class="mt-2 text-sm text-slate-700 leading-relaxed">
            Thanks for scanning our QR code. Explore practical, flexible courses
            designed to help you grow your skills and career.
          </p>

          <div class="mt-6 flex flex-col sm:flex-row gap-3">
            <a routerLink="/courses" (click)="close()" class="btn-primary flex-1 justify-center">
              Browse Courses
            </a>
            <button type="button" class="btn-secondary flex-1" (click)="close()">
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class QrWelcomeModalComponent {
  readonly isOpen = signal(false);

  constructor() {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const arrivedViaQr = Object.entries(QR_QUERY_PARAMS).some(([key, values]) => {
      const value = params.get(key);
      return value !== null && values.includes(value.toLowerCase());
    });

    if (arrivedViaQr) {
      this.isOpen.set(true);
    }
  }

  close(): void {
    this.isOpen.set(false);
  }
}
