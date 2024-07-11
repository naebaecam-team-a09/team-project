import { createClient } from '@/supabase/client';

export const getLike = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('likes').select('*').eq('user_id', userId).single();
  if (error) {
    throw error;
  }
  console.log(data);
  return data;
};
