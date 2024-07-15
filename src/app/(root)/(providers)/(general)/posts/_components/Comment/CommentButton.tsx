'use client';

import AlertModal from '@/components/Modal/AlertModal';
import CommentCreateModal from '@/components/Modal/CommentCreateModal';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useModal } from '@/contexts/modal.context/modal.context';
import { usePostIdStore } from '@/zustand/store';
import { useEffect } from 'react';

export const CommentButton = ({ postId }: { postId: string }) => {
  const setPostId = usePostIdStore((state) => state.setPostId);
  useEffect(() => {
    setPostId(postId);
  }, [postId]);
  const { open, close } = useModal();

  const { me }: any = useAuth();

  const handleClickButton = () => {
    if (!me) {
      open(<AlertModal content={'로그인 후 이용해주세요.'} onNextEvent={() => close()} />);
      return;
    }
    open(<CommentCreateModal />);
  };

  return (
    <article className="w-full mb-10 rounded-xl">
      <div className="relative py-4 w-full flex justify-end items-center">
        <button
          onClick={handleClickButton}
          type="submit"
          className="relative z-10 w-28 h-12 rounded-lg text-[#132A43] font-bold bg-[#E7C891] -translate-y-3 hover:-translate-y-2 transition-all"
        >
          댓글 작성
        </button>
        <div className="absolute w-28 h-12 rounded-lg bg-[#c5aa7b]"></div>
      </div>
    </article>
  );
};
