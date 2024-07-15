import { createClient } from '@/supabase/client';

export const getComments = async (postId: string) => {
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

export const getComment = async (commentId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').select('contents').eq('id', commentId);
  if (error) {
    throw error;
  }
  return data;
};

export const createComment = async ({ postId, contents }: { postId: string; contents: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').insert({ post_id: postId, contents }).select();
  if (error) {
    throw error;
  }
  return data;
};

export const updateComment = async (commentId: string, contents: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').update({ contents }).eq('id', commentId);
  if (error) {
    throw error;
  }
  return data;
};

export const deleteComment = async (commentId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('comments').delete().eq('id', commentId);
  if (error) {
    throw error;
  }
  return data;
};
