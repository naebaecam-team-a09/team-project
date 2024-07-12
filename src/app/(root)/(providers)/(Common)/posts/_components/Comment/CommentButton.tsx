'use client';

import CommentModal from '@/components/Modal/CommentModal';
import { useModal } from '@/contexts/modal.context/modal.context';
import { usePostIdStore } from '@/zustand/store';
import { useEffect } from 'react';

export const CommentButton = ({ postId }: { postId: string }) => {
  const setPostId = usePostIdStore((state) => state.setPostId);
  useEffect(() => {
    setPostId(postId);
  }, [postId]);
  const modal = useModal();

  const handleClickButton = () => {
    modal.open(<CommentModal />);
  };

  return (
    <article className="w-full bg-white p-10 rounded-xl">
      <div className="py-8 w-full flex justify-end items-center">
        <button
          onClick={handleClickButton}
          type="submit"
          className="w-28 h-12 rounded-lg text-white font-bold bg-[#6D758F]"
        >
          댓글 작성
        </button>
      </div>
    </article>
  );
};