'use client';
import { useModal } from '@/contexts/modal.context/modal.context';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const AlertModal = ({ content }: { content: string }) => {
  const modal = useModal();
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      modal.close();
    }, 300);
  };

  return (
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
        >
          <div className="custom-stroke-container w-[553px] h-[200px] rounded-[20px] bg-gradient-to-t from-[#4E515A] to-[#2B3041] p-6 shadow-md relative">
            <div className="text-white mb-4 text-center">
              <h2 className="font-semibold" style={{ fontSize: '25px' }}>
                {content}
              </h2>
            </div>
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
              <button
                className="bg-white w-[90%] text-black py-2 px-2 rounded-[14px] shadow transform transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gray-200"
                onClick={handleClose}
              >
                닫기
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AlertModal;
