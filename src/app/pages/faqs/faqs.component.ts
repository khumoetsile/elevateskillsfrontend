import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { PageHeroComponent } from '../../components/page-hero/page-hero.component';
import { FAQ_CATEGORIES, FaqCategory, FaqItem } from '../../data/faqs';

@Component({
  selector: 'es-faqs',
  standalone: true,
  imports: [RouterLink, FormsModule, NgClass, PageHeroComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <es-page-hero
      eyebrow="FAQs"
      title="Frequently Asked Questions"
      description="Find answers on courses, enrolment, certificates, payments and support."
    >
      <div class="mt-4 w-full max-w-md">
        <label class="sr-only" for="faq-search">Search FAQs</label>
        <div class="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.75"
            stroke="currentColor"
            class="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            id="faq-search"
            type="search"
            class="input-base pl-10 py-2.5 bg-white/95 shadow-sm"
            placeholder="Search questions…"
            [ngModel]="query()"
            (ngModelChange)="onQueryChange($event)"
          />
        </div>
      </div>
    </es-page-hero>

    <section class="section bg-brand-50">
      <div class="container-xl">
        <div class="grid grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)] gap-5 lg:gap-8">
          <aside class="lg:sticky lg:top-24 lg:self-start">
            <p class="text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
              Topics
            </p>
            <nav
              class="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0 -mx-1 px-1"
              aria-label="FAQ categories"
            >
              @for (category of categoryNav(); track category.id) {
                <button
                  type="button"
                  class="shrink-0 lg:w-full rounded-lg px-3 py-2 text-left text-sm font-semibold transition"
                  [class.bg-brand-900]="activeCategory() === category.id"
                  [class.text-white]="activeCategory() === category.id"
                  [class.bg-white]="activeCategory() !== category.id"
                  [class.text-slate-700]="activeCategory() !== category.id"
                  [class.border]="activeCategory() !== category.id"
                  [class.border-slate-200]="activeCategory() !== category.id"
                  (click)="setCategory(category.id)"
                >
                  <span class="flex items-center justify-between gap-2">
                    <span class="leading-snug">{{ category.shortTitle }}</span>
                    <span
                      class="rounded-md px-1.5 py-0.5 text-xs font-bold tabular-nums"
                      [ngClass]="
                        activeCategory() === category.id
                          ? 'bg-white/15 text-white'
                          : 'bg-slate-100 text-slate-500'
                      "
                    >
                      {{ category.count }}
                    </span>
                  </span>
                </button>
              }
            </nav>
          </aside>

          <div>
            @if (!activeItems().length) {
              <div class="rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <p class="font-semibold text-slate-900">No matching questions</p>
                <p class="mt-1.5 text-sm text-slate-600">
                  Try another search term or pick a different topic.
                </p>
                <button type="button" class="btn-secondary mt-4" (click)="clearFilters()">
                  Clear search
                </button>
              </div>
            } @else {
              <div class="mb-3 flex items-baseline justify-between gap-3">
                <h2 class="text-base sm:text-lg font-extrabold text-slate-900">
                  {{ activeTitle() }}
                </h2>
                <p class="text-xs text-slate-500 tabular-nums">
                  {{ activeItems().length }}
                  {{ activeItems().length === 1 ? 'question' : 'questions' }}
                </p>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-white overflow-hidden divide-y divide-slate-100">
                @for (item of activeItems(); track item.number) {
                  <div>
                    <button
                      type="button"
                      class="w-full flex items-start justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 text-left hover:bg-slate-50 transition"
                      (click)="toggle(item.number)"
                      [attr.aria-expanded]="openNumber() === item.number"
                    >
                      <span class="text-sm font-semibold text-slate-900 leading-snug">
                        <span class="text-brand-700 mr-1">{{ item.number }}.</span>
                        {{ item.question }}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform text-slate-400"
                        [class.rotate-180]="openNumber() === item.number"
                        aria-hidden="true"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>

                    @if (openNumber() === item.number) {
                      <div
                        class="px-4 pb-4 sm:px-5 sm:pb-4 text-sm text-slate-700 leading-relaxed space-y-2.5 bg-slate-50/70"
                      >
                        @for (paragraph of item.paragraphs; track paragraph) {
                          <p>{{ paragraph }}</p>
                        }

                        @if (item.bullets?.length) {
                          <ul class="space-y-1 list-disc pl-5">
                            @for (bullet of item.bullets; track bullet) {
                              <li>{{ bullet }}</li>
                            }
                          </ul>
                        }

                        @for (
                          paragraph of item.closingParagraphs ?? [];
                          track paragraph
                        ) {
                          <p>{{ paragraph }}</p>
                        }

                        @if (item.links?.length) {
                          <div class="flex flex-wrap gap-x-4 gap-y-1.5 pt-0.5">
                            @for (link of item.links; track link.href) {
                              @if (link.external === false) {
                                <a
                                  [routerLink]="link.href"
                                  class="font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                                >
                                  {{ link.label }}
                                </a>
                              } @else {
                                <a
                                  [href]="link.href"
                                  class="font-semibold text-brand-700 hover:text-brand-900 hover:underline"
                                >
                                  {{ link.label }}
                                </a>
                              }
                            }
                          </div>
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            }

            <div
              class="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4"
            >
              <div>
                <h3 class="text-sm font-bold text-slate-900">Still have questions?</h3>
                <p class="mt-0.5 text-sm text-slate-600">
                  Our team is happy to help.
                </p>
              </div>
              <a routerLink="/contact" class="btn-primary shrink-0">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class FaqsComponent {
  readonly categories = FAQ_CATEGORIES;
  readonly query = signal('');
  readonly activeCategory = signal<string>(FAQ_CATEGORIES[0].id);
  readonly openNumber = signal<number | null>(FAQ_CATEGORIES[0].items[0]?.number ?? null);

  readonly categoryNav = computed(() => {
    const q = this.query().trim().toLowerCase();

    return this.categories.map((category) => ({
      id: category.id,
      shortTitle: this.shortTitle(category),
      count: category.items.filter((item) => this.matchesQuery(item, q)).length
    }));
  });

  readonly activeTitle = computed(() => {
    const category = this.categories.find((c) => c.id === this.activeCategory());
    return category?.title ?? 'FAQs';
  });

  readonly activeItems = computed(() => {
    const q = this.query().trim().toLowerCase();
    const category = this.categories.find((c) => c.id === this.activeCategory());
    if (!category) {
      return [] as FaqItem[];
    }

    return category.items.filter((item) => this.matchesQuery(item, q));
  });

  onQueryChange(value: string): void {
    this.query.set(value);
    this.ensureVisibleCategory();
    this.openFirstVisible();
  }

  setCategory(id: string): void {
    this.activeCategory.set(id);
    this.openFirstVisible(id);
  }

  clearFilters(): void {
    this.query.set('');
    this.activeCategory.set(this.categories[0].id);
    this.openNumber.set(this.categories[0].items[0]?.number ?? null);
  }

  toggle(number: number): void {
    this.openNumber.update((current) => (current === number ? null : number));
  }

  private shortTitle(category: FaqCategory): string {
    const titles: Record<string, string> = {
      general: 'General',
      registration: 'Registration',
      learning: 'Learning',
      certificates: 'Certificates',
      payments: 'Payments',
      corporate: 'Corporate',
      trainers: 'Trainers',
      support: 'Support'
    };

    return titles[category.id] ?? category.title;
  }

  private matchesQuery(item: FaqItem, query: string): boolean {
    if (!query) {
      return true;
    }

    const haystack = [
      item.question,
      ...item.paragraphs,
      ...(item.bullets ?? []),
      ...(item.closingParagraphs ?? []),
      ...(item.links?.map((link) => link.label) ?? [])
    ]
      .join(' ')
      .toLowerCase();

    return haystack.includes(query);
  }

  private ensureVisibleCategory(): void {
    const q = this.query().trim().toLowerCase();
    const current = this.activeCategory();
    const currentHasMatches = this.categories
      .find((c) => c.id === current)
      ?.items.some((item) => this.matchesQuery(item, q));

    if (currentHasMatches) {
      return;
    }

    const next = this.categories.find((category) =>
      category.items.some((item) => this.matchesQuery(item, q))
    );

    if (next) {
      this.activeCategory.set(next.id);
    }
  }

  private openFirstVisible(categoryId = this.activeCategory()): void {
    const q = this.query().trim().toLowerCase();
    const category = this.categories.find((c) => c.id === categoryId);
    const first = category?.items.find((item) => this.matchesQuery(item, q));
    this.openNumber.set(first?.number ?? null);
  }
}
