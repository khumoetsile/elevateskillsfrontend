import {
  ChangeDetectionStrategy,
  Component,
  Input,
  signal
} from '@angular/core';

import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'es-testimonial',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @let t = testimonial();
    @if (t) {
      <figure
        class="card p-7 h-full flex flex-col justify-between"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-8 h-8 text-brand-200"
        >
          <path
            d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z"
          />
        </svg>
        <blockquote class="mt-4 text-slate-700 text-base leading-relaxed">
          "{{ t.quote }}"
        </blockquote>
        <figcaption class="mt-6 flex items-center gap-3">
          <span
            class="inline-flex items-center justify-center w-11 h-11 rounded-full bg-brand-100 text-brand-900 font-bold"
          >
            {{ t.avatarInitials }}
          </span>
          <div>
            <div class="font-semibold text-slate-900 text-sm">
              {{ t.name }}
            </div>
            <div class="text-xs text-slate-500">{{ t.role }}</div>
          </div>
        </figcaption>
      </figure>
    }
  `
})
export class TestimonialComponent {
  readonly testimonial = signal<Testimonial | null>(null);

  @Input({ required: true }) set data(value: Testimonial) {
    this.testimonial.set(value);
  }
}
