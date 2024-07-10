import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ result: '안녕하세요' });
}
