import { NextResponse } from 'next/server';

export function middleware(request: any) {
  const maintenanceMode = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true';

  if (maintenanceMode && request.nextUrl.pathname !== '/maintenance') {
    return NextResponse.redirect(new URL('/maintenance', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};