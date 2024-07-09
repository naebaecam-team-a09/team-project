import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

// type ParamsType = { postId: string };

export async function GET() {
  // const data = 'test 데이터 입니다';
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('posts').select('*');
  //.eq('id', params.postId)
  // console.log(data[0].id);
  // console.log(data[0].title);

  return NextResponse.json(data);
}
