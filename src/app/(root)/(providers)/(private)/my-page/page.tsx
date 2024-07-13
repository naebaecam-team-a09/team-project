'use client';

import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { useModal } from '@/contexts/modal.context/modal.context';
import { UserDataType, getUserInfo } from '@/services/users/users.service';
import { createClient } from '@/supabase/client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import UserPost from '../_components/UserPostCard';

const supabase = createClient();

export default function MyPage() {
  const [userData, setUserData] = useState<UserDataType>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [showModal, setShowModal] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newGender, setNewGender] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_STORAGE!;

  const { open } = useModal();

  async function getUserData() {
    const data = await getUserInfo();
    setUserData(data);
    setImageUrl(data.profile_image_path + `?timestamp=${new Date().getTime()}`);
  }

  useEffect(() => {
    getUserData();
  }, []);
  console.log(imageUrl);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: any) => {
    const updateProfile = async (file: File, userData: UserDataType) => {
      let uploadError = null;
      let uploadResult = null;

      if (userData?.profile_image_path === `${baseUrl}/public/avatars/userDefaultImg/defaultImage`) {
        const { data, error } = await supabase.storage.from('avatars').upload(`${userData?.id}/profileImg`, file);
        uploadError = error;
        uploadResult = data;
      } else {
        const { data, error } = await supabase.storage.from('avatars').update(`${userData?.id}/profileImg`, file);
        uploadError = error;
        uploadResult = data;
      }

      if (uploadError) {
        console.error('파일 업로드 에러:', uploadError);
        return;
      }

      await supabase
        .from('users')
        .update({ profile_image_path: `${baseUrl}/public/avatars/${userData?.id}/profileImg` })
        .eq('id', userData.id);

      getUserData();
    };

    const file = event.target.files[0];
    if (!userData) {
      return;
    }
    if (file) {
      let confirmMessage = '프로필 사진을 업로드 하시겠습니까?';

      if (userData?.profile_image_path !== `${baseUrl}/public/avatars/userDefaultImg/defaultImage`) {
        confirmMessage = '프로필 사진을 변경하시겠습니까?';
      }
      open(<ConfirmationModal content={confirmMessage} onNextEvent={() => updateProfile(file, userData)} />);
    }
  };
  const handleChangeInfoClick = () => {
    setShowModal(true); // Show the form when the button is clicked
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!userData) {
      return;
    }

    await supabase.from('users').update({ username: newUsername, gender: newGender }).eq('id', userData.id);

    setShowModal(false); // Hide the form after submission
    getUserData(); // Refresh the user data
  };

  return (
    <div className="wrap max-w-[1440px] mx-auto px-4 flex flex-col justify-center">
      <h1 className="text-3xl mt-28  text-gray-500 font-bold ">마이페이지</h1>
      <div className=" divide-solid divide-gray-200 border-t mt-3" />
      <div className="w-full h-[500px] flex flex-col items-center ">
        <div className=" profileBox w-[1000px] h-[96] m-12 flex items-center rounded-md justify-around shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)]">
          <div className="profileImg w-60 h-60-flex flex-col m-5 ml-20 items-center justify-center">
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-52 h-52  shadow-2xl rounded-md bg-gray-100">
                {imageUrl && <Image src={imageUrl} alt="" width={200} height={200} />}
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
          <div className="w-80 h-60 p-5 flex flex-col justify-center">
            <p className="text-2xl m-2 font-bold text-gray-600 underline underline-offset-8">
              닉네임 : {userData?.username}{' '}
            </p>
            <p className="m-3 text-gray-500">성별 : {userData?.gender}</p>
            <button
              className="w-24 h-7 p-1 bg-slate-50 border-gray-300 border-[2px] rounded-[7px] mt-5 text-xs text-black"
              onClick={handleChangeInfoClick}
            >
              개인 설정 변경
            </button>
          </div>
        </div>
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
              <h2 className="text-xl mb-4">개인 설정 변경</h2>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    변경할 닉네임
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="gender">
                    성별 변경
                  </label>
                  <select
                    id="gender"
                    value={newGender}
                    onChange={(e) => setNewGender(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="" disabled>
                      성별을 선택하세요
                    </option>
                    <option value="남자">남자</option>
                    <option value="여자">여자</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="mr-4 px-4 py-2 bg-gray-200 text-black rounded"
                    onClick={() => setShowModal(false)}
                  >
                    취소
                  </button>
                  <button type="submit" className="px-4 py-2 bg-gray-400 text-white rounded">
                    변경
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        <div className="userStyle w-full flex flex-col justify-center content-center">
          <div>{<UserPost></UserPost>}</div>
        </div>
      </div>
    </div>
  );
}
