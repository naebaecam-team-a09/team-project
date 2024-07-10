import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

// Supabase 클라이언트 생성
const supabase = createClient();

export async function GET() {
  try {
    const { data, error } = await supabase.from('posts').select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}

export async function POST(request: Request) {
  const newPost = await request.json();
  const response = await supabase.from('posts').insert(newPost);
  return NextResponse.json(response);
}
