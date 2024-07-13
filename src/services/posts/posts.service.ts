import { createClient } from '@/supabase/client';
import { UpdatePostParamsType, UpdatedPostType } from '@/types/posts';
export const getPosts = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, { method: 'GET' });
  const data = await response.json();
  return data;
};

export const getPost = async (postId: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`, {
    headers: {
      'Content-type': 'application/json'
    },
    cache: 'no-store'
  });
  const post = await data.json();

  if (!post.data || !post.data.length) {
    return null;
  }
  return post.data[0];
};

export const deletePost = async (postId: string) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });
  return data;
};

export const updatePost = async (updatePostParams: UpdatePostParamsType) => {
  const { postId, updatedPost } = updatePostParams;
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedPost),
    headers: {
      'Content-type': 'application/json'
    }
  });
  return data;
};

export const addPost = async (newPost: UpdatedPostType) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json'
    }
  });

  return data;
};

export const getPostsWithUserInfo = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users(username, profile_image_path)`)
    .order('created_at', { ascending: false });
  if (error) {
    throw error;
  }
  return data;
};

export const getPostWithUserInfo = async ({ postId }: { postId: string }) => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users(username, profile_image_path)`)
    .eq('id', postId)
    .single();
  if (error) {
    throw error;
  }
  return data;
};

export const getPopularPosts = async () => {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('posts')
    .select(`*, users(username, profile_image_path)`)
    .order('likes', { ascending: false })
    .limit(6);
  if (error) {
    throw error;
  }
  return data;
};
