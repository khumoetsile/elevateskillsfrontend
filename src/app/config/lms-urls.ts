import { environment } from '../../environments/environment';

export function lmsBaseUrl(): string {
  return environment.lmsPortalUrl.replace(/\/$/, '');
}

export function lmsLoginUrl(): string {
  return `${lmsBaseUrl()}/`;
}

export function lmsRegisterUrl(): string {
  return `${lmsBaseUrl()}/index/signup`;
}

export function lmsCourseUrl(courseId: string): string {
  const id = String(courseId ?? '').trim();
  if (!id) return lmsBaseUrl();
  return `${lmsBaseUrl()}/catalog/info/id:${id}`;
}
