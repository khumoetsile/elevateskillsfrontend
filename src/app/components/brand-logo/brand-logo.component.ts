import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BRAND } from '../../config/brand.constants';

@Component({
  selector: 'es-brand-logo',
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (link()) {
      <a
        routerLink="/"
        class="inline-flex items-center shrink-0 max-w-full"
        [attr.aria-label]="BRAND.name"
      >
        <img
          [src]="logoSrc()"
          [alt]="BRAND.name"
          [class]="logoClass()"
          decoding="async"
          fetchpriority="high"
        />
      </a>
    } @else {
      <span class="inline-flex items-center shrink-0 max-w-full">
        <img
          [src]="logoSrc()"
          [alt]="BRAND.name"
          [class]="logoClass()"
          decoding="async"
        />
      </span>
    }
  `
})
export class BrandLogoComponent {
  readonly BRAND = BRAND;

  variant = input<'light' | 'dark'>('light');
  layout = input<'full' | 'nav' | 'footer'>('nav');
  link = input(true);

  logoSrc(): string {
    return this.variant() === 'dark' ? BRAND.logoOnDark : BRAND.logoFull;
  }

  logoClass(): string {
    const base = 'block w-auto object-contain object-left';

    if (this.layout() === 'nav') {
      return `${base} h-10 max-h-10 max-w-[10.5rem] sm:h-11 sm:max-h-11 sm:max-w-[12rem] lg:h-12 lg:max-h-12 lg:max-w-[13.5rem]`;
    }
    if (this.layout() === 'footer') {
      return `${base} h-11 max-h-11 max-w-[12rem] sm:h-12 sm:max-h-12 sm:max-w-[13.5rem]`;
    }
    return `${base} h-12 max-h-12 max-w-[13.5rem] sm:h-14 sm:max-h-14 sm:max-w-[15rem]`;
  }
}
