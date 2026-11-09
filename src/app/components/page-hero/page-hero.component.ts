import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'es-page-hero',
  standalone: true,
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-hero">
      <div class="page-hero__glow" aria-hidden="true"></div>

      <div class="container-xl relative py-7 sm:py-8 lg:py-9">
        <div
          class="grid grid-cols-1 gap-6 lg:gap-8 items-center"
          [ngClass]="imageSrc ? 'lg:grid-cols-2' : ''"
        >
          <div [ngClass]="imageSrc ? 'order-2 lg:order-1' : ''">
            @if (eyebrow) {
              <span class="page-hero__eyebrow">{{ eyebrow }}</span>
            }

            <h1
              class="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-white"
            >
              {{ title }}
            </h1>

            @if (description) {
              <p
                class="mt-3 text-sm sm:text-base text-slate-100/90 max-w-2xl leading-relaxed"
              >
                {{ description }}
              </p>
            }

            <ng-content></ng-content>
          </div>

          @if (imageSrc) {
            <div class="relative order-1 lg:order-2 lg:pl-4">
              <div
                class="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20"
              >
                <img
                  [src]="imageSrc"
                  [alt]="imageAlt"
                  class="w-full h-full object-cover object-center"
                  decoding="async"
                />
              </div>

              @if (statValue) {
                <div
                  class="absolute -bottom-4 left-4 sm:-bottom-6 sm:left-6 bg-white rounded-xl shadow-xl px-5 py-4 border border-white/80 max-w-[220px]"
                >
                  <p class="text-2xl font-extrabold text-brand-900 leading-none">
                    {{ statValue }}
                  </p>
                  @if (statLabel) {
                    <p class="mt-1 text-sm text-slate-600 leading-snug">
                      {{ statLabel }}
                    </p>
                  }
                </div>
              }
            </div>
          }
        </div>
      </div>
    </section>
  `
})
export class PageHeroComponent {
  @Input({ required: true }) title = '';
  @Input() eyebrow = '';
  @Input() description = '';
  @Input() imageSrc = '';
  @Input() imageAlt = '';
  @Input() statValue = '';
  @Input() statLabel = '';
}
