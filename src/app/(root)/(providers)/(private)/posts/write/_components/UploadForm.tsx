'use client';
import { addPost } from '@/services/posts.service';
import { createClient } from '@/supabase/client';
import { PostType } from '@/types/posts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useRef, useState } from 'react';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const supabase = createClient();
  const queryClient = useQueryClient();

  const categoryList = [
    '패딩',
    '두꺼운 코트',
    '누빔옷',
    '목도리',
    '울코트',
    '히트텍',
    '가죽 옷',
    '기모바지',
    '트렌치 코트',
    '야상',
    '점퍼',
    '스타킹'
  ];

  const handleClickCategoryButton = (value: string) => {
    if (!category.includes(value)) setCategory((prev) => [...prev, value]);
    else setCategory((prev) => prev.filter((category) => category !== value));
    console.log(category);
  };

  const uploadPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let imagePath = '';
    if (!selectedImage) {
    } else {
      imagePath = await uploadImageToBucket(selectedImage);
    }

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

  const ref = useRef<HTMLInputElement>(null);

  const imageSelector = () => {
    if (ref.current) {
      ref.current!.click();
    }
  };

  return (
    <div className="w-full flex justify-evenly items-center">
      <div className="max-w-[1440px] p-20">
        <h1 className="p-6 text-6xl text-my-color font-bold border-b-2">게시글 작성</h1>
        <form onSubmit={uploadPost} className="mx-auto">
          <div className="grid grid-cols-2">
            <div className="flex flex-col p-6 mr-5">
              <div className="border-b-2 p-4 ">
                <h3 className="text-3xl text-my-color font-semibold mt-6">상세사진</h3>
              </div>
              <div className="flex flex-col items-center">
                <label className="flex w-full h-[500px] m-10 bg-gray-100 text-my-color font-semibold text-x cursor-pointer">
                  <input type="file" ref={ref} accept="image/*" onChange={handleSelectImage} className="hidden" />
                  <img src={previewImage} className="w-full h-[500px]" />
                </label>
                <button
                  type="button"
                  className="w-2/5 h-full bg-my-color text-white rounded-lg text-md p-2 hover:brightness-90"
                  onClick={imageSelector}
                >
                  {selectedImage ? '이미지 수정' : '이미지 등록'}
                </button>
              </div>
            </div>
            <div className=" flex flex-col p-6 ml-5">
              <div className="border-b-2 p-4 ">
                <h3 className="text-3xl text-my-color font-semibold mt-6">이 옷에 대해</h3>
              </div>
              <div className="mt-10">
                <input
                  type="text"
                  placeholder="제목"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg w-full h-auto p-4 mb-8 border-2 rounded-md"
                />
                <textarea
                  placeholder="코디에 대해 설명해주세요!"
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                  className="text-lg w-full h-[410px] p-4 border-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex p-6 border-b-2">
            <h3 className="text-3xl text-my-color font-semibold mt-6">카테고리</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 place-items-center mt-10">
            {categoryList.map((categoryItem: string) => (
              <button
                key={categoryItem}
                className={`w-11/12 h-16 bg-gray-100 border-gray-400 border-2 rounded-lg text-my-color hover:brightness-90 ${category.includes(categoryItem) ? 'text-lg bg-gray-500 text-neutral-50' : 'text-lg'}`}
                type="button"
                onClick={() => handleClickCategoryButton(categoryItem)}
              >
                {categoryItem}
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-16">
            <button
              type="submit"
              className="w-1/12 h-16 bg-my-color text-white rounded-lg text-xl m-2  hover:brightness-90"
            >
              등록
            </button>
            <button
              type="submit"
              className="w-1/12 h-16 bg-red-500 text-white rounded-lg text-xl m-2  hover:brightness-90"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;