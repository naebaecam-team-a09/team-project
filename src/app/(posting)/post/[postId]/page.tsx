'use client';

import { deletePost, getPost, updatePost } from '@/services/posts.service';
import { useEffect } from 'react';

const UpdatePage = () => {
  useEffect(() => {
    const loadPost = async () => {
      const data = await getPost('24e4def1-8b44-41c7-8fbe-2bf9e094c00a');
      console.log(data);
    };
    loadPost();
  }, []);

  const handleUpdatePost = async () => {
    const updatedPost = {
      user_id: 'a366fd7e-f57b-429b-b34d-a7a272db7518',
      contents: '오늘은 일찍 잘 수 있나요?',
      title: '가현이 소원'
    };
    await updatePost('24e4def1-8b44-41c7-8fbe-2bf9e094c00a', updatedPost);
  };

  const handleDeletePost = async () => {
    await deletePost('e9ca4749-1aed-4182-995e-95af92b5efbd');
  };
  return (
    <>
      <div>수정페이지</div>
      <button onClick={handleUpdatePost}>수정</button>
      <button onClick={handleDeletePost}>삭제</button>
    </>
  );
};

export default UpdatePage;
