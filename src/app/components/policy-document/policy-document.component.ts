import { ChangeDetectionStrategy, Component, Input, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { PolicyMeta, PolicySection } from '../../data/policy.types';

@Component({
  selector: 'es-policy-document',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="bg-gradient-to-br from-brand-950 to-brand-800 text-white py-14 sm:py-20">
      <div class="container-xl max-w-4xl">
        <a
          routerLink="/policies"
          class="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-brand-100 hover:text-white"
        >
          ← All policies
        </a>
        <span
          class="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide ring-1 ring-white/20"
        >
          {{ badge }}
        </span>
        <h1 class="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
          {{ meta.title }}
        </h1>
        <p class="mt-3 text-brand-100">
          {{ meta.companyName }} · {{ meta.effectiveDate }}
        </p>
        @if (meta.summary) {
          <p class="mt-4 text-sm text-brand-100/90 max-w-2xl leading-relaxed">
            {{ meta.summary }}
          </p>
        }
      </div>
    </section>

    @if (internalControls.length || meta.owner || meta.approvedBy) {
      <section class="section bg-slate-50 border-b border-slate-200">
        <div class="container-xl max-w-4xl space-y-6">
          @if (meta.owner || meta.approvedBy) {
            <div class="card p-6 sm:p-8">
              <h2 class="text-lg font-bold text-slate-900">Document control</h2>
              <dl class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
                @if (meta.owner) {
                  <div>
                    <dt class="text-slate-500">Policy owner</dt>
                    <dd class="font-medium text-slate-900">{{ meta.owner }}</dd>
                  </div>
                }
                @if (meta.approvedBy) {
                  <div>
                    <dt class="text-slate-500">Approved by</dt>
                    <dd class="font-medium text-slate-900">{{ meta.approvedBy }}</dd>
                  </div>
                }
                <div>
                  <dt class="text-slate-500">Effective</dt>
                  <dd class="font-medium text-slate-900">{{ meta.effectiveDate }}</dd>
                </div>
              </dl>
            </div>
          }

          @if (internalControls.length) {
            <div class="card p-6 sm:p-8">
              <h2 class="text-lg font-bold text-slate-900">Internal controls</h2>
              <ul class="mt-4 space-y-2 list-disc pl-5 text-sm text-slate-700">
                @for (item of internalControls; track item) {
                  <li class="leading-relaxed">{{ item }}</li>
                }
              </ul>
            </div>
          }
        </div>
      </section>
    }

    <section class="section">
      <div class="container-xl max-w-4xl">
        <nav class="mb-10 p-5 rounded-2xl bg-brand-50 border border-brand-100">
          <h2 class="text-sm font-bold text-brand-900 uppercase tracking-wide">Contents</h2>
          <ol class="mt-3 columns-1 sm:columns-2 gap-x-8 text-sm space-y-1.5">
            @for (section of sections; track sectionKey(section)) {
              <li>
                <a
                  [href]="basePath + '#section-' + section.number"
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
          @for (section of sections; track sectionKey(section)) {
            <article
              [id]="'section-' + section.number"
              class="scroll-mt-24 border-b border-slate-100 pb-10 last:border-0"
            >
              <h2 class="text-xl sm:text-2xl font-extrabold text-slate-900">
                {{ section.number }}. {{ section.title }}
              </h2>

              @for (p of section.paragraphs ?? []; track p) {
                <p class="mt-3 text-slate-700 leading-relaxed text-sm sm:text-base">{{ p }}</p>
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
                    <p class="mt-2 text-slate-700 leading-relaxed text-sm sm:text-base">{{ p }}</p>
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

        <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a routerLink="/policies" class="btn-secondary inline-flex">All policies</a>
          <a routerLink="/contact" class="btn-primary inline-flex">Contact Us</a>
        </div>
      </div>
    </section>
  `
})
export class PolicyDocumentComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);

  @Input({ required: true }) meta!: PolicyMeta;
  @Input({ required: true }) sections!: PolicySection[];
  @Input() internalControls: string[] = [];
  @Input() badge = 'Policy';
  @Input() basePath = '/policies';

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment?.startsWith('section-')) {
        setTimeout(() => this.scrollToSectionId(fragment), 0);
      }
    });
  }

  sectionKey(section: PolicySection): string {
    return String(section.number ?? section.title);
  }

  scrollToSection(sectionNumber: number | string | undefined, event: Event): void {
    event.preventDefault();
    if (sectionNumber === undefined) return;
    const id = `section-${sectionNumber}`;
    this.scrollToSectionId(id);
    history.replaceState(null, '', `${this.basePath}#${id}`);
  }

  private scrollToSectionId(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
