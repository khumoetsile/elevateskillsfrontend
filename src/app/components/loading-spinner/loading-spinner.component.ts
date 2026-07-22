import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'es-loading-spinner',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="flex flex-col items-center justify-center gap-4 text-center"
      [class.py-8]="!compact()"
      [class.py-3]="compact()"
      [class.min-h-[8rem]]="!compact()"
      role="status"
      aria-live="polite"
    >
      <div
        class="rounded-full border-4 border-brand-200 border-t-brand-700 animate-spin"
        [class]="sizeClass()"
        aria-hidden="true"
      ></div>
      @if (message()) {
        <p class="text-sm text-slate-600 max-w-xs">{{ message() }}</p>
      }
    </div>
  `
})
export class LoadingSpinnerComponent {
  message = input('Loading…');
  compact = input(false);
  size = input<'sm' | 'md' | 'lg'>('md');

  readonly sizeClass = computed(() => {
    switch (this.size()) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-14 h-14';
      default:
        return 'w-11 h-11';
    }
  });
}
