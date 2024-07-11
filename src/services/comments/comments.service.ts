import { createClient } from '@/supabase/client';

export const fetchComments = async (postId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('comments')
    .select(`*, users(profile_image_path, username)`)
    .order('created_at', { ascending: false })
    .eq('post_id', postId);
  if (error) {
    throw error;
  }
  return data;
};

export const createComment = async (postId: string, contents: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').insert({ post_id: postId, contents }).select();
  if (error) {
    throw error;
  }
  return data;
};
