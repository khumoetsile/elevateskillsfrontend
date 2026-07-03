import { Course } from '../models/course.model';
import { lmsCourseUrl } from '../config/lms-urls';

export const MOCK_COURSES: Course[] = [
  {
    id: 'leading-high-performance-teams',
    title: 'Leading High-Performance Teams',
    summary:
      'Practical leadership skills to build, motivate, and retain strong teams.',
    description:
      'This course equips managers and emerging leaders with frameworks for building high-performing teams. You will learn how to set clear goals, give effective feedback, run efficient meetings, and develop trust within your team, even in hybrid or remote setups.',
    image:
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop&q=70',
    category: 'business',
    level: 'Intermediate',
    duration: '6 hours',
    delivery: 'Online, self-paced',
    audience: [
      'New and experienced team leaders',
      'Supervisors and line managers',
      'Professionals moving into leadership roles'
    ],
    outcomes: [
      'Set clear team goals and performance expectations',
      'Give structured, constructive feedback',
      'Resolve conflict and improve team trust',
      'Coach team members for growth'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'Popular',
    lmsUrl: lmsCourseUrl('101')
  },
  {
    id: 'digital-marketing-essentials',
    title: 'Digital Marketing Essentials',
    summary:
      'Master the fundamentals of modern digital marketing and online growth.',
    description:
      'Learn the building blocks of digital marketing: SEO, social media, email, content marketing and paid ads. Ideal for marketers, entrepreneurs, and professionals who want to grow an online presence effectively.',
    image:
      'https://images.unsplash.com/photo-1573164574511-73c773193279?w=800&auto=format&fit=crop&q=70',
    category: 'marketing',
    level: 'Beginner',
    duration: '8 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Small business owners',
      'Early-career marketers',
      'Professionals wanting to reach online customers'
    ],
    outcomes: [
      'Design a simple digital marketing plan',
      'Run basic SEO and social media campaigns',
      'Write high-converting marketing copy',
      'Measure digital marketing performance'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'New',
    lmsUrl: lmsCourseUrl('102')
  },
  {
    id: 'financial-literacy-for-professionals',
    title: 'Financial Literacy for Professionals',
    summary:
      'Understand personal and business finance to make smarter decisions.',
    description:
      'Build confidence around budgets, cash flow, financial statements and personal money management. Designed for professionals who want to understand the numbers behind their decisions.',
    image:
      'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=70',
    category: 'finance',
    level: 'Beginner',
    duration: '5 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Early-career professionals',
      'Entrepreneurs managing their own books',
      'Anyone wanting to improve financial decisions'
    ],
    outcomes: [
      'Read and interpret key financial statements',
      'Build a personal or business budget',
      'Understand cash flow and profitability',
      'Make better money decisions'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'Popular',
    lmsUrl: lmsCourseUrl('103')
  },
  {
    id: 'starting-a-small-business',
    title: 'Starting a Small Business in Botswana',
    summary:
      'Everything you need to go from business idea to launch-ready plan.',
    description:
      'A practical, Botswana-focused course for aspiring entrepreneurs. Covers idea validation, business model, basic registration concepts, pricing, simple marketing and early customer acquisition.',
    image:
      'https://images.unsplash.com/photo-1573167101669-476636b96cea?w=800&auto=format&fit=crop&q=70',
    category: 'entrepreneurship',
    level: 'Beginner',
    duration: '7 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Aspiring entrepreneurs',
      'Side-hustlers going full-time',
      'Graduates exploring self-employment'
    ],
    outcomes: [
      'Validate and sharpen a business idea',
      'Design a one-page business model',
      'Price products or services with confidence',
      'Plan first customer acquisition steps'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'Recommended',
    lmsUrl: lmsCourseUrl('104')
  },
  {
    id: 'excel-for-the-workplace',
    title: 'Excel for the Workplace',
    summary: 'From formulas to dashboards — become the Excel go-to at work.',
    description:
      'Level up your Excel skills with a practical, workplace-focused course. Learn formulas, tables, pivot tables, charts and dashboard techniques you can apply immediately.',
    image:
      'https://images.unsplash.com/photo-1573164574397-dd250bc8a598?w=800&auto=format&fit=crop&q=70',
    category: 'it-digital',
    level: 'Intermediate',
    duration: '6 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Office-based professionals',
      'Finance, admin, and operations staff',
      'Anyone who works with spreadsheets'
    ],
    outcomes: [
      'Use powerful Excel formulas effectively',
      'Build clean tables and pivot tables',
      'Create clear, informative dashboards',
      'Save hours on repetitive tasks'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'Popular',
    lmsUrl: lmsCourseUrl('105')
  },
  {
    id: 'cyber-security-awareness',
    title: 'Cyber Security Awareness at Work',
    summary:
      'Protect yourself and your organisation from everyday digital threats.',
    description:
      'A non-technical, employee-friendly course on cyber security. Covers phishing, passwords, safe browsing, data handling and what to do when something feels wrong.',
    image:
      'https://images.unsplash.com/photo-1528901166007-3784c7dd3653?w=800&auto=format&fit=crop&q=70',
    category: 'it-digital',
    level: 'Beginner',
    duration: '3 hours',
    delivery: 'Online, self-paced',
    audience: [
      'All employees',
      'Managers responsible for teams',
      'Organisations running awareness training'
    ],
    outcomes: [
      'Recognise common phishing and scam attempts',
      'Create and manage strong passwords',
      'Handle sensitive data responsibly',
      'Respond to suspected incidents'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'New',
    lmsUrl: lmsCourseUrl('106')
  },
  {
    id: 'customer-service-excellence',
    title: 'Customer Service Excellence',
    summary:
      'Deliver memorable customer experiences that drive loyalty and growth.',
    description:
      'A customer-experience focused course that covers communication, empathy, service recovery and creating strong first impressions across physical and digital channels.',
    image:
      'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=800&auto=format&fit=crop&q=70',
    category: 'business',
    level: 'Beginner',
    duration: '4 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Customer-facing staff',
      'Retail, hospitality, and service teams',
      'Supervisors of service teams'
    ],
    outcomes: [
      'Handle customers with empathy and clarity',
      'Resolve complaints professionally',
      'Create positive first impressions',
      'Build customer loyalty'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: null,
    lmsUrl: lmsCourseUrl('107')
  },
  {
    id: 'effective-communication-at-work',
    title: 'Effective Communication at Work',
    summary:
      'Write, speak and present with confidence and professional impact.',
    description:
      'Improve your day-to-day communication through clearer writing, stronger meetings, better presentations and assertive conversations. Built for the modern workplace.',
    image:
      'https://images.unsplash.com/photo-1573167101669-476636b96cea?w=800&auto=format&fit=crop&q=70',
    category: 'personal-development',
    level: 'Beginner',
    duration: '5 hours',
    delivery: 'Online, self-paced',
    audience: [
      'Professionals at all levels',
      'Team leaders and managers',
      'Graduates entering the workplace'
    ],
    outcomes: [
      'Write concise, professional emails and reports',
      'Run focused and productive meetings',
      'Deliver confident presentations',
      'Handle difficult conversations'
    ],
    trainer: 'Elevate Skills Faculty',
    badge: 'Recommended',
    lmsUrl: lmsCourseUrl('108')
  }
];
