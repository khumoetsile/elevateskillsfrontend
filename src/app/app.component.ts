import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterInterestModalComponent } from './components/register-interest-modal/register-interest-modal.component';
import { QrWelcomeModalComponent } from './components/qr-welcome-modal/qr-welcome-modal.component';

@Component({
  selector: 'es-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    RegisterInterestModalComponent,
    QrWelcomeModalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen flex flex-col bg-brand-50">
      <es-navbar></es-navbar>
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
      <es-footer></es-footer>
      <es-register-interest-modal></es-register-interest-modal>
      <es-qr-welcome-modal></es-qr-welcome-modal>
    </div>
  `
})
export class AppComponent {}
