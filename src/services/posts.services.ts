// route.ts에 요청을 보내는 함수를 작정해야 함
export interface PostType {
  user_id: string; //로그인, 로그아웃 기능 생기면 빼줄꺼에용
  image_url: string;
  category: string[];
  contents: string;
  title: string;
}

export interface UpdatedPostType {
  user_id: string; //로그인, 로그아웃 기능 생기면 빼줄꺼에용
  image_url?: string; //? -> 바꿀수도있고 안바꿀수도있고
  category?: string[];
  contents?: string;
  title?: string;
}

export const getPost = async (postId: string) => {
  const data = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    headers: {
      'Content-type': 'application/json'
    }
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
