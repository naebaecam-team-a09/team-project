'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';

const AuthButton = () => {
  const { me } = useAuth();
  const { logOut } = useAuth();
  const handleClickLogOut = async () => {
    logOut();
  };

  return (
    <>
      {me ? (
        <button
          onClick={handleClickLogOut}
          className="bg-[#9F8264] text-white px-4 py-2 rounded-[3px] shadow-md hover:bg-[#9F8264]/90"
        >
          로그아웃
        </button>
      ) : (
        <Link href="/log-in">
          <button className="bg-[#9F8264] text-white px-4 py-2 rounded-[3px] shadow-md hover:bg-[#9F8264]/90">
            로그인
          </button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
