'use client';

import CommentCreateModal from '@/components/Modal/CommentCreateModal';
import { useModal } from '@/contexts/modal.context/modal.context';
import { usePostIdStore } from '@/zustand/store';
import { useEffect } from 'react';

export const CommentButton = ({ postId }: { postId: string }) => {
  const setPostId = usePostIdStore((state) => state.setPostId);
  useEffect(() => {
    setPostId(postId);
  }, [postId]);
  const { open } = useModal();

  const handleClickButton = () => {
    open(<CommentCreateModal />);
  };

  return (
    <article className="w-full bg-white mb-10 rounded-xl">
      <div className="relative py-4 w-full flex justify-end items-center">
        <button
          onClick={handleClickButton}
          type="submit"
          className="relative z-10 w-28 h-12 rounded-lg text-white font-bold bg-[#6D758F] -translate-y-3 hover:-translate-y-2 transition-all"
        >
          댓글 작성
        </button>
        <div className="absolute w-28 h-12 rounded-lg bg-[#575e73]"></div>
      </div>
    </article>
  );
};
