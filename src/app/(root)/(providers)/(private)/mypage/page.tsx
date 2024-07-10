'use client';

import { UserDataType, getUser, getUserInfo } from '@/services/users.services';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';

const supabase = createClient();

export default function mypage({ children }: PropsWithChildren) {
  const [userPost, setUserPost] = useState();
  const [userData, setUserData] = useState<UserDataType>();
  const [imageUrl, setImageUrl] = useState();
  const dummyId = 'a366fd7e-f57b-429b-b34d-a7a272db7518';
  const fileInputRef = useRef(null);

  useEffect(() => {
    async function getUserData() {
      const response = await getUser();
      const data = await getUserInfo(dummyId);
      setUserData(data);
      console.log('response console', response);
    }
    getUserData();
  }, []);

  // useEffect(() => {
  //   async function getDefaultImage() {
  //     const defaultImage = supabase.storage.from('avatars').getPublicUrl('default-user-profile.png');
  //     setImageUrl(defaultImage.publicUrl);
  //   }
  //   getDefaultImage();
  // }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const { data, error } = await supabase.storage.from('avatars').upload(`${file.name}`, file);

      if (error) {
        console.error('파일 업로드 에러:', error);
        return;
      }

      const imagePath = supabase.storage.from('avatars').getPublicUrl(`${file.name}`);

      await supabase.from('users').update({ profile_image_path: imagePath }).eq('id', dummyId);

      setImageUrl(imagePath);
    }
  };

  return (
    <div className="w-full h-[500px] ">
      <h1 className="text-2xl ml-12 mt-5 text-gray-500 font-bold ">마이페이지</h1>
      <div className=" profileBox w-full h-[96] m-12 flex items-center border-2 border-gray-300 ">
        <div className="profileImg w-60 h-60-flex flex-col m-5 ml-20 items-center justify-center">
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-52 h-52  shadow-lg rounded-md bg-gray-100">
              <Image src={userData?.profile_image_path} alt="" width={200} height={200} />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              className=" w-24 h-7 p-1 bg-slate-400 rounded-[7px] mt-5 text-xs text-white"
              onClick={handleButtonClick}
            >
              프로필 사진 변경
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
        </div>
        <div className="p-16">
          <p className="text-lg">닉네임: {userData?.username} </p>
          <p>성별: {userData?.gender}</p>
          <button className="w-24 h-7 p-1 bg-slate-50 border-gray-300 border-[2px] rounded-[7px] mt-5 text-xs text-black">
            개인 설정 변경
          </button>
        </div>
      </div>
      <div className="userStyle w-full h-auto">
        <h1 className="text-xl ml-12 my-5 text-gray-400 font-bold ">본인이 올린 코디</h1>
        <div className=" divide-solid divide-gray-200 border-[2px]" />
        <div className="grid grid-cols-3 gap-4">
          {/* {userPost.map((post, index) => (
            <div key={index} className="w-full h-48 overflow-hidden">
              <Image
                src={post.image_url}
                alt={`${index}`}
                width={300}
                height={200}
                className="w-full h-full border-[2px] border-black object-cover "
              />
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
}
