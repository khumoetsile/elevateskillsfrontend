import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export type RegisterInterestIntent = 'login' | 'register' | 'enrol';

export interface RegisterInterestContext {
  intent?: RegisterInterestIntent;
  course?: string;
}

export interface RegisterInterestPayload {
  name: string;
  email: string;
  phone: string;
  friendPhone?: string;
  course?: string;
  selectedCourses: string[];
  otherCourse?: string;
  intent?: RegisterInterestIntent;
  message?: string;
  consent: boolean;
}

@Injectable({ providedIn: 'root' })
export class RegisterInterestService {
  private readonly http = inject(HttpClient);

  readonly isOpen = signal(false);
  readonly context = signal<RegisterInterestContext>({});

  open(ctx: RegisterInterestContext = {}): void {
    this.context.set(ctx);
    this.isOpen.set(true);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  close(): void {
    this.isOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  submit(payload: RegisterInterestPayload): Observable<{ ok: boolean; message?: string }> {
    return this.http.post<{ ok: boolean; message?: string }>(
      environment.api.registerInterest,
      payload
    );
  }
}
