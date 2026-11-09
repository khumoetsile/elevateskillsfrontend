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
    title: 'For CPD Trainers | Elevate Skills'
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
    path: 'policies',
    loadComponent: () =>
      import('./pages/policies/policies.component').then((m) => m.PoliciesComponent),
    title: 'Policies & Data Protection | Elevate Skills'
  },
  {
    path: 'policies/records-management',
    loadComponent: () =>
      import('./pages/records-management/records-management.component').then(
        (m) => m.RecordsManagementComponent
      ),
    title: 'Records Management Policy | Elevate Skills'
  },
  {
    path: 'policies/quality-management',
    loadComponent: () =>
      import('./pages/quality-management/quality-management.component').then(
        (m) => m.QualityManagementComponent
      ),
    title: 'Quality Management Policy | Elevate Skills'
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./pages/terms/terms.component').then((m) => m.TermsComponent),
    title: 'Terms and Conditions | Elevate Skills'
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('./pages/privacy/privacy.component').then((m) => m.PrivacyComponent),
    title: 'Privacy Notice | Elevate Skills'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
    title: 'Log in | Elevate Skills'
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
    title: 'Create Account | Elevate Skills'
  },
  {
    path: 'admin/enquiries',
    loadComponent: () =>
      import('./pages/admin-enquiries/admin-enquiries.component').then(
        (m) => m.AdminEnquiriesComponent
      ),
    title: 'Admin Enquiries | Elevate Skills'
  },
  { path: '**', redirectTo: '' }
];
