import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CONTACT } from '../../config/contact.constants';

@Component({
  selector: 'es-for-business',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-14 sm:py-20">
      <div class="container-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
            For Corporates
          </span>
          <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Train smarter. Track progress.
          </h1>
          <p class="mt-4 text-brand-100 text-lg leading-relaxed">
            Build skills that drive performance and scale up.
          </p>
          <p class="mt-3 text-brand-100 leading-relaxed">
            Elevate Skills helps organisations deliver practical, scalable, and
            measurable online training for employees, teams, and departments.
            Our platform makes workplace learning easier to manage, easier to
            track, and easier to scale.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a [href]="'mailto:' + CONTACT.corporateMailto" class="btn-primary bg-white !text-brand-800 hover:!bg-brand-50">
              Request Demo
            </a>
            <a [href]="'mailto:' + CONTACT.corporateMailto" class="btn-outline-white">
              Contact Sales
            </a>
          </div>
        </div>
        <div class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20">
          <img
            src="https://images.unsplash.com/photo-1573164574511-73c773193279?w=1200&auto=format&fit=crop&q=70"
            alt="African professionals in an organisational training session"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>

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

          <div id="enquiry" class="card p-8">
            <h3 class="text-2xl font-extrabold text-slate-900">
              Request corporate training
            </h3>
            <p class="mt-2 text-slate-600 text-sm">
              Tell us about your organisation and we'll come back with a
              tailored proposal.
            </p>

            @if (submitted()) {
              <div class="mt-6 rounded-lg bg-emerald-50 text-emerald-800 p-4 text-sm">
                Thanks! We've received your enquiry and will be in touch soon.
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
                  <label class="label-base">Number of learners</label>
                  <select name="learners" [(ngModel)]="form.learners" class="input-base">
                    <option value="1-10">1 - 10</option>
                    <option value="11-50">11 - 50</option>
                    <option value="51-200">51 - 200</option>
                    <option value="200+">200+</option>
                  </select>
                </div>
                <div>
                  <label class="label-base">Tell us about your training needs</label>
                  <textarea
                    name="message"
                    rows="4"
                    [(ngModel)]="form.message"
                    class="input-base"
                    placeholder="What skills or outcomes are you targeting?"
                  ></textarea>
                </div>
                <button type="submit" [disabled]="f.invalid" class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
                  Submit enquiry
                </button>
              </form>
            }
          </div>
        </div>
      </div>
    </section>
  `
})
export class ForBusinessComponent {
  readonly CONTACT = CONTACT;
  readonly submitted = signal(false);

  form = {
    name: '',
    company: '',
    email: '',
    phone: '',
    learners: '1-10',
    message: ''
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

  onSubmit(): void {
    this.submitted.set(true);
  }
}
