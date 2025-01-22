import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { ClerkProvider } from '@clerk/nextjs';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/',  
  '/products',
  '/products/(.*)',
  '/carts',
  '/about-us',
  '/category/(.*)',
  '/api/(.*)'
]);



export default clerkMiddleware(async (auth, request) => {
  const url = new URL(request.url);
  
  // Check if the route is public
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  // Custom logic to ensure `checkOutPage` is accessed only via `cart` page
  if (url.pathname === '/checkOutPage') {
    const referrer = request.headers.get('referer');

    if (!referrer || !referrer.includes('/carts')) {
      // Redirect to cart page if not coming from there
      return Response.redirect(new URL('/carts', request.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};





