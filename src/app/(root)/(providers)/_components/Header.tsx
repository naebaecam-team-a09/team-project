'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import AuthButton from './Button';
import PrivateButtons from './PrivateButtons';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [menuOpen]);

  return (
    <>
      <header className={`bg-[#132A43] fixed top-0 left-0 w-full z-50 ${menuOpen ? '' : 'shadow-md'}`}>
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-4">
            <button className="text-gray-100 hover:text-gray-300" onClick={toggleMenu}>
              <Image src="/Menu.png" alt="메뉴" width={24} height={24} />
            </button>
          </div>
          <div className="flex justify-center flex-1">
            <Link href="/">
              <Image src="/logo3.png" alt="로고" width={100} height={100} />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#CBCBCB] fixed top-[4rem] left-0 w-full h-1 z-50"
            ></motion.div>
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '4rem' }}
              exit={{ height: 0 }}
              className="bg-[#132A43] shadow-md fixed top-[4rem] left-0 mt-2 w-full z-50 overflow-hidden"
            >
              <div className="container mx-auto p-4">
                <div className="flex justify-center space-x-4 mt-1.5 items-center ml-6 mr-20 gap-4">
                  <Link className="text-gray-100 hover:text-[#E7C891]" href="/posts/discover">
                    둘러보기
                  </Link>
                  <PrivateButtons />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
