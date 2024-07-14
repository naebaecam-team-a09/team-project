'use client';

import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { useModal } from '@/contexts/modal.context/modal.context';
import { deletePost } from '@/services/posts/posts.service';
import { useRouter } from 'next/navigation';
import React from 'react';

const PostDeleteButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const { open, close } = useModal();
  const handleDelete = async () => {
    open(
      <ConfirmationModal
        content={'게시물을 삭제하시겠습니까?'}
        onNextEvent={async () => {
          await deletePost(postId);
          router.replace(`/`);
        }}
      />
    );
  };

  return (
    <div className="mt-4 text-right">
      <button
        className="bg-red-500 hover:bg-red-600 text-white rounded-md
        px-2 py-1 text-[8px]
        xs:px-2 xs:py-1 xs:text-[10px]
        sm:px-3 sm:py-1.5 sm:text-sm
        md:px-4 md:py-2 md:text-base"
        onClick={handleDelete}
      >
        삭제하기
      </button>
    </div>
  );
};

export default PostDeleteButton;
