// get, update(patch), delete

import { createClient } from '@/supabase/client';
import { NextResponse } from 'next/server';

const supabase = createClient();
interface ParamsType {
  params: { postId: string };
}

export async function GET(request: Request, { params }: ParamsType) {
  const { postId } = params;
  const response = await supabase.from('posts').select('*').eq('id', postId);
  return NextResponse.json(response);
}

export async function DELETE(request: Request, { params }: ParamsType) {
  const { postId } = params;
  const response = await supabase.from('posts').delete().eq('id', postId);
  return NextResponse.json(response);
}

export async function PATCH(request: Request, { params }: ParamsType) {
  const { postId } = params;
  const updatedPost = await request.json();
  const response = await supabase.from('posts').update(updatedPost).eq('id', postId);
  return NextResponse.json(response);
}
