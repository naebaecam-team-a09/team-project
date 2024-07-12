'use client';

import Backdrop from '@/components/Modal/BackDrop';
import { useScrollLock } from '@yoojinyoung/usescrolllock';
import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface TInitialValue {
  open: (element: React.ReactElement) => void;
  close: () => void;
  isModalOpen: boolean;
}

const initialValue: TInitialValue = {
  open: () => {},
  close: () => {},
  isModalOpen: false
};
const ModalContext = createContext<TInitialValue>(initialValue);
export const useModal = () => useContext<TInitialValue>(ModalContext);

export function ModalProvider({ children }: PropsWithChildren) {
  const scrolllock = useScrollLock();
  const [modal, setModal] = useState<React.ReactElement | null>(null);
  const value = {
    isModalOpen: !!modal,
    open: (element: React.ReactElement) => {
      setModal(element);
      scrolllock.lock();
    },
    close: () => {
      setModal(null);
      scrolllock.release();
    }
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal && <Backdrop>{modal}</Backdrop>}
    </ModalContext.Provider>
  );
}
