import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  inject,
  signal
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'es-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-100">
      <nav class="container-xl flex items-center gap-4 h-16 sm:h-[4.25rem]">
        <div class="flex-shrink-0 min-w-0">
          <es-brand-logo variant="light" layout="nav" />
        </div>

        <ul class="hidden xl:flex items-center gap-0.5 flex-1 justify-center min-w-0">
          @for (link of primaryLinks; track link.path) {
            <li>
              <a
                [routerLink]="link.path"
                routerLinkActive="text-brand-800 after:scale-x-100"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                class="relative px-2.5 py-2 text-[13px] font-medium text-slate-600 hover:text-brand-800 transition
                       after:absolute after:left-2.5 after:right-2.5 after:bottom-0.5 after:h-0.5 after:rounded-full
                       after:bg-brand-800 after:scale-x-0 after:origin-left after:transition-transform"
              >
                {{ link.label }}
              </a>
            </li>
          }
          <li>
            <a
              href="https://examplus.elevateskills.online/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ExamPlus, opens in a new tab"
              class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-brand-900 to-brand-700 px-3 py-2
                     text-[13px] font-semibold text-white shadow-sm hover:shadow-md hover:from-brand-800 hover:to-brand-600
                     transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-amber-300">
                <path d="M5.5 2.75A1.75 1.75 0 0 0 3.75 4.5v11A1.75 1.75 0 0 0 5.5 17.25h9a1.75 1.75 0 0 0 1.75-1.75v-11A1.75 1.75 0 0 0 14.5 2.75h-9Zm1.25 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm.75 2.75a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z" />
              </svg>
              ExamPlus
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-3 h-3 text-white/70">
                <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 1 0-1.06l7.19-7.19H7.25a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0V7.59l-7.22 7.19a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
              </svg>
            </a>
          </li>
        </ul>

        <div class="hidden xl:flex items-center gap-2 flex-shrink-0 ml-auto">
          @if (auth.user(); as user) {
            <div class="relative" data-account-menu>
              <button
                type="button"
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white pl-1.5 pr-3 py-1.5
                       hover:border-brand-200 hover:bg-brand-50/60 transition"
                (click)="toggleAccount($event)"
                [attr.aria-expanded]="accountOpen()"
                aria-haspopup="menu"
              >
                <span
                  class="w-8 h-8 rounded-full bg-brand-900 text-white text-xs font-bold inline-flex items-center justify-center"
                >
                  {{ initials() }}
                </span>
                <span class="text-sm font-medium text-slate-800 max-w-[7.5rem] truncate">
                  {{ firstName() }}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-slate-400">
                  <path fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
                </svg>
              </button>

              @if (accountOpen()) {
                <div
                  role="menu"
                  class="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg py-2 z-50"
                >
                  <div class="px-3 pb-2 mb-1 border-b border-slate-100">
                    <p class="text-sm font-semibold text-slate-900 truncate">{{ user.display_name }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                  </div>
                  <button
                    type="button"
                    role="menuitem"
                    class="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    (click)="openPortal(); closeAccount()"
                  >
                    My learning
                  </button>
                  <a
                    routerLink="/courses"
                    role="menuitem"
                    class="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    (click)="closeAccount()"
                  >
                    Browse courses
                  </a>
                  <button
                    type="button"
                    role="menuitem"
                    class="w-full text-left px-3 py-2 text-sm text-red-700 hover:bg-red-50"
                    (click)="logout(); closeAccount()"
                    [disabled]="loggingOut()"
                  >
                    Log out
                  </button>
                </div>
              }
            </div>
          } @else {
            <a routerLink="/login" class="text-sm font-medium text-slate-700 hover:text-brand-800 px-2 py-2">
              Login
            </a>
            <a routerLink="/register" class="btn-primary !px-3.5 !py-2 text-sm">
              Register
            </a>
          }
        </div>

        <button
          type="button"
          class="xl:hidden ml-auto inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:bg-slate-100"
          (click)="toggle()"
          [attr.aria-expanded]="isOpen()"
          aria-label="Toggle navigation"
        >
          @if (isOpen()) {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          } @else {
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          }
        </button>
      </nav>

      @if (isOpen()) {
        <div class="xl:hidden border-t border-slate-100 bg-white">
          <div class="container-xl py-3 space-y-1">
            @for (link of primaryLinks; track link.path) {
              <a
                [routerLink]="link.path"
                routerLinkActive="text-brand-800 bg-brand-50"
                [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                (click)="close()"
                class="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {{ link.label }}
              </a>
            }
            <a
              href="https://examplus.elevateskills.online/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ExamPlus, opens in a new tab"
              (click)="close()"
              class="group flex items-center justify-between rounded-xl bg-gradient-to-r from-brand-950 via-brand-900 to-brand-700
                     px-4 py-3 text-white shadow-sm transition hover:shadow-md"
            >
              <span class="flex items-center gap-3">
                <span class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-amber-300">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M5.5 2.75A1.75 1.75 0 0 0 3.75 4.5v11A1.75 1.75 0 0 0 5.5 17.25h9a1.75 1.75 0 0 0 1.75-1.75v-11A1.75 1.75 0 0 0 14.5 2.75h-9Zm1.25 4a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm0 3.5a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5a.75.75 0 0 1-.75-.75Zm.75 2.75a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5h-2Z" />
                  </svg>
                </span>
                <span>
                  <span class="block text-sm font-semibold">ExamPlus</span>
                  <span class="block text-xs text-white/75">Practice for exam success</span>
                </span>
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-4 h-4 text-white/75 transition-transform group-hover:translate-x-0.5">
                <path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 0 1 0-1.06l7.19-7.19H7.25a.75.75 0 0 1 0-1.5h7a.75.75 0 0 1 .75.75v7a.75.75 0 0 1-1.5 0V7.59l-7.22 7.19a.75.75 0 0 1-1.06 0Z" clip-rule="evenodd" />
              </svg>
            </a>
            <div class="pt-3 mt-1 border-t border-slate-100 space-y-2">
              @if (auth.user(); as user) {
                <div class="px-1 pb-1">
                  <p class="text-sm font-semibold text-slate-900 truncate">{{ user.display_name }}</p>
                  <p class="text-xs text-slate-500 truncate">{{ user.email }}</p>
                </div>
                <button type="button" class="btn-primary w-full" (click)="openPortal(); close()">
                  My learning
                </button>
                <button type="button" class="btn-outline w-full" (click)="logout(); close()">
                  Log out
                </button>
              } @else {
                <div class="flex gap-2">
                  <a routerLink="/login" (click)="close()" class="btn-outline flex-1 text-center">Login</a>
                  <a routerLink="/register" (click)="close()" class="btn-primary flex-1 text-center">Register</a>
                </div>
              }
            </div>
          </div>
        </div>
      }
    </header>
  `
})
export class NavbarComponent {
  readonly auth = inject(AuthService);
  readonly isOpen = signal(false);
  readonly accountOpen = signal(false);
  readonly loggingOut = signal(false);

  readonly primaryLinks = [
    { path: '/', label: 'Home' },
    { path: '/courses', label: 'Courses' },
    { path: '/for-business', label: 'Corporates' },
    { path: '/become-a-trainer', label: 'Trainers' },
    { path: '/about', label: 'About' },
    { path: '/faqs', label: 'FAQs' },
    { path: '/contact', label: 'Contact' }
  ];

  readonly firstName = computed(() => {
    const user = this.auth.user();
    if (!user) return '';
    return user.first_name?.trim() || user.display_name?.split(/\s+/)[0] || user.login;
  });

  readonly initials = computed(() => {
    const user = this.auth.user();
    if (!user) return '?';
    const first = (user.first_name || '').trim();
    const last = (user.last_name || '').trim();
    if (first && last) return `${first[0]}${last[0]}`.toUpperCase();
    const source = user.display_name || user.email || user.login || '?';
    return source.slice(0, 2).toUpperCase();
  });

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('[data-account-menu]')) {
      this.accountOpen.set(false);
    }
  }

  toggle(): void {
    this.isOpen.update((v) => !v);
    this.accountOpen.set(false);
  }

  close(): void {
    this.isOpen.set(false);
  }

  toggleAccount(event: Event): void {
    event.stopPropagation();
    this.accountOpen.update((v) => !v);
  }

  closeAccount(): void {
    this.accountOpen.set(false);
  }

  openPortal(): void {
    this.auth.openLearnerPortal();
  }

  logout(): void {
    this.loggingOut.set(true);
    this.auth.logout().subscribe({
      next: () => this.loggingOut.set(false),
      error: () => this.loggingOut.set(false)
    });
  }
}
