import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
 
export default createMiddleware(routing);
 
export const config = {
  // Match only internationalized pathnames
  // matcher: [
  //   '/', 
  //   '/about',
  //   '/contact',
  //   '/cart',
  //   '/blogs',
  //   '/products',
  //   '/products',
  //   '/(kh|en)/:path*'
  // ],
  // matcher: [
  //   '/:path*',
  //   `/:locale(${localeMatcher})/:path*`, // Dynamically include locales
  // ],
  matcher: ['/((?!api|static|_next|.*\\..*).*)']
};