/** Public asset paths (served from /public). */
export const BRAND = {
  logoFull: '/images/logo/logo-full.png',
  logoOnDark: '/images/logo/logo-on-dark.png',
  logoMark: '/images/logo/logo-mark.png',
  logoMarkOnDark: '/images/logo/logo-mark-on-dark.png',
  favicon: '/favicon.png?v=8',
  name: 'Elevate Skills',
  tagline: 'Practical Skills. Flexible Learning. Real Growth.',
  heroHome: '/images/hero-home.png',
  heroCourses:
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=70',
  heroAbout:
    'https://images.unsplash.com/photo-1573167101669-476636b96cea?w=1200&auto=format&fit=crop&q=70',
  heroBecomeTrainer: '/images/hero-become-trainer.jpg',
  heroContact:
    'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&auto=format&fit=crop&q=70',
  partners: [
    {
      name: 'TalentCentre',
      image: '/images/partners/talentcentre-transparent.png'
    },
    {
      name: 'EPIGNOSIS',
      image: '/images/partners/epignosis.jpeg'
    }
  ]
} as const;
