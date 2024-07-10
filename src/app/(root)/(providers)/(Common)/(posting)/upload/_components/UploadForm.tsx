'use client';
import { addPost } from '@/services/posts.services';
import { createClient } from '@/supabase/client';
import { PostType } from '@/types/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const supabase = createClient();
  const queryClient = useQueryClient();

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

  const uploadPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      return;
    }
    const imagePath = await uploadImageToBucket(selectedImage);

    const newPost: PostType = {
      user_id: 'a366fd7e-f57b-429b-b34d-a7a272db7518',
      title,
      contents,
      category,
      image_url: imagePath
    };
    addMutate(newPost);
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
    const { data } = await supabase.storage.from('images').upload(`images/${crypto.randomUUID()}.png`, file);
    if (!data) return '';
    const { data: imageData } = supabase.storage.from('images').getPublicUrl(data.path);
    console.log(imageData.publicUrl);
    return imageData.publicUrl;
  };

  const { mutate: addMutate } = useMutation({
    mutationFn: addPost,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['posts'] })
  });

  return (
    <div className="w-full h-full p-40">
      <h1 className=" p-6 text-6xl text-my-color font-bold border-b-2">게시글 작성</h1>
      {/* 사진부분 */}
      <form onSubmit={uploadPost}>
        <div className="grid grid-cols-2">
          <div className="flex flex-col p-6">
            <div className="border-b-2 p-4 ">
              <h3 className="text-3xl text-my-color font-semibold">상세사진</h3>
            </div>
            <div className=" h-96 m-10 bg-gray-100">
              <img src={previewImage} />
              <input type="file" accept="image/*" onChange={handleSelectImage} />
              <button className=" text-2xl font-semibold cursor-pointer text-my-color">이미지 선택</button>
            </div>
          </div>
          {/* 작성부분 */}
          <div className=" flex flex-col p-6">
            <div className="border-b-2 p-4 ">
              <h3 className="text-3xl text-my-color font-semibold">이 옷에 대해</h3>
            </div>
            <div className="mt-10">
              <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="flex text-lg w-full h-auto p-4 mb-4 border-2"
              />
              <input
                type="text"
                placeholder="코디에 대해 설명해주세요!"
                value={contents}
                onChange={(e) => setContents(e.target.value)}
                className="flex text-lg w-full h-72 p-4  border-2"
              />
            </div>
          </div>
        </div>
        {/* 카테고리 */}
        <div className="flex p-10 border-b-2">
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
