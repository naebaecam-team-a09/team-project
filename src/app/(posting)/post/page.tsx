// 등록페이지
'use client';
import { addPost } from '@/services/posts.services';
import { PostType } from '@/types/posts';

const PostingPage = () => {
  const uploadPost = async () => {
    const newPost: PostType = {
      user_id: 'a366fd7e-f57b-429b-b34d-a7a272db7518',
      image_url: 'https://blog.kakaocdn.net/dn/bh3xaW/btrd04olbd6/HkQMeUpJsB6D3GcVdXfrc1/img.jpg',
      category: ['가짱 테스트'],
      contents: '최종 프로젝트 가보자고.',
      title: '현욱쓰'
    };
    const response = await addPost(newPost);
    const result = await response.json();
    console.log(result);
  };
  return (
    <>
      <div>등록페이지</div>
      <button onClick={uploadPost}>등록</button>
    </>
  );
};

export default PostingPage;
