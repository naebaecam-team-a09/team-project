import { createClient } from '@/supabase/client';
import { NextRequest, NextResponse } from 'next/server';

// Supabase 클라이언트 생성
const supabase = createClient();

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  console.log('id console ==>', userId);

  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    console.log(data);
    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
