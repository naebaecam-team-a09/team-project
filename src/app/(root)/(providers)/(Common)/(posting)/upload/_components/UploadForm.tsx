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
    <div className="w-full h-full flex flex-col ">
      <div className="m-32 mb-6 pb-16 border-b-2 ">
        <h1 className=" text-6xl text-my-color font-bold">포스트 작성</h1>
        <h3 className=" text-3xl text-my-color font-semibold mt-20">상세사진</h3>
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center w-3/4 h-96 m-10 bg-gray-100">
          <button className="flex items-center text-2xl font-semibold cursor-pointer text-my-color">이미지 선택</button>
        </div>
      </div>
      <div className="flex m-32 mt-1 mb-6 pb-16 border-b-2">
        <h3 className=" text-3xl text-my-color font-semibold mt-20">이 옷에 대해</h3>
      </div>
      <div className="flex justify-center">
        <input type="text" placeholder="코디에 대해 설명해주세요!" className=" text-xl w-3/4 h-96 m-10 p-6 border-2" />
      </div>
      <div className="flex m-32 mt-1 mb-6 pb-16 border-b-2">
        <h3 className=" text-3xl text-my-color font-semibold mt-20">카테고리</h3>
      </div>
      <div>
        {/* map으로 변경해야함 */}
        <button>카테고리1</button>
        <button>카테고리2</button>
        <button>카테고리3</button>
        <button>카테고리4</button>
        <button>카테고리5</button>
        <button>카테고리6</button>
        <button>카테고리7</button>
        <button>카테고리8</button>
        <button>카테고리9</button>
        <button>카테고리10</button>
        <button>카테고리11</button>
        <button>카테고리12</button>
      </div>
    </div>
  );
};

export default UploadForm;
