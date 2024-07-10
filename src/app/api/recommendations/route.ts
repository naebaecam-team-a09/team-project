import { NextResponse } from 'next/server';
import { createClient } from '@/supabase/client';

const supabase = createClient();

export async function GET() {
  try {
    const { data, error } = await supabase.from('recommendations').select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
  }
}
