import { Tables } from '@/types/supabase';

export const getUser = async () => {
  const response = await fetch('http://localhost:3000/api/auth/users', { method: 'GET' });
  const data = await response.json();
  return data;
};
export const getUserInfo = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/auth/users/${id}`, { method: 'GET' });
  const data = await response.json();
  return data;
};
export type UserDataType = Tables<'users'>;
