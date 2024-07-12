'use client';
import { useState } from 'react';
import { useModal } from '@/contexts/modal.context/modal.context';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({ content, onNextEvent }: { content: string; onNextEvent: () => void }) => {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      modal.close();
    }, 300); // 애니메이션 지속 시간과 일치 시킴
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 350,
              damping: 20,
              duration: 0.3
            }}
            className="custom-stroke-container w-[553px] h-[200px] rounded-[20px] bg-gradient-to-t from-[#4E515A] to-[#2B3041] p-6 shadow-md relative"
          >
            <div className="text-white mb-4 text-center">
              <h2 className="font-semibold" style={{ fontSize: '25px' }}>
                {content}
              </h2>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-between px-6 gap-2">
              <button
                className="bg-white w-[48%] text-black py-2 px-2 rounded-[14px] shadow transform transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gray-200"
                onClick={handleClose}
              >
                <h2 className="font-semibold" style={{ fontSize: '20px' }}>
                  취소
                </h2>
              </button>
              <button
                className="bg-white w-[48%] text-black py-2 px-2 rounded-[14px] shadow transform transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gray-200"
                onClick={() => {
                  modal.close();
                  onNextEvent();
                }}
              >
                <h2 className="font-semibold" style={{ fontSize: '20px' }}>
                  확인
                </h2>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationModal;
