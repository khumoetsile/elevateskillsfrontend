export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type CourseBadge = 'Popular' | 'New' | 'Recommended' | null;

export interface Course {
  id: string;
  title: string;
  summary: string;
  description: string;
  image: string;
  category: string;
  level: CourseLevel;
  duration: string;
  delivery: string;
  audience: string[];
  outcomes: string[];
  trainer?: string;
  badge?: CourseBadge;
  lmsUrl: string;
}
