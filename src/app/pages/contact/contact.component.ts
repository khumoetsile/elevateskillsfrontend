import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { BRAND } from '../../config/brand.constants';
import { CONTACT } from '../../config/contact.constants';
import { ContactEnquiryType, ContactService } from '../../services/contact.service';

@Component({
  selector: 'es-contact',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-page-hero
      eyebrow="Contact"
      title="Let's talk"
      description="Whether you're a learner, an organisation, or a potential partner — we'd love to hear from you."
      [imageSrc]="BRAND.heroContact"
      imageAlt="Team member ready to help with Elevate Skills enquiries"
      statValue="100%"
      statLabel="Online and flexible learning"
    ></es-page-hero>

    <section class="section bg-brand-50">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div class="space-y-6">
          @for (card of contactCards; track card.title) {
            <div class="card p-6">
              <div class="w-11 h-11 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                <span class="font-bold">{{ card.initial }}</span>
              </div>
              <h3 class="mt-4 text-lg font-bold text-slate-900">{{ card.title }}</h3>
              <p class="mt-1 text-sm text-slate-600">{{ card.description }}</p>
              <a [href]="'mailto:' + card.email" class="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800">
                {{ card.email }}
              </a>
            </div>
          }

          <div class="card p-6">
            <h3 class="text-lg font-bold text-slate-900">Office</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">
              Gaborone, Botswana<br />
              Mon – Fri, 08:00 – 17:00 CAT
            </p>
            <a
              [href]="'tel:' + CONTACT.phoneTel"
              class="mt-3 inline-block text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              {{ CONTACT.phoneDisplay }}
            </a>
          </div>
        </div>

        <div class="lg:col-span-2">
          <div class="card p-8">
            <h2 class="text-2xl font-extrabold text-slate-900">
              Send us a message
            </h2>
            <p class="mt-2 text-slate-600 text-sm">
              Fill in the form and our team will get back to you as soon as possible.
            </p>

            @if (submitted()) {
              <div class="mt-6 rounded-lg bg-emerald-50 text-emerald-800 p-4 text-sm">
                Thanks! Your message has been sent and we'll be in touch shortly.
              </div>
            } @else {
              <form class="mt-6 space-y-4" (ngSubmit)="onSubmit()" #f="ngForm">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base">Full Name</label>
                    <input type="text" name="name" [(ngModel)]="form.name" required class="input-base" />
                  </div>
                  <div>
                    <label class="label-base">Email</label>
                    <input type="email" name="email" [(ngModel)]="form.email" required class="input-base" />
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base">Phone</label>
                    <input type="tel" name="phone" [(ngModel)]="form.phone" class="input-base" />
                  </div>
                  <div>
                    <label class="label-base">Enquiry Type</label>
                    <select name="type" [(ngModel)]="form.type" class="input-base">
                      <option value="general">General</option>
                      <option value="learner">Learner Support</option>
                      <option value="corporate">Corporate Training</option>
                      <option value="trainer">Trainer / Partner</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="label-base">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    [(ngModel)]="form.message"
                    required
                    class="input-base"
                    placeholder="How can we help?"
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
                    and consent to Elevate Skills processing my enquiry. *
                  </span>
                </label>
                @if (sending()) {
                  <es-loading-spinner
                    message="Sending your message…"
                    [compact]="true"
                    size="sm"
                  />
                }
                <button type="submit" [disabled]="f.invalid || sending()" class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2">
                  @if (sending()) {
                    <span class="inline-block w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true"></span>
                    Sending…
                  } @else {
                    Send message
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
export class ContactComponent {
  private readonly contactService = inject(ContactService);
  readonly BRAND = BRAND;
  readonly CONTACT = CONTACT;

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');

  form = {
    name: '',
    email: '',
    phone: '',
    type: 'general' as ContactEnquiryType,
    message: '',
    consent: false
  };

  readonly contactCards = [
    {
      initial: 'G',
      title: 'General Enquiries',
      description: 'Questions about courses, access, or learning.',
      email: CONTACT.general
    },
    {
      initial: 'B',
      title: 'Business / Corporate',
      description: 'Team training, demos, and proposals.',
      email: CONTACT.business
    },
    {
      initial: 'P',
      title: 'CPD Trainers and Partners',
      description: 'Partner with us to deliver online training.',
      email: CONTACT.trainers
    }
  ];

  onSubmit(): void {
    if (!this.form.consent) return;
    this.sending.set(true);
    this.error.set('');
    this.contactService
      .submit({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        phone: this.form.phone.trim() || undefined,
        type: this.form.type,
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
            `Something went wrong. Please try again or email us directly at ${CONTACT.general}.`
          );
        }
      });
  }
}
