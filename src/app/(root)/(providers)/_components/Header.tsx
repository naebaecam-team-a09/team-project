import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-bold">
          <Link href="/">
            <Image src="/logo.png" alt="로고" width={100} height={100} />
          </Link>
        </div>
        <div className="flex space-x-4 items-center">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            마이페이지
          </Link>
          <Link href="/">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">로그인</button>
          </Link>
        </div>
      </div>
    </header>
  );
}
