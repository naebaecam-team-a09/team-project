'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const PostEditButton = ({ postId }: { postId: string }) => {
  const router = useRouter();
  const handleEdit = () => {
    const isConfirm = window.confirm('작성글을 수정하시겠습니까?');
    if (isConfirm) {
      router.push(`/posts/${postId}/edit`);
    }
  };

  return (
    <div className="mt-4 text-right">
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-md
        px-2 py-1 text-[8px]
        xs:px-2 xs:py-1 xs:text-[10px]
        sm:px-3 sm:py-1.5 sm:text-sm
        md:px-4 md:py-2 md:text-base"
        onClick={handleEdit}
      >
        수정하기
      </button>
    </div>
  );
};

export default PostEditButton;
