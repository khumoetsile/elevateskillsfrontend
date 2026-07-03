import { Testimonial } from '../models/testimonial.model';

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Kagiso M.',
    role: 'Operations Manager, Gaborone',
    quote:
      'Elevate Skills gave our team practical, relevant training that we could apply the next day. The online format made it easy to fit learning around work.',
    avatarInitials: 'KM'
  },
  {
    id: 't2',
    name: 'Refilwe D.',
    role: 'Entrepreneur, Francistown',
    quote:
      'The entrepreneurship course helped me go from an idea to a real business plan. The lessons are clear and focused on Botswana realities.',
    avatarInitials: 'RD'
  },
  {
    id: 't3',
    name: 'Thato K.',
    role: 'HR Lead, Private Sector',
    quote:
      'Rolling out Elevate Skills across our staff was smooth. Reporting and progress tracking via the LMS gave us complete visibility.',
    avatarInitials: 'TK'
  }
];
