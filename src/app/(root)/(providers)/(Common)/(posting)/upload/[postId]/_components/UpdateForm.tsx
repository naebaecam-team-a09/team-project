'use client';

import { getPost, updatePost } from '@/services/posts.services';
import { createClient } from '@/supabase/client';
import { PostType, UpdatedPostType } from '@/types/posts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLayoutEffect, useState } from 'react';

interface UpdateFormType {
  postId: string;
}

const UpdateForm = ({ postId }: UpdateFormType) => {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

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

  const modifyPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
    } else {
      const imagePath = await uploadImageToBucket(selectedImage);
      if (!imagePath) {
      } else {
        setImageUrl(imagePath);
      }
    }
    console.log(imageUrl);
    const updatedPost: UpdatedPostType = {
      user_id: 'a366fd7e-f57b-429b-b34d-a7a272db7518',
      title,
      contents,
      category,
      image_url: imageUrl
    };
    console.log(updatedPost.image_url);
    const response = await updatePost(postId, updatedPost);
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
    const { data } = await supabase.storage.from('images').upload(`images/${crypto.randomUUID()}.png`, file);
    if (!data) return '';
    const { data: imageData } = supabase.storage.from('images').getPublicUrl(data.path);
    return imageData.publicUrl;
  };

  const {
    data: currentPost,
    isError,
    isPending
  } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => getPost(postId)
  });

  if (isError) return <div>에러</div>;
  if (isPending) return <div>로딩 중...</div>;

  console.log('currentPost => ', currentPost);

  return (
    <>
      <div className="w-3/5 bg-slate-300">
        <h1 className="text-6xl te6D758F">포스트 수정</h1>
      </div>
      <form onSubmit={modifyPost}>
        <img src={previewImage || currentPost.image_url} />
        <input type="file" accept="image/*" onChange={handleSelectImage} />
        <input
          type="text"
          placeholder="title"
          defaultValue={currentPost.title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="contents"
          defaultValue={currentPost.contents}
          onChange={(e) => setContents(e.target.value)}
        />
        <br />
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
        <button type="submit">수정</button>
      </form>
    </>
  );
};

export default UpdateForm;
