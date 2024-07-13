import { PostType } from '@/types/posts';
import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { addPost } from './posts.service';
import { postsQueryKeys, queryOptions } from './queries';

export const usePosts = () => useQuery<PostType[]>(queryOptions.posts());

export const usePostsWithUserInfo = () => useQuery(queryOptions.postsWithUserInfo());

export const useAddPost = (queryClient: QueryClient, onNextEvent: () => void) =>
  useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.postsWithUserInfo() });
      onNextEvent();
    }
  });
