'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { createComment } from '@/services/comments/comments.service';
import { usePostIdStore } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState } from 'react';

const Modal = () => {
  const { close, isModalOpen: isOpen } = useModal();
  const controls = useAnimation();

  useEffect(() => {
    if (!isOpen) {
      controls.start({
        x: 0,
        transition: { duration: 0 }
      });
    }
  }, [isOpen, controls]);

  const queryClient = useQueryClient();
  const postId = usePostIdStore((state) => state.postId);
  const { mutate } = useMutation({
    mutationFn: ({ postId, contents }: { postId: string; contents: string }) => createComment(postId, contents),
    onSuccess: () => {
      alert('댓글이 성공적으로 등록되었습니다');
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      close();
    }
  });

  const [contents, setContents] = useState<string>('');

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ postId, contents });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={close}
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
              onClick={close}
            >
              X
            </button>
            <form onSubmit={handleSubmit}>
              <textarea
                value={contents}
                onChange={handleChangeTextarea}
                className="w-full p-4 border rounded-lg resize-none focus:outline-none"
                placeholder="여기에 글을 적으세요..."
              />
              <div className="mt-4">
                <motion.button
                  className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700"
                  animate={controls}
                  type="submit"
                >
                  저장
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
