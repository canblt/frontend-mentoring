import { NextResponse } from 'next/server';

export default function middleware() {
  console.log('Hi from middleware!');
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
