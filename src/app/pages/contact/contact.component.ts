import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CONTACT } from '../../config/contact.constants';
import { ContactEnquiryType, ContactService } from '../../services/contact.service';

@Component({
  selector: 'es-contact',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 sm:py-20">
      <div class="container-xl max-w-3xl">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
          Contact
        </span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Let's talk
        </h1>
        <p class="mt-4 text-brand-100 text-lg leading-relaxed">
          Whether you're a learner, an organisation, or a potential partner —
          we'd love to hear from you.
        </p>
      </div>
    </section>

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
                <button type="submit" [disabled]="f.invalid || sending()" class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  {{ sending() ? 'Sending...' : 'Send message' }}
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

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');

  form = {
    name: '',
    email: '',
    phone: '',
    type: 'general' as ContactEnquiryType,
    message: ''
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
    this.sending.set(true);
    this.error.set('');
    this.contactService
      .submit({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        phone: this.form.phone.trim() || undefined,
        type: this.form.type,
        message: this.form.message.trim()
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
