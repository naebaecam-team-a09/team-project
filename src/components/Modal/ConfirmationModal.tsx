'use client';
import React from 'react';
import { useModal } from '@/contexts/modal.context/modal.context';

const ConfirmationModal = () => {
  const modal = useModal();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="custom-stroke-container w-[553px] h-[200px] rounded-[20px] bg-gradient-to-t from-[#4E515A] to-[#2B3041] p-6 shadow-md relative">
        <div className="text-white mb-4 text-center">
          <h2 className="font-semibold" style={{ fontSize: '25px' }}>
            이것은 확인 모달입니다.이것은 확인 모달입니다.
          </h2>
        </div>
        <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 gap-2">
          <button
            className="bg-white w-[48%] text-black py-2 px-2 rounded-[14px] shadow"
            onClick={() => {
              modal.close();
            }}
          >
            <h2 className="font-semibold" style={{ fontSize: '20px' }}>
              취소
            </h2>
          </button>
          <button
            className="bg-white w-[48%] text-black py-2 px-2 rounded-[14px] shadow"
            onClick={() => {
              modal.close();
            }}
          >
            <h2 className="font-semibold" style={{ fontSize: '20px' }}>
              확인
            </h2>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
