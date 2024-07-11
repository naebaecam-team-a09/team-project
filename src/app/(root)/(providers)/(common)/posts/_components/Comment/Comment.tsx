'use client';

import CommentEditModal from '@/components/Modal/CommentEditModal';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useModal } from '@/contexts/modal.context/modal.context';
import { deleteComment } from '@/services/comments/comments.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';

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
  const modal = useModal();
  const queryClient = useQueryClient();
  const { mutate: deleteCommentMutation } = useMutation({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', post_id] });
      alert('삭제가 완료되었습니다!');
    }
  });

  const handleClickDeleteButton = () => {
    deleteCommentMutation(commentId);
  };

  const handleClickEditButton = () => {
    modal.open(<CommentEditModal commentId={commentId} />);
  };

  const { me } = useAuth();
  const userId = me?.id;
  console.log(user_id, userId);
  const isOwner = userId === user_id;
  console.log(isOwner);
  return (
    <div className="relative">
      <div className="bg-white z-10 relative shadow-md rounded-xl flex flex-col justify-between px-5 py-10 w-[320px] h-[220px]">
        <p className="text-[#575c6f]">{contents}</p>
        <div className="flex items-center gap-2">
          <div className="relative rounded-full overflow-hidden">
            <Image src={profile_image_path} alt="" width={40} height={40} />
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
