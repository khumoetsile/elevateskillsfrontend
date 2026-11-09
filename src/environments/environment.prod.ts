export const environment = {
  production: true,
  lmsPortalUrl: 'https://lms.elevateskills.online',
  api: {
    courses: '/backend/api/talentlms/courses',
    categories: '/backend/api/talentlms/categories',
    config: '/backend/api/talentlms/config',
    registerInterest: '/backend/api/register-interest',
    register: '/backend/api/auth/register',
    authLogin: '/backend/api/auth/login',
    authLogout: '/backend/api/auth/logout',
    authMe: '/backend/api/auth/me',
    authPortalLink: '/backend/api/auth/portal-link',
    authEnrolment: '/backend/api/auth/enrolment',
    contact: '/backend/api/contact',
    checkoutCreate: '/backend/api/checkout/create',
    checkoutLookup: '/backend/api/checkout/lookup-account',
    checkoutOrders: '/backend/api/checkout/orders',
    mockPayConfirm: '/backend/api/payments/mock/confirm',
    adminEnquiries: '/backend/api/admin/enquiries'
  }
};
