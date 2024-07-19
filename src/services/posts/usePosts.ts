import { OrderType } from '@/types/order';
import { QueryClient, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { addPost, getPagenatedPostsWithUserInfo, getPopularPosts } from './posts.service';
import { postsQueryKeys, queryOptions } from './queries';

export const useGetPosts = () => useQuery(queryOptions.posts());

export const useGetPostsWithUserInfo = ({ order }: { order: OrderType }) =>
  useQuery(queryOptions.postsWithUserInfo({ order }));

export const useGetPopularPosts = () =>
  useQuery({
    queryKey: ['posts', 'popular'],
    queryFn: getPopularPosts
  });

export const useAddPost = (queryClient: QueryClient, onNextEvent: () => void) =>
  useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.all });
      onNextEvent();
    }
  });

export const useGetPagenatedPostsWithUserInfo = ({ order }: { order: OrderType }) =>
  useInfiniteQuery({
    queryKey: ['posts', 'paginated', order],
    queryFn: ({ pageParam }) => getPagenatedPostsWithUserInfo({ page: pageParam, order }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1
  });
