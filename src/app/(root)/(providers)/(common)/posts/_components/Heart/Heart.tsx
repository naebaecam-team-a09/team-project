'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useIsLike, useLikesCount, useToggleLike } from '@/services/likes/useLikes';
import { useQueryClient } from '@tanstack/react-query';
import getHeartCompSource from './_utils/getHeartCompSource';

const Heart = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { me }: any = useAuth();
  const userId = me?.id;

  const { data: likeCount } = useLikesCount({ postId, userId });
  const { data: isHeart, isPending, error } = useIsLike({ postId, userId });
  const { mutate: toggleLikeMutation } = useToggleLike({ postId, queryClient, userId: me?.id });
  const options = getHeartCompSource(isHeart);

  const handleClickHeart = () => {
    toggleLikeMutation({ userId: me?.id, postId, isHeart });
  };

  if (isPending) return <div>loading...</div>;

  return (
    <div className="flex items-center gap-2">
      <p className="text-2xl font-black">{likeCount}</p>
      <div className=" cursor-pointer" onClick={handleClickHeart}>
        <img className="hover:scale-125 transition w-10 h-10" src={options.path} alt={options.alt} />
      </div>
    </div>
  );
};

export default Heart;
