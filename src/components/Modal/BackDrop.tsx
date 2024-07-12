'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { PropsWithChildren } from 'react';

function Backdrop({ children }: PropsWithChildren) {
  const { close } = useModal();
  return (
    <div className="  z-20 fixed inset-0  flex justify-center items-center">
      {children}

      <div onClick={close} className="-z-10 fixed inset-0 bg-gradient-to-t from-black/50 to-gray-500/50"></div>
    </div>
  );
}

export default Backdrop;
