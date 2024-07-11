'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { createComment } from '@/services/comments/comments.service';
import { usePostIdStore } from '@/zustand/store';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import Backdrop from './BackDrop';

function CommentModal() {
  const modal = useModal();
  const postId = usePostIdStore((state) => state.postId);
  const { mutate } = useMutation({
    mutationFn: ({ postId, contents }: { postId: string; contents: string }) => createComment(postId, contents),
    onSuccess: () => {
      alert('댓글이 성공적으로 등록되었습니다');
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
    <Backdrop>
      <article className="w-full bg-white p-10 rounded-xl max-w-[640px]">
        <form className="py-8 w-full flex flex-col justify-between gap-10 items-center" onSubmit={handleSubmit}>
          <textarea
            value={contents}
            onChange={handleChangeTextarea}
            className=" px-4 py-2 w-full h-20 resize-none bg-gray-200"
          />
          <div className="w-full flex justify-between">
            <button
              className="w-28 h-12 rounded-lg text-white font-bold bg-[#6D758F]"
              onClick={() => {
                modal.close();
              }}
            >
              닫기
            </button>
            <button type="submit" className="w-28 h-12 rounded-lg text-white font-bold bg-[#6D758F]">
              댓글 작성
            </button>
          </div>
        </form>
      </article>
    </Backdrop>
  );
}

export default CommentModal;
