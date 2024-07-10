import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  console.log(user);

  if (!user) return NextResponse.json('', { status: 401 });
  return NextResponse.json(user);
}
