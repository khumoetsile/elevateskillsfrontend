import { Category } from '../models/category.model';

export const MOCK_CATEGORIES: Category[] = [
  {
    id: 'business',
    name: 'Business',
    description: 'Leadership, management, and operational excellence.',
    icon: 'briefcase',
    color: 'bg-blue-50 text-blue-700'
  },
  {
    id: 'it-digital',
    name: 'IT & Digital Skills',
    description: 'Practical tech skills for the modern workplace.',
    icon: 'monitor',
    color: 'bg-indigo-50 text-indigo-700'
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Financial literacy, accounting, and analysis.',
    icon: 'chart',
    color: 'bg-emerald-50 text-emerald-700'
  },
  {
    id: 'entrepreneurship',
    name: 'Entrepreneurship',
    description: 'Launch and grow small businesses with confidence.',
    icon: 'rocket',
    color: 'bg-amber-50 text-amber-700'
  },
  {
    id: 'personal-development',
    name: 'Personal Development',
    description: 'Communication, productivity, and career growth.',
    icon: 'sparkles',
    color: 'bg-rose-50 text-rose-700'
  },
  {
    id: 'marketing',
    name: 'Marketing & Sales',
    description: 'Digital marketing, branding, and customer growth.',
    icon: 'megaphone',
    color: 'bg-purple-50 text-purple-700'
  },
  {
    id: 'special-skills',
    name: 'Special Skills',
    description: 'Specialised workplace skills and niche professional competencies.',
    icon: 'star',
    color: 'bg-cyan-50 text-cyan-700'
  }
];
