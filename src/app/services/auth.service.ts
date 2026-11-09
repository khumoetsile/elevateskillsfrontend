import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';

export interface AuthUser {
  id: string;
  email: string;
  login: string;
  first_name: string;
  last_name: string;
  display_name: string;
}

export interface RegisterAccountPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  consent: boolean;
  autoLogin?: boolean;
}

export interface RegisterAccountResponse {
  ok: boolean;
  message?: string;
  code?: string;
  account?: {
    email: string;
    login: string;
    temp_password: string;
    portal_url: string | null;
  };
  user?: AuthUser | null;
  portal_login_url?: string | null;
}

export interface LoginPayload {
  login: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  message?: string;
  user?: AuthUser;
  portal_login_url?: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  readonly user = signal<AuthUser | null>(null);
  readonly ready = signal(false);

  readonly isLoggedIn = () => this.user() != null;

  /** Load session from cookie (call once on app start). */
  bootstrap(): Observable<AuthUser | null> {
    return this.http
      .get<{ ok: boolean; authenticated?: boolean; user: AuthUser | null }>(
        environment.api.authMe,
        { withCredentials: true }
      )
      .pipe(
        map((res) => (res.authenticated && res.user ? res.user : null)),
        tap((user) => {
          this.user.set(user);
          this.ready.set(true);
        }),
        catchError(() => {
          this.user.set(null);
          this.ready.set(true);
          return of(null);
        })
      );
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(environment.api.authLogin, payload, { withCredentials: true })
      .pipe(
        tap((res) => {
          if (res.ok && res.user) this.user.set(res.user);
        })
      );
  }

  logout(): Observable<{ ok: boolean }> {
    return this.http
      .post<{ ok: boolean }>(environment.api.authLogout, {}, { withCredentials: true })
      .pipe(
        tap(() => this.user.set(null)),
        catchError(() => {
          this.user.set(null);
          return of({ ok: true });
        })
      );
  }

  register(payload: RegisterAccountPayload): Observable<RegisterAccountResponse> {
    return this.http
      .post<RegisterAccountResponse>(
        environment.api.register,
        { ...payload, autoLogin: payload.autoLogin !== false },
        { withCredentials: true }
      )
      .pipe(
        tap((res) => {
          if (res.ok && res.user) this.user.set(res.user);
        })
      );
  }

  /** Mint a fresh TalentLMS autologin URL for the current session. */
  getPortalLink(): Observable<{ ok: boolean; portal_url?: string; message?: string }> {
    return this.http.get<{ ok: boolean; portal_url?: string; message?: string }>(
      environment.api.authPortalLink,
      { withCredentials: true }
    );
  }

  getCourseEnrolment(courseId: string): Observable<{
    ok: boolean;
    enrolled: boolean;
    course?: {
      id: string;
      name: string;
      completion_status: string | null;
      completion_percentage: string | null;
    } | null;
    continue_url?: string | null;
    message?: string;
  }> {
    return this.http.get<{
      ok: boolean;
      enrolled: boolean;
      course?: {
        id: string;
        name: string;
        completion_status: string | null;
        completion_percentage: string | null;
      } | null;
      continue_url?: string | null;
      message?: string;
    }>(`${environment.api.authEnrolment}/${encodeURIComponent(courseId)}`, {
      withCredentials: true
    });
  }

  openLearnerPortal(url?: string | null): void {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }
    this.getPortalLink().subscribe({
      next: (res) => {
        window.open(res.portal_url || environment.lmsPortalUrl, '_blank', 'noopener,noreferrer');
      },
      error: () => {
        window.open(environment.lmsPortalUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }
}
