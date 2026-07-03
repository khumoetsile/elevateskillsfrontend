import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  TERMS_META,
  TERMS_SECTIONS,
  TermsSection
} from '../../data/terms-and-conditions';

@Component({
  selector: 'es-terms',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-900 to-brand-700 text-white py-14 sm:py-20">
      <div class="container-xl max-w-4xl">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20"
        >
          Legal
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Enterprise Terms and Conditions
        </h1>
        <p class="mt-3 text-brand-100">
          {{ meta.companyName }} · Effective {{ meta.effectiveDate }}
        </p>
      </div>
    </section>

    <section class="section bg-slate-50 border-b border-slate-200">
      <div class="container-xl max-w-4xl">
        <div class="card p-6 sm:p-8">
          <h2 class="text-lg font-bold text-slate-900">Company information</h2>
          <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            <div>
              <dt class="text-slate-500">Legal name</dt>
              <dd class="font-medium text-slate-900">{{ meta.companyName }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">UIN</dt>
              <dd class="font-medium text-slate-900">{{ meta.uin }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Physical address</dt>
              <dd class="font-medium text-slate-900">{{ meta.physicalAddress }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Postal address</dt>
              <dd class="font-medium text-slate-900">{{ meta.postalAddress }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Telephone</dt>
              <dd class="font-medium text-slate-900">{{ meta.telephone }}</dd>
            </div>
            <div>
              <dt class="text-slate-500">Website</dt>
              <dd class="font-medium text-slate-900">{{ meta.website }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-xl max-w-4xl">
        <nav class="mb-10 p-5 rounded-2xl bg-brand-50 border border-brand-100">
          <h2 class="text-sm font-bold text-brand-900 uppercase tracking-wide">
            Contents
          </h2>
          <ol class="mt-3 columns-1 sm:columns-2 gap-x-8 text-sm space-y-1.5">
            @for (section of sections; track section.number) {
              <li>
                <a
                  [href]="'/terms#section-' + section.number"
                  (click)="scrollToSection(section.number, $event)"
                  class="text-brand-800 hover:text-brand-900 hover:underline"
                >
                  {{ section.number }}. {{ section.title }}
                </a>
              </li>
            }
          </ol>
        </nav>

        <div class="space-y-10">
          @for (section of sections; track section.number) {
            <article
              [id]="'section-' + section.number"
              class="scroll-mt-24 border-b border-slate-100 pb-10 last:border-0"
            >
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
                {{ section.number }}. {{ section.title }}
              </h2>

              @for (p of section.paragraphs ?? []; track p) {
                <p class="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">
                  {{ p }}
                </p>
              }

              @if (section.bullets?.length) {
                <ul class="mt-3 space-y-2 list-disc pl-5 text-slate-700 text-sm sm:text-base">
                  @for (item of section.bullets; track item) {
                    <li class="leading-relaxed">{{ item }}</li>
                  }
                </ul>
              }

              @for (sub of section.subsections ?? []; track sub.title) {
                <div class="mt-5">
                  <h3 class="text-base font-bold text-slate-900">{{ sub.title }}</h3>
                  @for (p of sub.paragraphs ?? []; track p) {
                    <p class="mt-2 text-slate-700 leading-relaxed text-sm sm:text-base">
                      {{ p }}
                    </p>
                  }
                  @if (sub.bullets?.length) {
                    <ul class="mt-2 space-y-2 list-disc pl-5 text-slate-700 text-sm sm:text-base">
                      @for (item of sub.bullets; track item) {
                        <li class="leading-relaxed">{{ item }}</li>
                      }
                    </ul>
                  }
                </div>
              }
            </article>
          }
        </div>

        <div class="mt-12 card p-6 sm:p-8 bg-slate-50">
          <h2 class="text-lg font-bold text-slate-900">Signature page</h2>
          <p class="mt-2 text-sm text-slate-600 leading-relaxed">
            For corporate or enterprise agreements, signed copies may be requested
            from Elevate Skills. Contact us for a formal agreement document.
          </p>
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div class="space-y-3">
              <p class="font-semibold text-slate-900">Participant / Client</p>
              <p class="text-slate-500">Name, organisation, signature, and date</p>
            </div>
            <div class="space-y-3">
              <p class="font-semibold text-slate-900">For Elevate Skills (Pty) Ltd</p>
              <p class="text-slate-500">Authorised representative, position, signature, and date</p>
            </div>
          </div>
        </div>

        <div class="mt-10 text-center">
          <p class="text-sm text-slate-600">
            Questions about these terms?
          </p>
          <a routerLink="/contact" class="btn-primary mt-4 inline-flex">
            Contact Us
          </a>
        </div>
      </div>
    </section>
  `
})
export class TermsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  readonly meta = TERMS_META;
  readonly sections: TermsSection[] = TERMS_SECTIONS;

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment?.startsWith('section-')) {
        // Defer until section headings are rendered.
        setTimeout(() => this.scrollToSectionId(fragment), 0);
      }
    });
  }

  scrollToSection(sectionNumber: number, event: Event): void {
    event.preventDefault();
    const id = `section-${sectionNumber}`;
    this.scrollToSectionId(id);
    history.replaceState(null, '', `/terms#${id}`);
  }

  private scrollToSectionId(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
