import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CONTACT } from '../../config/contact.constants';
import {
  RegisterInterestIntent,
  RegisterInterestService
} from '../../services/register-interest.service';

@Component({
  selector: 'es-register-interest-modal',
  standalone: true,
  imports: [FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (interest.isOpen()) {
      <div
        class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-interest-title"
      >
        <button
          type="button"
          class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          aria-label="Close"
          (click)="close()"
        ></button>

        <div
          class="relative w-full sm:max-w-3xl bg-brand-50 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        >
          <div class="sticky top-0 z-10 bg-brand-50 border-b border-brand-100 px-6 py-4 flex items-start justify-between gap-4 rounded-t-2xl">
            <div>
              <h2 id="register-interest-title" class="text-xl font-extrabold text-slate-900">
                Register Your Interest
              </h2>
              <p class="mt-1 text-sm text-slate-700 max-w-2xl">
                Elevate Skills is launching flexible online courses for individuals,
                professionals, entrepreneurs, and organisations that want to build
                practical skills for today's workplace.
              </p>
            </div>
            <button
              type="button"
              class="w-9 h-9 rounded-lg text-slate-500 hover:bg-white flex items-center justify-center shrink-0"
              aria-label="Close"
              (click)="close()"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="px-6 py-5">
            @if (submitted()) {
              <div class="rounded-xl bg-emerald-50 text-emerald-800 p-5 text-sm leading-relaxed border border-emerald-100">
                Thank you! Your interest has been registered. Our team will contact you shortly at the email you provided.
              </div>
              <button type="button" class="btn-primary w-full mt-5" (click)="close()">
                Close
              </button>
            } @else {
              @if (intentLabel()) {
                <p class="mb-4 text-sm font-medium text-brand-900 bg-white rounded-lg px-3 py-2 border border-brand-100">
                  {{ intentLabel() }}
                </p>
              }

              <p class="mb-5 text-sm text-slate-700">
                Complete the short form below and we will notify you when your selected courses are ready.
              </p>

              <form class="space-y-5" (ngSubmit)="onSubmit()" #f="ngForm">
                <fieldset class="rounded-xl bg-white border border-brand-100 p-4 sm:p-5">
                  <legend class="px-1 text-sm font-bold text-slate-900">
                    Personal Details
                  </legend>
                  <div class="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="label-base" for="ri-name">Full Name <span class="text-red-600" aria-hidden="true">*</span></label>
                      <input id="ri-name" type="text" name="name" [(ngModel)]="form.name" required class="input-base" />
                      @if (triedSubmit() && !form.name.trim()) {
                        <p class="mt-1 text-sm text-red-600">Full name is required.</p>
                      }
                    </div>
                    <div>
                      <label class="label-base" for="ri-phone">Contact Number <span class="text-red-600" aria-hidden="true">*</span></label>
                      <input id="ri-phone" type="tel" name="phone" [(ngModel)]="form.phone" required class="input-base" />
                      @if (triedSubmit() && !form.phone.trim()) {
                        <p class="mt-1 text-sm text-red-600">Contact number is required.</p>
                      }
                    </div>
                    <div>
                      <label class="label-base" for="ri-email">Email Address <span class="text-red-600" aria-hidden="true">*</span></label>
                      <input id="ri-email" type="email" name="email" [(ngModel)]="form.email" required email class="input-base" />
                      @if (triedSubmit() && !form.email.trim()) {
                        <p class="mt-1 text-sm text-red-600">Email address is required.</p>
                      } @else if (triedSubmit() && form.email.trim() && !isValidEmail(form.email)) {
                        <p class="mt-1 text-sm text-red-600">Please enter a valid email address.</p>
                      }
                    </div>
                    <div>
                      <label class="label-base" for="ri-friend-phone">Friend's Contact Number</label>
                      <input id="ri-friend-phone" type="tel" name="friendPhone" [(ngModel)]="form.friendPhone" class="input-base" />
                      <p class="mt-1.5 text-xs text-slate-500">
                        Do you know someone who may also want to elevate their skills? Share their number below.
                      </p>
                    </div>
                  </div>
                </fieldset>

                <fieldset class="rounded-xl bg-white border border-brand-100 p-4 sm:p-5">
                  <legend class="px-1 text-sm font-bold text-slate-900">
                    Courses I Am Interested In
                  </legend>
                  <p class="mt-3 text-sm text-slate-600">
                    Please select the courses or categories you may be interested in:
                  </p>
                  <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    @for (option of courseOptions; track option) {
                      <label class="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          [name]="courseFieldName(option)"
                          [ngModel]="isSelected(option)"
                          (ngModelChange)="toggleCourse(option, $event)"
                          class="mt-0.5 rounded border-slate-300 text-brand-900 focus:ring-brand-800"
                        />
                        <span>{{ option }}</span>
                      </label>
                    }
                  </div>
                  <div class="mt-4">
                    <label class="label-base" for="ri-other-course">Other</label>
                    <input
                      id="ri-other-course"
                      type="text"
                      name="otherCourse"
                      [(ngModel)]="form.otherCourse"
                      class="input-base"
                      placeholder="Tell us another course or category"
                    />
                  </div>
                  @if (!hasSelectedInterest() && triedSubmit()) {
                    <p class="mt-2 text-sm text-red-600">
                      Please select at least one course or enter another area of interest.
                    </p>
                  }
                </fieldset>

                <fieldset class="rounded-xl bg-white border border-brand-100 p-4 sm:p-5">
                  <legend class="px-1 text-sm font-bold text-slate-900">
                    Confidentiality and Consent
                  </legend>
                  <p class="mt-3 text-sm text-slate-600 leading-relaxed">
                    By submitting this form, you agree that Elevate Skills may use the
                    personal details provided only for the purpose of notifying you when
                    the selected courses are ready, sharing relevant course updates, and
                    contacting you about Elevate Skills learning opportunities.
                  </p>
                  <p class="mt-3 text-sm text-slate-600 leading-relaxed">
                    Your information will not be sold, shared with unauthorised third
                    parties, or used for unrelated purposes. If you provide a friend's
                    contact number, you confirm that the number has been shared in good
                    faith for the purpose of receiving information about Elevate Skills courses.
                  </p>
                  <label class="mt-4 flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consent"
                      [(ngModel)]="form.consent"
                      required
                      class="mt-0.5 rounded border-slate-300 text-brand-700 focus:ring-brand-600"
                    />
                    <span>I consent to Elevate Skills contacting me about the courses I selected.</span>
                  </label>
                </fieldset>

                @if (error()) {
                  <p class="text-sm text-red-600">{{ error() }}</p>
                }

                <button
                  type="submit"
                  [disabled]="f.invalid || sending()"
                  class="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {{ sending() ? 'Sending...' : 'Register My Interest' }}
                </button>
                <p class="text-xs text-slate-500 text-center">
                  Submissions are sent to {{ CONTACT.general }}.
                </p>
              </form>
            }
          </div>
        </div>
      </div>
    }
  `
})
export class RegisterInterestModalComponent {
  readonly CONTACT = CONTACT;
  readonly interest = inject(RegisterInterestService);

  readonly submitted = signal(false);
  readonly sending = signal(false);
  readonly error = signal('');
  readonly triedSubmit = signal(false);

  readonly courseOptions = [
    'Leading High-Performance Teams',
    'Customer Service Skills',
    'Sales and Marketing Skills',
    'Digital Skills',
    'Microsoft Office and Productivity Tools',
    'Business and Entrepreneurship',
    'Financial Literacy',
    'Job Readiness and Career Development',
    'Communication Skills',
    'Personal Development',
    'Cybersecurity Awareness',
    'Health and Safety Basics'
  ];

  form = {
    name: '',
    email: '',
    phone: '',
    friendPhone: '',
    selectedCourses: [] as string[],
    otherCourse: '',
    course: '',
    message: '',
    consent: false
  };

  private intent: RegisterInterestIntent | undefined;

  constructor() {
    effect(() => {
      if (this.interest.isOpen()) {
        const ctx = this.interest.context();
        this.intent = ctx.intent;
        this.resetForm(ctx.course);
        this.submitted.set(false);
        this.error.set('');
        this.triedSubmit.set(false);
        this.sending.set(false);
      }
    });
  }

  intentLabel(): string {
    const course = this.form.course?.trim();
    switch (this.intent) {
      case 'enrol':
        return course ? `Enrolment interest: ${course}` : 'Course enrolment interest';
      case 'login':
        return course ? `Login / access interest: ${course}` : 'Login / account access interest';
      case 'register':
        return 'New learner registration interest';
      default:
        return course ? `Interest in: ${course}` : '';
    }
  }

  courseFieldName(option: string): string {
    return `course-${option.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  }

  isSelected(option: string): boolean {
    return this.form.selectedCourses.includes(option);
  }

  toggleCourse(option: string, checked: boolean): void {
    if (checked && !this.form.selectedCourses.includes(option)) {
      this.form.selectedCourses = [...this.form.selectedCourses, option];
    } else if (!checked) {
      this.form.selectedCourses = this.form.selectedCourses.filter((item) => item !== option);
    }
  }

  hasSelectedInterest(): boolean {
    return (
      this.form.selectedCourses.length > 0 ||
      this.form.otherCourse.trim().length > 0 ||
      this.form.course.trim().length > 0
    );
  }

  close(): void {
    this.interest.close();
  }

  isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }

  onSubmit(): void {
    this.triedSubmit.set(true);
    if (
      !this.form.name.trim() ||
      !this.form.email.trim() ||
      !this.form.phone.trim() ||
      !this.isValidEmail(this.form.email) ||
      !this.form.consent ||
      !this.hasSelectedInterest()
    ) {
      return;
    }

    this.sending.set(true);
    this.error.set('');
    this.interest
      .submit({
        name: this.form.name.trim(),
        email: this.form.email.trim(),
        phone: this.form.phone.trim(),
        friendPhone: this.form.friendPhone.trim() || undefined,
        course: this.form.course.trim() || undefined,
        selectedCourses: this.form.selectedCourses,
        otherCourse: this.form.otherCourse.trim() || undefined,
        intent: this.intent,
        message: this.form.message.trim() || undefined,
        consent: this.form.consent
      })
      .subscribe({
        next: () => {
          this.sending.set(false);
          this.submitted.set(true);
        },
        error: () => {
          this.sending.set(false);
          this.error.set(
            'Something went wrong. Please try again or email us directly at help@elevateskills.online.'
          );
        }
      });
  }

  private resetForm(course?: string): void {
    this.form = {
      name: '',
      email: '',
      phone: '',
      friendPhone: '',
      selectedCourses: course ? [course] : [],
      otherCourse: '',
      course: course ?? '',
      message: '',
      consent: false
    };
  }
}
