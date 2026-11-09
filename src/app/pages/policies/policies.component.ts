import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'es-policies',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-14 sm:py-20">
      <div class="container-xl max-w-4xl">
        <span
          class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20"
        >
          Legal &amp; compliance
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          Policies &amp; data protection
        </h1>
        <p class="mt-4 text-brand-100 max-w-2xl leading-relaxed">
          Official Elevate Skills policies covering privacy, terms of use, records
          management, and quality assurance. These documents support BQA and HRDC
          compliance and your rights as a learner or client.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container-xl max-w-4xl">
        <ul class="space-y-4">
          @for (doc of documents; track doc.path) {
            <li>
              <a
                [routerLink]="doc.path"
                class="block rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm transition hover:border-brand-300 hover:shadow-md"
              >
                <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <p class="text-xs font-semibold uppercase tracking-wide text-brand-700">
                      {{ doc.tag }}
                    </p>
                    <h2 class="mt-1 text-xl font-extrabold text-slate-900">
                      {{ doc.title }}
                    </h2>
                    <p class="mt-2 text-sm text-slate-600 leading-relaxed">
                      {{ doc.summary }}
                    </p>
                  </div>
                  <span class="shrink-0 text-sm font-semibold text-brand-800">
                    Read →
                  </span>
                </div>
              </a>
            </li>
          }
        </ul>

        <p class="mt-10 text-center text-sm text-slate-600">
          Questions about these policies?
          <a routerLink="/contact" class="font-semibold text-brand-800 hover:underline">
            Contact us
          </a>
        </p>
      </div>
    </section>
  `
})
export class PoliciesComponent {
  readonly documents = [
    {
      path: '/privacy',
      tag: 'Data protection',
      title: 'Privacy Notice',
      summary:
        'How we collect, use, store, and protect personal information, and your rights under Botswana data protection law.'
    },
    {
      path: '/terms',
      tag: 'Legal',
      title: 'Terms and Conditions',
      summary:
        'Rules for using Elevate Skills services, LMS access, payments, assessments, certification, and related obligations.'
    },
    {
      path: '/policies/records-management',
      tag: 'Records & security',
      title: 'Records Management Policy',
      summary:
        'How institutional and learner records are classified, stored, accessed, retained, archived, and disposed of.'
    },
    {
      path: '/policies/quality-management',
      tag: 'Quality assurance',
      title: 'Quality Management Policy',
      summary:
        'Our Quality Management System for programme delivery, assessment integrity, audits, and continuous improvement.'
    }
  ];
}
