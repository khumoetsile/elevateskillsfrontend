import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export interface AdminEnquiry {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  subject: string | null;
  message: string;
  consent: boolean;
  status: string;
  data: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

@Component({
  selector: 'es-admin-enquiries',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-slate-900 text-white py-8">
      <div class="container-xl">
        <h1 class="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Enquiry management
        </h1>
        <p class="mt-2 text-sm text-slate-300 max-w-2xl">
          View Contact Us, Request Demo, trainer applications, registrations, and
          interest submissions stored in the system.
        </p>
      </div>
    </section>

    <section class="py-10 bg-slate-50 min-h-[60vh]">
      <div class="container-xl space-y-6">
        @if (!unlocked()) {
          <form class="card p-6 max-w-md space-y-4" (ngSubmit)="unlock()">
            <h2 class="text-lg font-bold text-slate-900">Administrator access</h2>
            <p class="text-sm text-slate-600">
              Enter the admin API key configured on the server (<code class="text-xs">ADMIN_API_KEY</code>).
            </p>
            @if (error()) {
              <p class="text-sm text-red-600">{{ error() }}</p>
            }
            <div>
              <label class="label-base" for="admin-key">Admin API key</label>
              <input
                id="admin-key"
                type="password"
                name="adminKey"
                [(ngModel)]="adminKey"
                required
                class="input-base"
                autocomplete="off"
              />
            </div>
            <button type="submit" class="btn-primary" [disabled]="loading()">
              {{ loading() ? 'Checking…' : 'Unlock' }}
            </button>
          </form>
        } @else {
          <div class="flex flex-wrap items-end gap-3 justify-between">
            <div class="flex flex-wrap gap-2 items-end">
              <div>
                <label class="label-base" for="filter-type">Type</label>
                <select
                  id="filter-type"
                  name="typeFilter"
                  [(ngModel)]="typeFilter"
                  (ngModelChange)="load()"
                  class="input-base min-w-[11rem]"
                >
                  <option value="">All types</option>
                  @for (t of typeOptions; track t.value) {
                    <option [value]="t.value">{{ t.label }}</option>
                  }
                </select>
              </div>
              <button type="button" class="btn-outline" (click)="load()" [disabled]="loading()">
                Refresh
              </button>
            </div>
            <button type="button" class="btn-ghost text-sm" (click)="lock()">Sign out</button>
          </div>

          @if (error()) {
            <p class="text-sm text-red-600">{{ error() }}</p>
          }

          @if (loading() && enquiries().length === 0) {
            <p class="text-sm text-slate-600">Loading enquiries…</p>
          } @else if (enquiries().length === 0) {
            <div class="card p-6 text-sm text-slate-600">
              No enquiries found for this filter.
            </div>
          } @else {
            <div class="space-y-4">
              @for (item of enquiries(); track item.id) {
                <article class="card p-5 sm:p-6">
                  <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p class="text-xs font-bold uppercase tracking-wide text-brand-700">
                        {{ typeLabel(item.type) }}
                      </p>
                      <h2 class="mt-1 text-lg font-extrabold text-slate-900">{{ item.name }}</h2>
                      <p class="text-sm text-slate-600">
                        <a [href]="'mailto:' + item.email" class="text-brand-700 hover:underline">
                          {{ item.email }}
                        </a>
                        @if (item.phone) {
                          <span> · {{ item.phone }}</span>
                        }
                        @if (item.company) {
                          <span> · {{ item.company }}</span>
                        }
                      </p>
                    </div>
                    <div class="text-right text-xs text-slate-500 space-y-1">
                      <p>{{ formatDate(item.created_at) }}</p>
                      <select
                        class="input-base text-xs py-1"
                        [ngModel]="item.status"
                        (ngModelChange)="setStatus(item, $event)"
                        [name]="'status-' + item.id"
                      >
                        <option value="new">new</option>
                        <option value="in_progress">in_progress</option>
                        <option value="closed">closed</option>
                      </select>
                    </div>
                  </div>
                  @if (item.subject) {
                    <p class="mt-3 text-sm font-semibold text-slate-800">{{ item.subject }}</p>
                  }
                  <pre class="mt-3 whitespace-pre-wrap text-sm text-slate-700 font-sans leading-relaxed">{{ item.message }}</pre>
                </article>
              }
            </div>
          }
        }
      </div>
    </section>
  `
})
export class AdminEnquiriesComponent {
  private readonly http = inject(HttpClient);
  private readonly storageKey = 'es_admin_api_key';

  readonly typeOptions = [
    { value: 'demo', label: 'Request Demo' },
    { value: 'general', label: 'Contact (general)' },
    { value: 'learner', label: 'Contact (learner)' },
    { value: 'corporate', label: 'Contact (corporate)' },
    { value: 'trainer', label: 'Trainer application' },
    { value: 'registration', label: 'Account registration' },
    { value: 'interest', label: 'Interest' },
    { value: 'interest-register', label: 'Interest (register)' }
  ];

  adminKey = '';
  typeFilter = '';

  readonly unlocked = signal(false);
  readonly loading = signal(false);
  readonly error = signal('');
  readonly enquiries = signal<AdminEnquiry[]>([]);

  constructor() {
    const saved = sessionStorage.getItem(this.storageKey);
    if (saved) {
      this.adminKey = saved;
      this.unlocked.set(true);
      this.load();
    }
  }

  unlock(): void {
    if (!this.adminKey.trim()) return;
    sessionStorage.setItem(this.storageKey, this.adminKey.trim());
    this.unlocked.set(true);
    this.load();
  }

  lock(): void {
    sessionStorage.removeItem(this.storageKey);
    this.adminKey = '';
    this.unlocked.set(false);
    this.enquiries.set([]);
    this.error.set('');
  }

  load(): void {
    this.loading.set(true);
    this.error.set('');
    const params = this.typeFilter ? `?type=${encodeURIComponent(this.typeFilter)}` : '';
    this.http
      .get<{ ok: boolean; enquiries: AdminEnquiry[]; message?: string }>(
        `${environment.api.adminEnquiries}${params}`,
        { headers: this.headers() }
      )
      .subscribe({
        next: (res) => {
          this.loading.set(false);
          this.enquiries.set(res.enquiries || []);
        },
        error: (err) => {
          this.loading.set(false);
          if (err?.status === 401) {
            this.lock();
            this.error.set('Invalid admin key.');
          } else {
            this.error.set(err?.error?.message || 'Unable to load enquiries.');
          }
        }
      });
  }

  setStatus(item: AdminEnquiry, status: string): void {
    this.http
      .patch<{ ok: boolean; enquiry: AdminEnquiry }>(
        `${environment.api.adminEnquiries}/${item.id}`,
        { status },
        { headers: this.headers() }
      )
      .subscribe({
        next: (res) => {
          if (res.enquiry) {
            this.enquiries.update((list) =>
              list.map((e) => (e.id === item.id ? res.enquiry : e))
            );
          }
        },
        error: () => {
          this.error.set('Unable to update status.');
          this.load();
        }
      });
  }

  typeLabel(type: string): string {
    return this.typeOptions.find((t) => t.value === type)?.label || type;
  }

  formatDate(value: string): string {
    try {
      return new Date(value).toLocaleString('en-GB', {
        timeZone: 'Africa/Gaborone',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return value;
    }
  }

  private headers(): HttpHeaders {
    return new HttpHeaders({ 'x-admin-key': this.adminKey.trim() });
  }
}
