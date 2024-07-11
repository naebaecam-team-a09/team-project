import { useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export function useComments(postId: string) {
  return useQuery(queryOptions.all(postId));
}

export function useComment(commentId: string) {
  return useQuery(queryOptions.comment(commentId));
}

// export function useCommentMutation() {
//   return useMutation(queryOptions.create());
// }
