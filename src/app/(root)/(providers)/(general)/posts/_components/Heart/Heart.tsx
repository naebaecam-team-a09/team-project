'use client';

import AlertModal from '@/components/Modal/AlertModal';
import { useAuth } from '@/contexts/auth.context/auth.context';
import { useModal } from '@/contexts/modal.context/modal.context';
import { useIsLike, useLikesCount, useToggleLike } from '@/services/likes/useLikes';
import { useQueryClient } from '@tanstack/react-query';
import { getLikeComponentProps } from './utils';

const Heart = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { me }: any = useAuth();
  const { open, close } = useModal();
  const userId = me?.id || '2ba38681-3d44-4844-8ab8-be659bcbba27';

  const { data: isHeart, isPending, error } = useIsLike({ postId, userId });

  const { data: likeCount } = useLikesCount({ postId, userId });

  const { mutate: toggleLikeMutation } = useToggleLike({ postId, userId, queryClient });

  const options = getLikeComponentProps(isHeart);

  const handleClickHeart = () => {
    if (!me) {
      open(<AlertModal content={'로그인 후 이용해주세요.'} onNextEvent={() => close()} />);
      return;
    }
    toggleLikeMutation({ userId: me?.id, postId, isHeart });
  };

  if (isPending) return <div>loading...</div>;

  return (
    <div className="flex gap-2 items-center">
      <p className="text-2xl font-bold text-white">{likeCount}</p>
      <div className=" cursor-pointer" onClick={handleClickHeart}>
        <img className="hover:scale-125 transition w-8 h-8" src={options.path} alt={options.alt} />
      </div>
    </div>
  );
};

export default Heart;
