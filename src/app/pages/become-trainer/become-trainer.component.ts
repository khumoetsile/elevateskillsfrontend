import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { BRAND } from '../../config/brand.constants';
import { ContactService } from '../../services/contact.service';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { PageHeroComponent } from '../../components/page-hero/page-hero.component';

@Component({
  selector: 'es-become-trainer',
  standalone: true,
  imports: [FormsModule, RouterLink, LoadingSpinnerComponent, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-page-hero
      eyebrow="Partner With Us"
      title="For CPD Trainers on Elevate Skills"
      description="Share your expertise with learners and organisations across Botswana. We partner with subject-matter experts, professionals, and training providers who want to deliver impactful online training."
      [imageSrc]="BRAND.heroBecomeTrainer"
      imageAlt="Professional trainer in a modern office overlooking the city"
      statValue="100%"
      statLabel="Online and flexible learning"
    ></es-page-hero>

    <section class="section bg-brand-50">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-5 gap-10">
        <div class="lg:col-span-2 space-y-6">
          <div>
            <span class="chip">Why partner with us</span>
            <h2 class="mt-3 text-2xl font-extrabold text-slate-900">
              Focus on content, we handle the platform
            </h2>
            <p class="mt-3 text-slate-700 leading-relaxed">
              Elevate Skills provides a polished online learning environment,
              so you can focus on designing and delivering great learning
              experiences.
            </p>
          </div>
          <ul class="space-y-3">
            @for (benefit of benefits; track benefit) {
              <li class="flex gap-3 text-slate-700">
                <span class="w-6 h-6 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </span>
                <span class="text-sm">{{ benefit }}</span>
              </li>
            }
          </ul>
        </div>

        <div class="lg:col-span-3">
          <div class="card p-8">
            <h3 class="text-2xl font-extrabold text-slate-900">
              Submit your interest
            </h3>
            <p class="mt-2 text-slate-600 text-sm">
              Tell us about yourself and the training you'd like to deliver.
            </p>

            @if (submitted()) {
              <div class="mt-6 rounded-lg bg-emerald-50 text-emerald-800 p-4 text-sm">
                Thanks for your interest! We'll review your submission and get back to you.
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
                    <input type="email" name="email" [(ngModel)]="form.email" required email class="input-base" />
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label class="label-base">Phone</label>
                    <input type="tel" name="phone" [(ngModel)]="form.phone" class="input-base" />
                  </div>
                  <div>
                    <label class="label-base">Area of expertise</label>
                    <input type="text" name="expertise" [(ngModel)]="form.expertise" required placeholder="e.g. Leadership, Finance, Digital Marketing" class="input-base" />
                  </div>
                </div>
                <div>
                  <label class="label-base">Years of experience</label>
                  <select name="experience" [(ngModel)]="form.experience" class="input-base">
                    <option value="1-3">1 – 3 years</option>
                    <option value="4-7">4 – 7 years</option>
                    <option value="8-15">8 – 15 years</option>
                    <option value="15+">15+ years</option>
                  </select>
                </div>
                <div>
                  <label class="label-base">Topics you'd like to teach</label>
                  <textarea
                    name="topics"
                    rows="3"
                    [(ngModel)]="form.topics"
                    class="input-base"
                    placeholder="List 2–5 course topics you can confidently deliver."
                  ></textarea>
                </div>
                <div>
                  <label class="label-base">Short bio / background</label>
                  <textarea
                    name="bio"
                    rows="4"
                    [(ngModel)]="form.bio"
                    class="input-base"
                    placeholder="Tell us briefly about your background and why you want to teach with Elevate Skills."
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
                    and consent to Elevate Skills processing my application details. *
                  </span>
                </label>

                @if (error()) {
                  <p class="text-sm text-red-600">{{ error() }}</p>
                }

                @if (sending()) {
                  <es-loading-spinner message="Submitting…" [compact]="true" size="sm" />
                }

                <button
                  type="submit"
                  [disabled]="f.invalid || sending()"
                  class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ sending() ? 'Submitting…' : 'Submit Interest' }}
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class BecomeTrainerComponent {
  private readonly contact = inject(ContactService);
  readonly BRAND = BRAND;
  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');

  form = {
    name: '',
    email: '',
    phone: '',
    expertise: '',
    experience: '1-3',
    topics: '',
    bio: '',
    consent: false
  };

  readonly benefits = [
    'Reach learners and organisations across Botswana',
    'Use a professional online learning environment',
    'Marketing support through the Elevate Skills platform',
    'Flexible partnership models to suit your delivery style',
    'Opportunity to deliver corporate training engagements'
  ];

  onSubmit(): void {
    if (this.sending() || !this.form.consent) return;
    this.error.set('');
    this.sending.set(true);

    const message = [
      `Area of expertise: ${this.form.expertise.trim()}`,
      `Years of experience: ${this.form.experience}`,
      this.form.topics.trim() ? `Topics: ${this.form.topics.trim()}` : null,
      this.form.bio.trim() ? `Bio: ${this.form.bio.trim()}` : null
    ]
      .filter(Boolean)
      .join('\n\n');

    this.contact
      .submit({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        phone: this.form.phone.trim() || undefined,
        type: 'trainer',
        subject: 'Trainer registration application',
        message,
        consent: true,
        data: {
          expertise: this.form.expertise.trim(),
          experience: this.form.experience,
          topics: this.form.topics.trim() || null,
          bio: this.form.bio.trim() || null
        }
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.submitted.set(true);
        },
        error: (err) => {
          this.sending.set(false);
          this.error.set(
            err?.error?.message ||
              'Unable to submit your application. Please try again or email sales@elevateskills.online.'
          );
        }
      });
  }
}
