import { HttpInterceptorFn } from '@angular/common/http';

/** Attach cookies to API requests for Elevate Skills session auth. */
export const credentialsInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/api') || req.url.includes('/backend/api') || req.url.includes('/api/')) {
    return next(req.clone({ withCredentials: true }));
  }
  return next(req);
};
