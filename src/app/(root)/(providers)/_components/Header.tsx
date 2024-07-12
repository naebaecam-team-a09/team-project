import Image from 'next/image';
import Link from 'next/link';
import AuthButton from './Button';
import MyPageButton from './MyPageButton';

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image src="/logo.png" alt="로고" width={100} height={100} />
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <MyPageButton />
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
