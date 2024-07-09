// http://localhost:3000/api/posts
// /app/api/posts /route.ts GET

import { NextResponse } from 'next/server';

export const GET = async () => {
  return NextResponse.json({ data: '세영님 바보' });
};
