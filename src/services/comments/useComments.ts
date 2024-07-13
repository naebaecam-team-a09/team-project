import { useMutation, useQuery } from '@tanstack/react-query';
import { queryOptions } from './queries';

export function useComments(postId: string) {
  return useQuery(queryOptions.comments(postId));
}

export function useComment(commentId: string) {
  return useQuery(queryOptions.comment(commentId));
}

export const useCreateMutation = ({ onNextEvent }: { onNextEvent: () => void }) => {
  return useMutation(queryOptions.create({ onNextEvent }));
};

export const useDeleteCommentMutation = ({ onNextEvent }: { onNextEvent: () => void }) => {
  return useMutation(queryOptions.delete({ onNextEvent }));
};
