import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Elevate Skills | Empowering Skills. Elevating Potential.'
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./pages/browse-courses/browse-courses.component').then(
        (m) => m.BrowseCoursesComponent
      ),
    title: 'Browse Courses | Elevate Skills'
  },
  {
    path: 'courses/:id',
    loadComponent: () =>
      import('./pages/course-detail/course-detail.component').then(
        (m) => m.CourseDetailComponent
      ),
    title: 'Course Detail | Elevate Skills'
  },
  {
    path: 'checkout/result/:orderId',
    loadComponent: () =>
      import('./pages/payment-result/payment-result.component').then(
        (m) => m.PaymentResultComponent
      ),
    title: 'Order Status | Elevate Skills'
  },
  {
    path: 'checkout/:courseId',
    loadComponent: () =>
      import('./pages/checkout/checkout.component').then(
        (m) => m.CheckoutComponent
      ),
    title: 'Checkout | Elevate Skills'
  },
  {
    path: 'pay/:orderId',
    loadComponent: () =>
      import('./pages/mock-pay/mock-pay.component').then(
        (m) => m.MockPayComponent
      ),
    title: 'Secure Payment | Elevate Skills'
  },
  {
    path: 'for-business',
    loadComponent: () =>
      import('./pages/for-business/for-business.component').then(
        (m) => m.ForBusinessComponent
      ),
    title: 'For Corporates | Elevate Skills'
  },
  {
    path: 'become-a-trainer',
    loadComponent: () =>
      import('./pages/become-trainer/become-trainer.component').then(
        (m) => m.BecomeTrainerComponent
      ),
    title: 'Become a Trainer | Elevate Skills'
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
    title: 'About | Elevate Skills'
  },
  {
    path: 'how-it-works',
    loadComponent: () =>
      import('./pages/how-it-works/how-it-works.component').then(
        (m) => m.HowItWorksComponent
      ),
    title: 'How It Works | Elevate Skills'
  },
  {
    path: 'faqs',
    loadComponent: () =>
      import('./pages/faqs/faqs.component').then((m) => m.FaqsComponent),
    title: 'FAQs | Elevate Skills'
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contact | Elevate Skills'
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    title: 'Terms and Conditions | Elevate Skills'
  },
  { path: '**', redirectTo: '' }
];
