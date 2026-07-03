import { Injectable } from '@angular/core';

import {
  lmsBaseUrl,
  lmsCourseUrl,
  lmsLoginUrl,
  lmsRegisterUrl
} from '../config/lms-urls';

/** External learning-platform links - no auth is handled in this app. */
@Injectable({ providedIn: 'root' })
export class LmsService {
  get baseUrl(): string {
    return lmsBaseUrl();
  }

  get loginUrl(): string {
    return lmsLoginUrl();
  }

  get registerUrl(): string {
    return lmsRegisterUrl();
  }

  courseUrl(courseId: string): string {
    return lmsCourseUrl(courseId);
  }
}
