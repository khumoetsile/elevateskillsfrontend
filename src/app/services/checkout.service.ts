import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

export interface CheckoutPayload {
  courseId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  consent: boolean;
  accountMode?: 'new' | 'existing';
  /** Dev fallback only — used when the backend cannot verify the course with TalentLMS. */
  courseName?: string;
  coursePrice?: string;
}

export interface AccountLookupResponse {
  ok: boolean;
  exists?: boolean;
  message?: string;
  account?: {
    email: string;
    first_name: string;
    last_name: string;
    login: string | null;
  };
}

export interface CheckoutCreateResponse {
  ok: boolean;
  order_id: string;
  order_number: string;
  token?: string;
  payment_url: string;
  amount: number;
  currency: string;
  course_name: string;
  message?: string;
  code?: string;
}

export interface OrderView {
  id: string;
  order_number: string;
  status:
    | 'pending_payment'
    | 'paid'
    | 'enrolling'
    | 'completed'
    | 'enrolment_failed'
    | 'payment_failed'
    | 'cancelled';
  course: {
    id: string;
    name: string;
    amount: number;
    currency: string;
    price_display: string;
  };
  buyer: { first_name: string; last_name: string; email: string };
  payment: { status: string; paid_at: string | null; failure_reason: string | null };
  enrolment: { status: string; user_created: boolean; enrolled_at: string | null };
  lms_access: {
    portal_url: string;
    login: string | null;
    temp_password: string | null;
  } | null;
  created_at: string;
}

export interface OrderResponse {
  ok: boolean;
  order: OrderView;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly http = inject(HttpClient);

  lookupAccount(email: string): Observable<AccountLookupResponse> {
    return this.http.post<AccountLookupResponse>(environment.api.checkoutLookup, { email });
  }

  createOrder(payload: CheckoutPayload): Observable<CheckoutCreateResponse> {
    return this.http.post<CheckoutCreateResponse>(environment.api.checkoutCreate, payload);
  }

  getOrder(orderId: string, token: string): Observable<OrderResponse> {
    return this.http.get<OrderResponse>(
      `${environment.api.checkoutOrders}/${encodeURIComponent(orderId)}`,
      { params: { token } }
    );
  }

  verifyDpoPayment(orderId: string, token: string): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(
      `${environment.api.checkoutOrders}/${encodeURIComponent(orderId)}/verify-payment`,
      { token }
    );
  }

  confirmMockPayment(
    orderId: string,
    token: string,
    outcome: 'success' | 'fail'
  ): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(environment.api.mockPayConfirm, {
      order_id: orderId,
      token,
      outcome
    });
  }
}
