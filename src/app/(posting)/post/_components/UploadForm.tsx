'use client';

import { addPost } from '@/services/posts.services';
import { PostType } from '@/types/posts';
import React, { useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [image_url, setImage_url] = useState('');

  const categoryList = [
    '카테고리1',
    '카테고리2',
    '카테고리3',
    '카테고리4',
    '카테고리5',
    '카테고리6',
    '카테고리7',
    '카테고리8',
    '카테고리9',
    '카테고리10',
    '카테고리11',
    '카테고리12'
  ];

  const handleClickCategoryButton = (value: string) => {
    setCategory((prev) => [...prev, value]);
  };

  const uploadPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
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
      <form onSubmit={uploadPost}>
        <input type="file" />
        <br />
        <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <input type="text" placeholder="contents" value={contents} onChange={(e) => setContents(e.target.value)} />
        <br />
        <div>
          {categoryList.map((category) => (
            <button key={category} onClick={() => handleClickCategoryButton(category)}>
              {category}
            </button>
          ))}
        </div>
        <button type="submit">등록</button>
      </form>
    </>
  );
};

export default UploadForm;
