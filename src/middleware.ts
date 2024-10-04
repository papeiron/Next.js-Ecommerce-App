import authConfig from '@/config/auth.config';
import NextAuth from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiCategoriesRoute,
  apiProductsRoute,
  apiSearch,
  apiStripeRoute,
  authRoutes,
  publicPrefixes,
  publicRoutes,
  roleBasedRoutes,
} from '@/routes';
import { UserRole } from '@prisma/client';

const { auth } = NextAuth(authConfig);

export default auth((req): any => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const userRole = req.auth?.user?.role as UserRole;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiCategoriesRoute = nextUrl.pathname.startsWith(apiCategoriesRoute);
  const isApiProductRoute = nextUrl.pathname.startsWith(apiProductsRoute);
  const isApiStripeRoute = nextUrl.pathname.startsWith(apiStripeRoute);
  const isApiSearchRoute = nextUrl.pathname.startsWith(apiSearch);

  apiStripeRoute;
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isPublicPrefix = publicPrefixes.some((prefix) =>
    nextUrl.pathname.startsWith(prefix),
  );
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isRouteAllowedForRole = userRole
    ? roleBasedRoutes[userRole].some((route) => nextUrl.pathname.startsWith(route))
    : null;

  const isRoleBasedRoute = Object.values(roleBasedRoutes).some((roleRoutes) =>
    roleRoutes.some((route) => nextUrl.pathname.startsWith(route)),
  );

  const isRouteExists =
    isApiAuthRoute ||
    isApiCategoriesRoute ||
    isApiStripeRoute ||
    isApiProductRoute ||
    isApiSearchRoute ||
    isPublicRoute ||
    isPublicPrefix ||
    isAuthRoute ||
    isRoleBasedRoute;

  if (!isRouteExists) {
    return null;
  }

  if (
    isApiAuthRoute ||
    isApiProductRoute ||
    isApiCategoriesRoute ||
    isApiStripeRoute ||
    isApiSearchRoute
  ) {
    return null;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  if (isPublicRoute || isPublicPrefix) {
    return null;
  }

  if (!isLoggedIn) {
    return Response.redirect(new URL('/signin', nextUrl));
  }

  // role-based access
  if (isLoggedIn && userRole) {
    if (!isRouteAllowedForRole) {
      return Response.redirect(new URL('/signin', nextUrl));
    }
  }

  return null;
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'], // clerk
};
