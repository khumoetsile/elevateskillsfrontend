/** External learner platform URL. */
export const environment = {
  production: false,
  lmsPortalUrl: 'https://lms.elevateskills.online',
  api: {
    courses: '/api/talentlms/courses',
    categories: '/api/talentlms/categories',
    config: '/api/talentlms/config',
    registerInterest: '/api/register-interest',
    register: '/api/auth/register',
    authLogin: '/api/auth/login',
    authLogout: '/api/auth/logout',
    authMe: '/api/auth/me',
    authPortalLink: '/api/auth/portal-link',
    authEnrolment: '/api/auth/enrolment',
    contact: '/api/contact',
    checkoutCreate: '/api/checkout/create',
    checkoutLookup: '/api/checkout/lookup-account',
    checkoutOrders: '/api/checkout/orders',
    mockPayConfirm: '/api/payments/mock/confirm',
    adminEnquiries: '/api/admin/enquiries'
  }
};
