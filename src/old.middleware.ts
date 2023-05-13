// export { default } from "next-auth/middleware";
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    const session = req.cookies.get('session');
    console.log('middleware session!!', session);

    if (
      req.nextUrl.pathname.startsWith('/admin') &&
      req.nextauth.token?.role !== 'admin'
    ) {
      req.nextUrl.pathname = '/';
      return NextResponse.redirect(req.nextUrl);
    }
    // return NextResponse.rewrite(
    //   new URL('/auth/login?message=You Are Not Authorized!', req.url)
    // );
    // if (
    //   req.nextUrl.pathname.startsWith('/auth') &&
    //   // req.nextauth.token
    //   (req.nextauth.token?.role === 'customer' ||
    //     req.nextauth.token?.role === 'admin')
    //   //   req.nextauth.token?.role !== 'user' &&
    //   //   req.nextauth.token?.role !== 'admin'
    //   // )
    //   //   return NextResponse.rewrite(
    //   //     new URL('/auth/login?message=You Are Not Authorized!', req.url)
    // ) {
    //   console.log('LOGIN req.nextauth', req.nextauth);
    //   req.nextUrl.pathname = '/';
    //   return NextResponse.redirect(req.nextUrl);
    // }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  //  matcher: ['/admin/:path*', '/auth/:path*'],
  matcher: ['/admin/:path*'],
};
