import { getIsLike, getLikeCount } from './likes.service';

export const likesQueryKeys = {
  all: ['likes'],
  isLike: ({ postId, userId }: { userId: string; postId: string }) => [...likesQueryKeys.all, postId, userId],
  likesCount: ({ postId }: { postId: string }) => [...likesQueryKeys.all, postId]
};

export const queryOptions = {
  isLike: ({ postId, userId }: { userId: string; postId: string }) => ({
    queryKey: likesQueryKeys.isLike({ postId, userId }),
    queryFn: () => getIsLike({ postId, userId }),
    enabled: !!userId
  }),
  likesCount: ({ postId, userId }: { userId: string; postId: string }) => ({
    queryKey: likesQueryKeys.likesCount({ postId }),
    queryFn: () => getLikeCount({ postId }),
    enabled: !!postId && !!userId
  })
};
