export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseBadge = 'Popular' | 'New' | 'Recommended' | null;

export interface CourseUnit {
  id: string;
  name: string;
  type: string;
}

export interface Course {
  id: string;
  title: string;
  summary: string;
  /** Plain-text description for cards/search; detail page may use descriptionHtml. */
  description: string;
  /** Sanitized HTML from TalentLMS when available. */
  descriptionHtml?: string;
  image: string;
  category: string;
  level: CourseLevel;
  duration: string;
  delivery: string;
  audience: string[];
  outcomes: string[];
  units?: CourseUnit[];
  rules?: string[];
  certification?: string;
  certificationDuration?: string;
  trainer?: string;
  badge?: CourseBadge;
  lmsUrl: string;
  /** Raw price string from TalentLMS (e.g. "29.99"); empty when free/unpriced. */
  price: string;
}
