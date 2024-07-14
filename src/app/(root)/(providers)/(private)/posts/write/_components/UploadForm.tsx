'use client';
import AlertModal from '@/components/Modal/AlertModal';
import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { categoryList } from '@/constants/categoryList';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useAddPost } from '@/services/posts/usePosts';
import { useGetUser } from '@/services/users/useUsers';
import { createClient } from '@/supabase/client';
import { UpdatedPostType } from '@/types/posts';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

const UploadForm = () => {
  const router = useRouter();
  const { open } = useModal();

  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [category, setCategory] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string>(
    'https://jkuhktbimkshohrktrhc.supabase.co/storage/v1/object/public/images/images/Default-Image.png'
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const supabase = createClient();
  const queryClient = useQueryClient();

  const handleClickCategoryButton = (value: string) => {
    if (!category.includes(value)) setCategory((prev) => [...prev, value]);
    else setCategory((prev) => prev.filter((category) => category !== value));
  };

  const uploadPost: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    let imagePath = '';
    if (!selectedImage) {
    } else {
      imagePath = await uploadImageToBucket(selectedImage);
    }

    if (!title.trim()) return alert('제목을 입력해주세요.');
    if (!contents.trim()) return alert('코디 설명을 입력해주세요.');
    if (!category.length) return alert('카테고리를 선택해주세요.');

    const newPost: UpdatedPostType = {
      user_id,
      title,
      contents,
      category,
      image_url: imagePath
    };
    addMutate(newPost);
  };

  const handleSelectImage: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { files } = e.target;
    if (files?.length) {
      const uploadedFile = files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadedFile);
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setPreviewImage(reader.result);
          setSelectedImage(uploadedFile);
        }
      };
    } else {
      return;
    }
  };

  const uploadImageToBucket = async (file: File) => {
    const { data } = await supabase.storage.from('images').upload(`images/${crypto.randomUUID()}.png`, file);
    if (!data) return '';
    const { data: imageData } = supabase.storage.from('images').getPublicUrl(data.path);
    return imageData.publicUrl;
  };

  const { data: user_id } = useGetUser();

  const { mutate: addMutate } = useAddPost(queryClient, () => {
    open(<AlertModal content="등록이 완료되었습니다" />);
    router.replace('/posts/discover');
  });

  const ref = useRef<HTMLInputElement>(null);

  const imageSelector = () => {
    if (ref.current) {
      ref.current!.click();
    }
  };

  const handleClickCancelButton = () => {
    open(<ConfirmationModal content={'게시글 작성을 취소하시겠습니까?'} onNextEvent={() => router.back()} />);
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
                <label className="flex w-[450px] h-[600px] m-10 bg-gray-100 text-my-color font-semibold text-x cursor-pointer rounded-2xl overflow-hidden">
                  <input type="file" ref={ref} accept="image/*" onChange={handleSelectImage} className="hidden" />
                  <div className="relative w-full h-full">
                    <Image
                      src={previewImage}
                      alt="선택한 이미지 미리보기"
                      fill
                      style={{ objectFit: 'cover' }}
                      className="rounded-2xl absolute w-full h-full"
                    />
                  </div>
                </label>
                <button
                  type="button"
                  className="w-2/5 h-10 bg-my-color text-white rounded-lg text-lg p-2 hover:brightness-90"
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
                  className="text-lg w-full h-[500px] p-4 border-2 rounded-md"
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
                className={`w-11/12 h-12 bg-gray-100 border-gray-400 border-2 rounded-lg hover:brightness-90 ${category.includes(categoryItem) ? 'text-lg bg-gray-600 text-neutral-50' : 'text-lg'}`}
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
              className="w-1/12 h-10 bg-my-color text-white rounded-lg text-lg m-2  hover:brightness-90"
            >
              등록
            </button>
            <button
              type="button"
              className="w-1/12 h-10 bg-red-600 text-white rounded-lg text-lg m-2  hover:brightness-90"
              onClick={handleClickCancelButton}
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
