import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';



import { BrandLogoComponent } from '../brand-logo/brand-logo.component';

import { RegisterInterestService } from '../../services/register-interest.service';



@Component({

  selector: 'es-navbar',

  standalone: true,

  imports: [RouterLink, RouterLinkActive, BrandLogoComponent],

  changeDetection: ChangeDetectionStrategy.OnPush,

  template: `

    <header

      class="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-100"

    >

      <nav class="container-xl flex items-center justify-between gap-3 sm:gap-4 h-[4.25rem] sm:h-[4.75rem] py-2">
        <div class="flex-shrink-0 min-w-0 max-w-[45%] sm:max-w-none">
          <es-brand-logo variant="light" layout="nav" />
        </div>



        <ul class="hidden lg:flex items-center gap-1">

          @for (link of primaryLinks; track link.path) {

            <li>

              <a

                [routerLink]="link.path"

                routerLinkActive="text-brand-700 bg-brand-50"

                [routerLinkActiveOptions]="{ exact: link.path === '/' }"

                class="px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50 transition"

              >

                {{ link.label }}

              </a>

            </li>

          }

        </ul>



        <div class="hidden lg:flex items-center gap-2">

          <button type="button" class="btn-ghost" (click)="openLogin()">Login</button>

          <button type="button" class="btn-primary" (click)="openRegister()">Register</button>

        </div>



        <button

          type="button"

          class="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-slate-700 hover:bg-slate-100"

          (click)="toggle()"

          [attr.aria-expanded]="isOpen()"

          aria-label="Toggle navigation"

        >

          @if (isOpen()) {

            <svg

              xmlns="http://www.w3.org/2000/svg"

              fill="none"

              viewBox="0 0 24 24"

              stroke-width="2"

              stroke="currentColor"

              class="w-6 h-6"

            >

              <path

                stroke-linecap="round"

                stroke-linejoin="round"

                d="M6 18 18 6M6 6l12 12"

              />

            </svg>

          } @else {

            <svg

              xmlns="http://www.w3.org/2000/svg"

              fill="none"

              viewBox="0 0 24 24"

              stroke-width="2"

              stroke="currentColor"

              class="w-6 h-6"

            >

              <path

                stroke-linecap="round"

                stroke-linejoin="round"

                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"

              />

            </svg>

          }

        </button>

      </nav>



      @if (isOpen()) {

        <div class="lg:hidden border-t border-slate-100 bg-white">

          <div class="container-xl py-4 space-y-1">

            @for (link of primaryLinks; track link.path) {

              <a

                [routerLink]="link.path"

                routerLinkActive="text-brand-700 bg-brand-50"

                [routerLinkActiveOptions]="{ exact: link.path === '/' }"

                (click)="close()"

                class="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:text-brand-700 hover:bg-slate-50"

              >

                {{ link.label }}

              </a>

            }

            <div class="pt-3 border-t border-slate-100 flex gap-2">

              <button type="button" (click)="openLogin(); close()" class="btn-secondary flex-1">Login</button>

              <button type="button" (click)="openRegister(); close()" class="btn-primary flex-1">Register</button>

            </div>

          </div>

        </div>

      }

    </header>

  `

})

export class NavbarComponent {

  private readonly interest = inject(RegisterInterestService);



  readonly primaryLinks = [

    { path: '/', label: 'Home' },

    { path: '/courses', label: 'Browse Courses' },

    { path: '/for-business', label: 'For Corporates' },
    { path: '/become-a-trainer', label: 'For CPD Trainers' },

    { path: '/about', label: 'About' },

    { path: '/contact', label: 'Contact' }

  ];



  readonly isOpen = signal(false);



  openLogin(): void {

    this.interest.open({ intent: 'login' });

  }



  openRegister(): void {

    this.interest.open({ intent: 'register' });

  }



  toggle(): void {

    this.isOpen.update((v) => !v);

  }



  close(): void {

    this.isOpen.set(false);

  }

}


