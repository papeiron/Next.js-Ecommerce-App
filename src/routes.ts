import { UserRole } from '@prisma/client';

type RoleBasedRoutes = {
  [K in UserRole]: string[];
};

/**
 * Public routes that doesnt need auth.
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/new-verification',
  '/all-categories',
  '/products',
  '/cart',
  '/favorites',
];
export const publicPrefixes = ['/c', '/p'];

/**
 * An array of routes that are used for auth.
 * These routes will redirect logged in users to /account
 * @type {string[]}
 */
export const authRoutes = ['/signin', '/signup', '/error', '/reset', '/new-password'];

/**
 * The prefix for appi authentication routes
 * Routes that start with this prefix are used for API auth. purposes
 * @type {string}
 */

export const apiAuthPrefix = '/api/auth';

export const apiProductsRoute = '/api/stores';

export const apiCategoriesRoute = '/api/categories';

export const apiStripeRoute = '/api/create-payment-intent';

export const apiSearch = '/api/s';

export const DEFAULT_LOGIN_REDIRECT = '/account';

export const roleBasedRoutes: RoleBasedRoutes = {
  ADMIN: ['/dashboard', '/account'],
  USER: ['/account'],
  STORE_OWNER: ['/store', '/account'],
};
