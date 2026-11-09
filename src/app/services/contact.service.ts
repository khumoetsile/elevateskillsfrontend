import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export type ContactEnquiryType = 'general' | 'learner' | 'corporate' | 'trainer' | 'demo';

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  type: ContactEnquiryType;
  message: string;
  subject?: string;
  consent?: boolean;
  data?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  submit(payload: ContactPayload): Observable<{ ok: boolean; message?: string }> {
    return this.http.post<{ ok: boolean; message?: string }>(
      environment.api.contact,
      payload
    );
  }
}
