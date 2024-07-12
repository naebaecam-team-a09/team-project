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
        <button onClick={handleClickLogOut} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          로그아웃
        </button>
      ) : (
        <Link href="/log-in">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">로그인</button>
        </Link>
      )}
    </>
  );
};

export default AuthButton;
