import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getIsLike, getLikeCount, toggleLike } from './likes.service';

// 후에 쿼리키로 바꾸기

export const useToggleLike = ({
  queryClient,
  postId,
  userId
}: {
  queryClient: QueryClient;
  postId: string;
  userId: string;
}) =>
  useMutation({
    mutationFn: ({ userId, postId, isHeart }: any) => toggleLike({ userId, postId, isHeart }),
    onMutate: async ({ isHeart }) => {
      await queryClient.cancelQueries({ queryKey: ['likes', postId, userId] });
      await queryClient.cancelQueries({ queryKey: ['likes', postId] });

      const prevIsLike = queryClient.getQueryData(['likes', postId, userId]);
      const prevLikes = queryClient.getQueryData(['likes', postId]) as number;

      queryClient.setQueryData(['likes', postId, userId], isHeart);
      queryClient.setQueryData(['likes', postId], isHeart ? prevLikes - 1 : prevLikes + 1);

      return { previousState: prevIsLike };
    },
    onError: (error, variables, context) => {
      queryClient.setQueryData(['likes', postId, userId], context?.previousState);
      queryClient.setQueryData(['likes', postId], context?.previousState);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['likes', postId] });
      queryClient.invalidateQueries({ queryKey: ['likes', postId, userId] });
    }
  });

export const useIsLike = ({ postId, userId }: { postId: string; userId: string }) =>
  useQuery({
    queryKey: ['likes', postId, userId],
    queryFn: () => getIsLike({ postId, userId }),
    enabled: !!userId
  });

export const useLikesCount = ({ userId, postId }: { userId: string; postId: string }) =>
  useQuery({
    queryKey: ['likes', postId],
    queryFn: () => getLikeCount({ postId }),
    enabled: !!postId && !!userId
  });
