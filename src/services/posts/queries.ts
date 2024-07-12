import { getPosts, getPostsWithUserInfo } from './posts.service';

export const queryKeys = {
  BASE_QUERY_KEY: 'posts',
  all: () => [queryKeys.BASE_QUERY_KEY, 'all'],
  allWithUserInfo: () => [queryKeys.BASE_QUERY_KEY, 'all', 'users']
};

export const queryOptions = {
  all: () => ({
    queryKey: queryKeys.all(),
    queryFn: getPosts
  }),
  allWithUserInfo: () => ({
    queryKey: queryKeys.allWithUserInfo(),
    queryFn: getPostsWithUserInfo
  })
};
