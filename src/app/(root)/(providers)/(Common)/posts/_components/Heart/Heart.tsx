'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { useIsLike, useLikesCount, useToggleLike } from '@/services/likes/useLikes';
import { useQueryClient } from '@tanstack/react-query';

const Heart = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { me }: any = useAuth();
  const userId = me?.id;

  const { data: isHeart, isPending, error } = useIsLike({ postId, userId });

  const { data: likeCount } = useLikesCount({ postId, userId });

  const { mutate: toggleLikeMutation } = useToggleLike({ postId, userId, queryClient });

  const options = !!isHeart
    ? {
        path: '/heart/icon-heart-filled.png',
        alt: 'filled heart'
      }
    : {
        path: '/heart/icon-heart-empty.png',
        alt: 'empty heart'
      };

  const handleClickHeart = () => {
    toggleLikeMutation({ userId: me?.id, postId, isHeart });
  };

  if (isPending) return <div>loading...</div>;

  return (
    <div>
      <p>{likeCount}</p>
      <div className=" cursor-pointer" onClick={handleClickHeart}>
        <img className="hover:scale-125 transition w-12 h-12" src={options.path} alt={options.alt} />
      </div>
    </div>
  );
};

export default Heart;
