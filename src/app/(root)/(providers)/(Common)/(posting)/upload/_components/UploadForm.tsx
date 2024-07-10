'use client';
import { addPost } from '@/services/posts.services';
import { createClient } from '@/supabase/client';
import { PostType } from '@/types/posts';
import React, { useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

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
    if (!category.includes(value)) setCategory((prev) => [...prev, value]);
    else setCategory((prev) => prev.filter((category) => category !== value));
    console.log(category);
  };

  const supabase = createClient();

  const uploadPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!selectedImage) return;
    const imagePath = await uploadImageToBucket(selectedImage);
    if (!imagePath) return;
    setImageUrl(imagePath);
    const newPost: PostType = {
      user_id: 'a366fd7e-f57b-429b-b34d-a7a272db7518',
      title,
      contents,
      category,
      image_url: imageUrl
    };
    const response = await addPost(newPost);
    const result = await response.json();
    console.log(result);
  };

  const handleSelectImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (!files) throw new Error('Error');
    const uploadedFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(uploadedFile);
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewImage(reader.result);
        setSelectedImage(uploadedFile);
      }
    };
  };

  const uploadImageToBucket = async (file: File) => {
    const { data, error } = await supabase.storage.from('images').upload(`images/${crypto.randomUUID()}.png`, file);
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      const { data: imageData } = await supabase.storage.from('images').getPublicUrl(data.path);
      return imageData.publicUrl;
    } else {
      return '';
    }
  };

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="m-32 mb-6 pb-16 border-b-2 ">
        <h1 className=" text-6xl text-my-color font-bold">포스트 작성</h1>
        <h3 className=" text-3xl text-my-color font-semibold mt-20">상세사진</h3>
      </div>
      <form onSubmit={uploadPost}>
        <div className="flex justify-center">
          <div className="flex justify-center w-3/4 h-96 m-10 bg-gray-100">
            <img src={previewImage} />
            <input type="file" accept="image/*" onChange={handleSelectImage} />
            <button className="flex items-center text-2xl font-semibold cursor-pointer text-my-color">
              이미지 선택
            </button>
          </div>
        </div>
        <div className="flex m-32 mt-1 mb-6 pb-16 border-b-2">
          <h3 className=" text-3xl text-my-color font-semibold mt-20">이 옷에 대해</h3>
        </div>
        <div className="flex justify-center">
          <input type="text" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input
            type="text"
            placeholder="코디에 대해 설명해주세요!"
            className=" text-xl w-3/4 h-96 m-10 p-6 border-2"
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div className="flex m-32 mt-1 mb-6 pb-16 border-b-2">
          <h3 className=" text-3xl text-my-color font-semibold mt-20">카테고리</h3>
        </div>
        <div className="grid grid-cols-6 gap-4">
          {categoryList.map((categoryItem: string) => (
            <button
              key={categoryItem}
              className={`w-1/16 bg-my-color rounded-sm text-white hover:brightness-50 ${category.includes(categoryItem) ? 'text-2xl' : 'text-sm'}`}
              type="button"
              onClick={() => handleClickCategoryButton(categoryItem)}
            >
              {categoryItem}
            </button>
          ))}
        </div>
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default UploadForm;
