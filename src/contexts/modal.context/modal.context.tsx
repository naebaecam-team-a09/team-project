'use client';

// import { useScrollLock } from "@yoojinyoung/usescrolllock";
import { PropsWithChildren, createContext, useContext, useState } from 'react';

// 1. 만들기

// 2. 사용한다

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

// 3. 범위 정해서 값 내려주기

export function ModalProvider({ children }: PropsWithChildren) {
  // const scrolllock = useScrollLock();
  const [modal, setModal] = useState<React.ReactElement | null>(null);
  const value = {
    isModalOpen: !!modal,
    open: (element: React.ReactElement) => {
      setModal(element);
      // scrolllock.lock();
    },
    close: () => {
      setModal(null);
      // scrolllock.release();
    }
  };
  return (
    <ModalContext.Provider value={value}>
      {children}
      {modal}
    </ModalContext.Provider>
  );
}
