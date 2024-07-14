'use client';

import AlertModal from '@/components/Modal/AlertModal';
import CommentEditModal from '@/components/Modal/CommentEditModal';
import ConfirmationModal from '@/components/Modal/ConfirmationModal';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useModal } from '@/contexts/modal.context/modal.context';
import { commentsQueryKeys } from '@/services/comments/queries';
import { useDeleteCommentMutation } from '@/services/comments/useComments';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface TComment {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  contents: string;
  users: {
    profile_image_path: string;
    username: string;
  };
}

const Comment = ({ id: commentId, post_id, user_id, contents, users: { profile_image_path, username } }: TComment) => {
  const { open, close } = useModal();
  const router = useRouter();
  const queryClient = useQueryClient();
  const onSuccessDeleteComment = () => {
    queryClient.invalidateQueries({ queryKey: commentsQueryKeys.comments(post_id) });
    open(<AlertModal content="삭제가 완료되었습니다" onNextEvent={() => close()} />);
  };

  const { mutate: deleteCommentMutation } = useDeleteCommentMutation({
    onNextEvent: onSuccessDeleteComment
  });

  const handleClickDeleteButton = () => {
    open(
      <ConfirmationModal content={'댓글을 삭제하시겠습니까?'} onNextEvent={() => deleteCommentMutation(commentId)} />
    );
  };

  const handleClickEditButton = () => {
    open(<CommentEditModal commentId={commentId} />);
  };

  const { me } = useAuth();
  const userId = me?.id;
  const isOwner = userId === user_id;

  return (
    <div className="relative">
      <div className=" bg-[#FCFDFF] z-10 relative shadow-md rounded-xl flex flex-col justify-between px-5 py-10 w-[320px] h-[220px]">
        <p className="text-[#575c6f]">{contents}</p>
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden w-10 h-10">
            <Image src={profile_image_path} alt="" fill style={{ objectFit: 'cover' }} />
          </div>
          <p className="text-lg font-medium text-[#575c6f]">{username}</p>
        </div>
      </div>
      {isOwner && (
        <div className="absolute h-16 flex -top-10 left-0 right-0 w-[320px]">
          <button
            onClick={handleClickEditButton}
            className=" hover:translate-y-1.5 transition-all flex items-start justify-center text-white bg-gray-400 flex-1 px-4 pt-2 rounded-tl-xl"
          >
            수정
          </button>
          <button
            onClick={handleClickDeleteButton}
            className=" hover:translate-y-1.5 transition-all flex items-start justify-center text-white bg-gray-800 flex-1 px-4 pt-2 rounded-tr-xl"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
