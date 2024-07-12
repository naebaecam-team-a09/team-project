'use client';

import { useAuth } from '@/contexts/auth.context/auth.context';
import { getLike, toggleLike } from '@/services/likes/likes.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Heart = ({ postId }: { postId: string }) => {
  const queryClient = useQueryClient();
  const { me }: any = useAuth();

  const {
    data: isHeart,
    isPending,
    error
  } = useQuery({
    queryKey: ['heart', postId],
    queryFn: () => getLike({ postId, userId: me?.id }),
    enabled: !!me
  });

  const { mutate: toggleLikeMutation } = useMutation({
    mutationFn: ({ userId, postId, isHeart }: any) => toggleLike({ userId, postId, isHeart }),
    onMutate: async (newState) => {
      await queryClient.cancelQueries({ queryKey: ['heart', postId] });
      const previousState = queryClient.getQueryData(['heart', postId]);
      queryClient.setQueryData(['heart', postId], newState);
      return { previousState };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['heart', postId], context?.previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['heart', postId] });
    }
  });

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
    <>
      <div className=" cursor-pointer" onClick={handleClickHeart}>
        <img className="hover:scale-125 transition w-12 h-12" src={options.path} alt={options.alt} />
      </div>
    </>
  );
};

export default Heart;
