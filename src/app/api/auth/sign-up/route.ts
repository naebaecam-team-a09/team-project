import { createClient } from '@/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const inputs = await request.json();

  const supabase = createClient();

  const response = await supabase.auth.signUp(inputs);

  return NextResponse.json(response);
}
