'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useIsLike, useLikesCount, useToggleLike } from '@/services/likes/useLikes';
import { useQueryClient } from '@tanstack/react-query';
import { getLikeComponentProps } from './utils';

const Heart = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { me }: any = useAuth();
  const userId = me?.id;

  const { data: isHeart, isPending, error } = useIsLike({ postId, userId });

  const { data: likeCount } = useLikesCount({ postId, userId });
  console.log(likeCount);

  const { mutate: toggleLikeMutation } = useToggleLike({ postId, userId, queryClient });

  const options = getLikeComponentProps(isHeart);

  const handleClickHeart = () => {
    toggleLikeMutation({ userId: me?.id, postId, isHeart });
  };

  if (isPending) return <div>loading...</div>;

  return (
    <div className="flex gap-2 items-center">
      <p className="text-2xl font-bold">{likeCount}</p>
      <div className=" cursor-pointer" onClick={handleClickHeart}>
        <img className="hover:scale-125 transition w-12 h-12" src={options.path} alt={options.alt} />
      </div>
    </div>
  );
};

export default Heart;
