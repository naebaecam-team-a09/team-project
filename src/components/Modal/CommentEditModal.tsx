'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { updateComment } from '@/services/comments/comments.service';
import { useComment } from '@/services/comments/useComments';
import { usePostIdStore } from '@/zustand/store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import AlertModal from './AlertModal';

const CommentEditModal = ({ commentId }: { commentId: string }) => {
  const [contents, setContents] = useState<string>('');
  const { open, close, isModalOpen } = useModal();
  const queryClient = useQueryClient();
  const postId = usePostIdStore((state) => state.postId);
  const { mutate } = useMutation({
    mutationFn: ({ commentId, contents }: { commentId: string; contents: string }) =>
      updateComment(commentId, contents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      open(<AlertModal content="댓글이 성공적으로 수정되었습니다" />);
    }
  });

  const { data: comment, error, isPending } = useComment(commentId);

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ commentId, contents });
  };

  const handleClickCancelButton = () => {
    close();
  };

  useEffect(() => {
    if (isPending || !comment) return;
    setContents(comment?.[0].contents);
  }, [isPending]);

  if (isPending) return null;

  return (
    <article className="p-1.5 relative w-[560px] h-[560px] rounded-[36px] bg-white post-modal-shadow opacity-[97%]">
      <div className="px-2.5 post-modal-background rounded-[28px]">
        <div className="flex justify-between w-full items-center py-5">
          <h3 className="ml-4 text-2xl text-[#2d2d2d] font-bold">댓글수정</h3>
          <button
            onClick={handleClickCancelButton}
            className=" text-2xl text-white w-11 h-11 bg-[#6D758F] rounded-full"
          >
            X
          </button>
        </div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <textarea
            placeholder="댓글을 입력해주세요"
            className="p-4 resize-none w-full h-[340px] rounded-lg bg-white brightness-110"
            value={contents}
            onChange={handleChangeTextarea}
          />
          <div className="w-full h-1.5 bg-[#6D758F] rounded-xl"></div>
          <button
            className="text-xl text-white font-bold h-14 w-full flex justify-center items-center rounded-xl bg-[#656F8F]"
            type="submit"
          >
            수정하기
          </button>
        </form>
      </div>
    </article>
  );
};

export default CommentEditModal;
