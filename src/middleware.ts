import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // console.log('session', session);
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!session || session?.role !== 'admin') {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `callbackUrl=${requestedPage}`;

      return NextResponse.redirect(url);
    }
  }

  if (session) {
    if (req.nextUrl.pathname.startsWith('/auth/recovery')) {
      req.nextUrl.pathname = '/';
      return NextResponse.redirect(req.nextUrl);
    }
    if (req.nextUrl.pathname === '/auth/register') {
      req.nextUrl.pathname = '/';
      return NextResponse.redirect(req.nextUrl);
    }
  }

  if (req.nextUrl.pathname.startsWith('/checkout') && !session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/auth/register';
    url.search = `callbackUrl=${requestedPage}`;

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/register',
    '/auth/recovery',
    '/auth/recoveryPassword',
    '/checkout',
  ],
};
