/** External learner platform URL. */
export const environment = {
  production: false,
  lmsPortalUrl: 'https://elevateskillsadmin.talentlms.com',
  api: {
    courses: '/api/talentlms/courses',
    categories: '/api/talentlms/categories',
    config: '/api/talentlms/config',
    registerInterest: '/api/register-interest',
    contact: '/api/contact',
    checkoutCreate: '/api/checkout/create',
    checkoutOrders: '/api/checkout/orders',
    mockPayConfirm: '/api/payments/mock/confirm'
  }
};
