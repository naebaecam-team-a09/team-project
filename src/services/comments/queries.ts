import { createComment, deleteComment, getComment, getComments } from './comments.service';

export const commentsQueryKeys = {
  all: ['comments'],
  comments: (postId: string) => [...commentsQueryKeys.all, postId],
  comment: (commentId: string) => [...commentsQueryKeys.all, commentId]
};

export const queryOptions = {
  comments: (postId: string) => ({
    queryKey: commentsQueryKeys.comments(postId),
    queryFn: () => getComments(postId)
  }),
  comment: (commentId: string) => ({
    queryKey: commentsQueryKeys.comment(commentId),
    queryFn: () => getComment(commentId)
  }),
  create: ({ onNextEvent }: { onNextEvent: () => void }) => ({
    mutationFn: ({ postId, contents }: { postId: string; contents: string }) => createComment({ postId, contents }),
    onSuccess: () => {
      onNextEvent();
    }
  }),
  delete: ({ onNextEvent }: { onNextEvent: () => void }) => ({
    mutationFn: (id: string) => deleteComment(id),
    onSuccess: () => {
      onNextEvent();
    }
  })
};
