import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (!isOpen) {
      controls.start({
        x: 0,
        transition: { duration: 0 }
      });
    }
  }, [isOpen, controls]);

  const handleSaveClick = () => {
    alert('저장되었습니다!');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white rounded-lg w-[500px] p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 100, scale: 0.5, opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: 0.5
            }}
          >
            <button
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-red-500 text-white shadow-md flex items-center justify-center"
              onClick={onClose}
            >
              X
            </button>
            <textarea
              className="w-full p-4 border rounded-lg resize-none focus:outline-none"
              placeholder="여기에 글을 적으세요..."
            />
            <div className="mt-4">
              <motion.button
                className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                animate={controls}
                onClick={handleSaveClick}
              >
                저장
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
