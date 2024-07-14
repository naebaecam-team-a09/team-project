import { OrderType } from '@/types/order';
import { getPosts, getPostsWithUserInfo } from './posts.service';

export const postsQueryKeys = {
  all: ['posts'],
  posts: () => [...postsQueryKeys.all, 'all'],
  postsWithUserInfo: ({ order }: { order: OrderType }) => [...postsQueryKeys.all, 'all', order]
};

export const queryOptions = {
  posts: () => ({
    queryKey: postsQueryKeys.posts(),
    queryFn: getPosts
  }),
  postsWithUserInfo: ({ order }: { order: OrderType }) => ({
    queryKey: postsQueryKeys.postsWithUserInfo({ order }),
    queryFn: () => getPostsWithUserInfo({ order })
  })
};
