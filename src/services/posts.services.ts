// route.ts에 요청을 보내는 함수를 작정해야 함

import { PostType, UpdatedPostType } from '@/types/posts';
export const getPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts', { method: 'GET' });
  const data = await response.json();
};

export const getPost = async (postId: string) => {
  const data = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    headers: {
      'Content-type': 'application/json'
    },
    cache: 'no-store'
  });
  const post = await data.json();
  return post.data[0];
};

export const deletePost = async (postId: string) => {
  const data = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    }
  });
  return data;
};

export const updatePost = async (postId: string, updatedPost: UpdatedPostType) => {
  const data = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    method: 'PATCH',
    body: JSON.stringify(updatedPost),
    headers: {
      'Content-type': 'application/json'
    }
  });
  return data;
};

export const addPost = async (newPost: PostType) => {
  const data = await fetch(`http://localhost:3000/api/posts`, {
    method: 'POST',
    body: JSON.stringify(newPost),
    headers: {
      'Content-type': 'application/json'
    }
  });

  return data;
};
