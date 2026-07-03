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
      <div class="container-xl py-14">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
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
                  Become a Trainer
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
          </div>
        </div>

        <div
          class="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500"
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
