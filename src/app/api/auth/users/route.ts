import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

// Supabase 클라이언트 생성

export async function GET() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) return;
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      NextResponse.json(null);
    }

    return NextResponse.json(data);
  } catch (error) {
    NextResponse.json(null);
  }
}
