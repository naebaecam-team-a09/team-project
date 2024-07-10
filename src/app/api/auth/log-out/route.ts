import { createClient } from '@/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();
  const response = await supabase.auth.signOut();
  console.log(response);
  return NextResponse.json({});
}
