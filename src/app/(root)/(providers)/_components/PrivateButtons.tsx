'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';

const PrivateButtons = () => {
  const { me } = useAuth();
  return (
    <>
      {me && (
        <>
          <Link href="/posts/write" className="text-gray-100  hover:text-[#E7C891]">
            글작성
          </Link>
          <Link href="/my-page" className="text-gray-100  hover:text-[#E7C891]">
            마이페이지
          </Link>
        </>
      )}
    </>
  );
};

export default PrivateButtons;
