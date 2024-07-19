import { Tables } from '@/types/supabase';

export const getUserInfo = async () => {
  const response = await fetch(`/api/auth/users`, { method: 'GET' });
  const data = await response.json();
  return data;
};
export type UserDataType = Tables<'users'>;

export const getWriterInfo = async (userId: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/users/${userId}`, {
    headers: {
      'Contents-type': 'application/json'
    }
  });
  const data = await response.json();
  return data;
};
