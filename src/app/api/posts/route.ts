// post
import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();

export async function POST(request: Request) {
  const newPost = await request.json();
  const response = await supabase.from('posts').insert(newPost);
  return NextResponse.json(response);
}
