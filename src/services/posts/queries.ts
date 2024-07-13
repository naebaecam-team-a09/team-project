import { getPosts, getPostsWithUserInfo } from './posts.service';

export const postsQueryKeys = {
  all: ['posts'],
  posts: () => [...postsQueryKeys.all, 'all'],
  postsWithUserInfo: () => [...postsQueryKeys.all, 'all', 'users']
};

export const queryOptions = {
  posts: () => ({
    queryKey: postsQueryKeys.posts(),
    queryFn: getPosts
  }),
  postsWithUserInfo: () => ({
    queryKey: postsQueryKeys.postsWithUserInfo(),
    queryFn: getPostsWithUserInfo
  })
};
