import { createClient } from '@/supabase/client';
import { Tables } from '@/types/supabase';

export const getUserInfo = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  const userId = user?.id;

  if (!userId) return;
  try {
    const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
export type UserDataType = Tables<'users'>;
