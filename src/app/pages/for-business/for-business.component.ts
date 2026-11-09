import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { CONTACT } from '../../config/contact.constants';
import { ContactService } from '../../services/contact.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

@Component({
  selector: 'es-for-business',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-page-hero
      eyebrow="For Corporates"
      title="Train smarter. Track progress."
      description="Elevate Skills helps organisations deliver practical, scalable, and measurable online training for employees, teams, and departments. Our platform makes workplace learning easier to manage, easier to track, and easier to scale."
      imageSrc="https://images.unsplash.com/photo-1573164574511-73c773193279?w=1200&auto=format&fit=crop&q=70"
      imageAlt="African professionals in an organisational training session"
      statValue="100%"
      statLabel="Online and flexible learning"
    >
      <div class="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50"
          (click)="scrollToEnquiry()"
        >
          Request Demo
        </button>
        <a
          [href]="CONTACT.salesWhatsApp"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline-white"
        >
          Contact Sales
        </a>
      </div>
    </es-page-hero>

    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="chip">Why Elevate Skills for corporates</span>
          <h2 class="mt-3 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            A complete learning solution for your workforce
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (feature of features; track feature.title) {
            <div class="card p-6 h-full">
              <div class="w-11 h-11 rounded-xl bg-brand-700 text-white flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <h3 class="mt-4 text-lg font-bold text-slate-900">{{ feature.title }}</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">{{ feature.description }}</p>
            </div>
          }
        </div>
      </div>
    </section>

    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span class="chip">What you get</span>
            <h2 class="mt-3 text-3xl font-extrabold tracking-tight text-slate-900">
              End-to-end corporate training
            </h2>
            <p class="mt-3 text-slate-700 leading-relaxed">
              Empower your organisation to train staff on internal content,
              staff handbooks, procedures, health and safety, compliance,
              workplace conduct, and onboarding requirements - with assessments
              to confirm every employee has completed, understood, and passed
              the required training during orientation.
            </p>
            <ul class="mt-6 space-y-3">
              @for (item of deliverables; track item) {
                <li class="flex gap-3 text-slate-700">
                  <span class="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </span>
                  <span class="text-sm">{{ item }}</span>
                </li>
              }
            </ul>
          </div>

          <div id="enquiry" class="card p-8 scroll-mt-28">
            <h3 class="text-2xl font-extrabold text-slate-900">
              Request Demo
            </h3>
            <p class="mt-2 text-slate-600 text-sm">
              Tell us about your organisation and we'll come back with a
              tailored proposal.
            </p>

            @if (submitted()) {
              <div class="mt-6 rounded-lg bg-emerald-50 text-emerald-800 p-4 text-sm">
                Thanks! We've received your demo request and will be in touch soon.
              </div>
            } @else {
              <form
                class="mt-6 space-y-4"
                (ngSubmit)="onSubmit()"
                #f="ngForm"
              >
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base">Full Name</label>
                    <input type="text" name="name" [(ngModel)]="form.name" required class="input-base" />
                  </div>
                  <div>
                    <label class="label-base">Company</label>
                    <input type="text" name="company" [(ngModel)]="form.company" required class="input-base" />
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base">Work Email</label>
                    <input type="email" name="email" [(ngModel)]="form.email" required class="input-base" />
                  </div>
                  <div>
                    <label class="label-base">Phone</label>
                    <input type="tel" name="phone" [(ngModel)]="form.phone" class="input-base" />
                  </div>
                </div>
                <div>
                  <label class="label-base">Tell us about your needs</label>
                  <textarea
                    name="message"
                    rows="4"
                    [(ngModel)]="form.message"
                    required
                    class="input-base"
                    placeholder="What skills or outcomes are you targeting?"
                  ></textarea>
                </div>
                <label class="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    [(ngModel)]="form.consent"
                    required
                    class="mt-0.5 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
                  />
                  <span>
                    I have read the
                    <a routerLink="/privacy" target="_blank" class="text-brand-700 font-semibold hover:underline">Privacy Notice</a>
                    and consent to Elevate Skills contacting me about this demo request. *
                  </span>
                </label>
                @if (sending()) {
                  <es-loading-spinner
                    message="Sending your request…"
                    [compact]="true"
                    size="sm"
                  />
                }
                <button
                  type="submit"
                  [disabled]="f.invalid || sending()"
                  class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                >
                  @if (sending()) {
                    <span
                      class="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"
                      aria-hidden="true"
                    ></span>
                    Sending…
                  } @else {
                    Submit enquiry
                  }
                </button>
                @if (error()) {
                  <p class="text-sm text-red-600">{{ error() }}</p>
                }
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ForBusinessComponent implements OnInit, AfterViewInit {
  private readonly contactService = inject(ContactService);
  private readonly route = inject(ActivatedRoute);

  readonly CONTACT = CONTACT;
  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');

  form = {
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    consent: false
  };

  readonly features = [
    {
      title: 'Flexible online delivery',
      description:
        'Staff can learn at their own pace, on any device, without disrupting operations.'
    },
    {
      title: 'Progress tracking & reporting',
      description:
        'Full visibility of learner activity, completions, and certificates.'
    },
    {
      title: 'Structured learning paths',
      description:
        'Group courses into role-based paths for onboarding, leadership, or compliance.'
    },
    {
      title: 'Branded learner experience',
      description:
        'A learner environment that feels like an extension of your brand.'
    },
    {
      title: 'Scalable for all team sizes',
      description:
        'From a handful of employees to large departments - scale with confidence.'
    },
    {
      title: 'Dedicated local support',
      description:
        'Botswana-based support for your rollout, admin setup, and learner success.'
    }
  ];

  readonly deliverables = [
    'Needs assessment workshop with your team',
    'Recommended course paths for your roles',
    'Branded learning portal setup',
    'Learner onboarding and communication support',
    'Progress reports and completion tracking',
    'Optional add-ons: custom content, SSO, branches'
  ];

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'enquiry') {
        queueMicrotask(() => this.scrollToEnquiry());
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.route.snapshot.fragment === 'enquiry') {
      this.scrollToEnquiry();
    }
  }

  scrollToEnquiry(): void {
    const el = document.getElementById('enquiry');
    if (!el) {
      return;
    }
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const firstInput = el.querySelector<HTMLInputElement>('input, textarea');
    firstInput?.focus({ preventScroll: true });
  }

  onSubmit(): void {
    if (!this.form.consent) return;
    this.sending.set(true);
    this.error.set('');
    this.contactService
      .submit({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        phone: this.form.phone.trim() || undefined,
        company: this.form.company.trim() || undefined,
        type: 'demo',
        message: this.form.message.trim(),
        consent: true
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.submitted.set(true);
        },
        error: () => {
          this.sending.set(false);
          this.error.set(
            `Something went wrong. Please try again or email us directly at ${CONTACT.business}.`
          );
        }
      });
  }
}
