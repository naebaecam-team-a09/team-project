import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

// type ParamsType = { postId: string };

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  // const data = 'test 데이터 입니다';

  // console.log('params=>', params.postId);
  const supabaseClient = createClient();
  const { data, error } = await supabaseClient.from('posts').select('*').eq('id', params.postId);
  //.eq('id', params.postId)
  // console.log(data);
  // console.log(data[0].title);

  return NextResponse.json(data);
}
