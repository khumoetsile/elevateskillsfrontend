import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { CONTACT } from '../../config/contact.constants';

@Component({
  selector: 'es-footer',
  standalone: true,
  imports: [RouterLink, BrandLogoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-slate-900 text-slate-300">
      <div class="container-xl py-9">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          <div>
            <div class="mb-4 inline-flex rounded-lg bg-white px-3 py-2.5">
              <es-brand-logo variant="light" layout="footer" [link]="true" />
            </div>
            <p class="text-sm text-slate-400 leading-relaxed">
              Botswana's online training platform. Practical skills, flexible
              learning, and real outcomes — for individuals and organisations.
            </p>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4 text-sm tracking-wide">
              Explore
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a routerLink="/courses" class="hover:text-white">
                  Browse Courses
                </a>
              </li>
              <li>
                <a routerLink="/for-business" class="hover:text-white">
                  For Corporates
                </a>
              </li>
              <li>
                <a routerLink="/become-a-trainer" class="hover:text-white">
                  For CPD Trainers
                </a>
              </li>
              <li>
                <a routerLink="/how-it-works" class="hover:text-white">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4 text-sm tracking-wide">
              Company
            </h4>
            <ul class="space-y-2 text-sm">
              <li>
                <a routerLink="/about" class="hover:text-white">About Us</a>
              </li>
              <li>
                <a routerLink="/faqs" class="hover:text-white">FAQs</a>
              </li>
              <li>
                <a routerLink="/terms" class="hover:text-white">Terms &amp; Conditions</a>
              </li>
              <li>
                <a routerLink="/contact" class="hover:text-white">Contact</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-white font-semibold mb-4 text-sm tracking-wide">
              Get in Touch
            </h4>
            <ul class="space-y-2 text-sm text-slate-400">
              <li>Gaborone, Botswana</li>
              <li>
                <a
                  [href]="'mailto:' + CONTACT.general"
                  class="hover:text-white"
                  >help&#64;elevateskills.online</a
                >
              </li>
              <li>
                <a
                  [href]="'mailto:' + CONTACT.business"
                  class="hover:text-white"
                  >sales&#64;elevateskills.online</a
                >
              </li>
            </ul>
            <div class="mt-4 flex items-center gap-3">
              <a
                href="https://linkedin.com/company/elevateskills"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Skills on LinkedIn"
                class="text-slate-300 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.1 3.4 6.1 7.8V24h-5V15.4c0-2.1 0-4.8-2.9-4.8-2.9 0-3.3 2.2-3.3 4.6V24h-5V8z"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1GbZFuQLPr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Skills on Facebook"
                class="text-slate-300 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.89h-2.34v6.99C18.34 21.12 22 17 22 12z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/ElevateSkills.Online/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Skills on Instagram (@ElevateSkills.Online)"
                class="text-slate-300 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm8.75 2a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@ElevateSkills.Online"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Elevate Skills on TikTok (@ElevateSkills.Online)"
                class="text-slate-300 hover:text-white"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M16.6 5.82A4.44 4.44 0 0 1 15.32 2h-3.18v13.16a2.66 2.66 0 1 1-1.9-2.55V9.36a5.84 5.84 0 1 0 4.98 5.76V9.2a7.58 7.58 0 0 0 4.38 1.39V7.4a4.43 4.43 0 0 1-3-1.58z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div
          class="mt-8 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500"
        >
          <p>&copy; {{ year }} Elevate Skills. All rights reserved.</p>
          <div class="flex flex-wrap items-center justify-center sm:justify-end gap-x-4 gap-y-1">
            <a routerLink="/terms" class="hover:text-slate-300">Terms &amp; Conditions</a>
            <span class="hidden sm:inline text-slate-700">·</span>
            <span>Empowering Skills. Elevating Potential.</span>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  readonly CONTACT = CONTACT;
  readonly year = new Date().getFullYear();
}
