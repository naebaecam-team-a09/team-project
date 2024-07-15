'use client';

import { useModal } from '@/contexts/modal.context/modal.context';
import { useCreateMutation } from '@/services/comments/useComments';
import { usePostIdStore } from '@/zustand/store';
import { useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import AlertModal from './AlertModal';
import { useRouter } from 'next/navigation';

const CommentCreateModal = () => {
  const [contents, setContents] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  const { open, close } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const postId = usePostIdStore((state) => state.postId);
  const onSuccessCreateComment = () => {
    queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    open(
      <AlertModal
        content="댓글이 성공적으로 저장되었습니다"
        onNextEvent={() => {
          close();
        }}
      />
    );
  };
  const { mutate: createCommentMutation } = useCreateMutation({
    onNextEvent: onSuccessCreateComment
  });

  const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContents(e.target.value);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCommentMutation({ postId, contents });
  };

  const handleClickCancelButton = () => {
    setIsClosing(true);
    setTimeout(() => close(), 300); // 애니메이션 시간과 일치시킴
  };

  return (
    <AnimatePresence>
      {!isClosing && (
        <motion.article
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="p-1.5 relative w-[560px] h-[560px] rounded-[36px] bg-white post-modal-shadow opacity-[97%]"
        >
          <div className="px-2.5 post-modal-background rounded-[28px]">
            <div className="flex justify-between w-full items-center py-5">
              <h3 className="ml-4 text-2xl text-[#2d2d2d] font-bold">댓글작성</h3>
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
                저장하기
              </button>
            </form>
          </div>
        </motion.article>
      )}
    </AnimatePresence>
  );
};

export default CommentCreateModal;
