'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import Link from 'next/link';

const MyPageButton = () => {
  const { me } = useAuth();
  return (
    <>
      {me && (
        <Link href="/" className="text-gray-700 hover:text-gray-900">
          마이페이지
        </Link>
      )}
    </>
  );
};

export default MyPageButton;
