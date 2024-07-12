import { createClient } from '@/supabase/client';
import _ from 'lodash';

export const getIsLike = async ({ userId, postId }: { userId: string; postId: string }) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('likes').select('*').eq('user_id', userId).eq('post_id', postId);

  if (error) {
    return false;
  }
  if (_.isEmpty(data)) return false;

  return true;
};

export const getLikeCount = async ({ postId }: { postId: string }) => {
  const supabase = createClient();
  const { count, error } = await supabase.from('likes').select('*', { count: 'exact' }).eq('post_id', postId);
  if (error) {
    throw error;
  }
  return count;
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

export const getAllPostLikeCount = async () => {
  const supabase = createClient();

  const { data, error } = await supabase.from('likes').select('post_id', { count: 'exact' });

  if (error) {
    throw error;
  }

  return data;
};
