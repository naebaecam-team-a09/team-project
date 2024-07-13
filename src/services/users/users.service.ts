import { Tables } from '@/types/supabase';

export const getUserInfo = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users`, { method: 'GET' });
  const data = await response.json();
  return data;
};
export type UserDataType = Tables<'users'>;
