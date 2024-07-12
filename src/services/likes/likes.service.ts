import { createClient } from '@/supabase/client';

export const getLike = async ({ userId, postId }: { userId: string; postId: string }) => {
  const supabase = createClient();
  const { error } = await supabase.from('likes').select('*').eq('user_id', userId).eq('post_id', postId).single();
  if (error) {
    return false;
  }
  return true;
};

export const toggleLike = async ({ userId, postId, isHeart }: { userId: string; postId: string; isHeart: boolean }) => {
  const supabase = createClient();

  if (isHeart) {
    const { data, error } = await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);

    if (error) {
      throw error;
    }

    return false;
  } else {
    const { data, error } = await supabase.from('likes').upsert([{ user_id: userId, post_id: postId }]);

    if (error) {
      throw error;
    }

    return true;
  }
};
