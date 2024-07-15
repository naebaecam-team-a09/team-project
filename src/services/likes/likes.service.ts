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
  const { data, error } = await supabase.from('posts').select('likes').eq('id', postId);
  if (error) {
    throw error;
  }
  return data[0].likes;
};

export const toggleLike = async ({ userId, postId, isHeart }: { userId: string; postId: string; isHeart: boolean }) => {
  const supabase = createClient();
  const { data } = await supabase.from('posts').select('likes').eq('id', postId);
  const currentCount = data?.[0].likes;
  if (currentCount === null || currentCount === undefined) return;

  if (isHeart) {
    const { error } = await supabase.from('likes').delete().eq('user_id', userId).eq('post_id', postId);
    await supabase
      .from('posts')
      .update({ likes: currentCount - 1 })
      .eq('id', postId);
    if (error) {
      throw error;
    }

    return false;
  } else {
    const { error } = await supabase.from('likes').upsert([{ user_id: userId, post_id: postId }]);
    await supabase
      .from('posts')
      .update({ likes: currentCount + 1 })
      .eq('id', postId);
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
