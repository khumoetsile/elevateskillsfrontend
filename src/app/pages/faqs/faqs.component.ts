import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Faq {
  q: string;
  a: string;
}

@Component({
  selector: 'es-faqs',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-14 sm:py-20">
      <div class="container-xl max-w-3xl">
        <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20">
          FAQs
        </span>
        <h1 class="mt-4 text-4xl sm:text-5xl font-extrabold tracking-tight">
          Frequently asked questions
        </h1>
        <p class="mt-4 text-brand-100 text-lg leading-relaxed">
          Everything you need to know about learning with Elevate Skills.
        </p>
      </div>
    </section>

    <section class="section bg-brand-50">
      <div class="container-xl max-w-3xl">
        <div class="space-y-3">
          @for (item of faqs; let i = $index; track item.q) {
            <div class="card overflow-hidden">
              <button
                type="button"
                class="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-50 transition"
                (click)="toggle(i)"
                [attr.aria-expanded]="openIndex() === i"
              >
                <span class="font-semibold text-slate-900">{{ item.q }}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5 flex-shrink-0 transition-transform"
                  [class.rotate-180]="openIndex() === i"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              @if (openIndex() === i) {
                <div class="px-5 pb-5 text-sm text-slate-700 leading-relaxed">
                  {{ item.a }}
                </div>
              }
            </div>
          }
        </div>

        <div class="mt-12 text-center">
          <h3 class="text-xl font-bold text-slate-900">Still have questions?</h3>
          <p class="mt-2 text-slate-600 text-sm">
            Our team is happy to help. Reach out any time.
          </p>
          <a routerLink="/contact" class="btn-primary mt-5 inline-flex">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `
})
export class FaqsComponent {
  readonly openIndex = signal<number | null>(0);

  readonly faqs: Faq[] = [
    {
      q: 'How do I enrol in a course?',
      a: 'Browse our course catalog, select a course you like, and click "Enrol Now". You will be taken to our registration form to create your account and access the course.'
    },
    {
      q: 'Is learning fully online?',
      a: 'Yes. Elevate Skills courses are delivered fully online and self-paced, so you can learn any time, from anywhere, on any device.'
    },
    {
      q: 'Do I get a certificate?',
      a: 'Yes. Most courses include a certificate of completion once you complete all required activities and assessments.'
    },
    {
      q: 'Can my organisation enrol multiple learners?',
      a: 'Absolutely. We offer corporate training solutions for teams of any size. Visit our For Corporates page or contact us to request a tailored proposal.'
    },
    {
      q: 'What devices can I learn on?',
      a: 'The learner portal is fully responsive and works on desktop, tablet, and mobile devices.'
    },
    {
      q: 'Can I become a CPD trainer on Elevate Skills?',
      a: 'Yes. Visit the "CPD trainers" page to submit your expertise and course ideas. Our team will review and follow up with next steps.'
    },
    {
      q: 'Who do I contact for support?',
      a: 'You can reach our support team via the Contact page, or email help@elevateskills.online for general queries and sales@elevateskills.online for corporate enquiries.'
    }
  ];

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
