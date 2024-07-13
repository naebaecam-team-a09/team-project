import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { addPost, getPopularPosts } from './posts.service';
import { postsQueryKeys, queryOptions } from './queries';

export const useGetPosts = () => useQuery(queryOptions.posts());

export const useGetPostsWithUserInfo = () => useQuery(queryOptions.postsWithUserInfo());

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
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.postsWithUserInfo() });
      onNextEvent();
    }
  });
