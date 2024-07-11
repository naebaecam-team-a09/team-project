import { createComment, getComment, getComments } from './comments.service';

export const queryKeys = {
  BASE_KEY: ['comments'],
  all: (postId: string) => [...queryKeys.BASE_KEY, postId],
  comment: (commentId: string) => [...queryKeys.BASE_KEY, commentId]
};

export const queryOptions = {
  all: (postId: string) => ({
    queryKey: queryKeys.all(postId),
    queryFn: () => getComments(postId)
  }),
  comment: (commentId: string) => ({
    queryKey: queryKeys.comment(commentId),
    queryFn: () => getComment(commentId)
  }),
  create: () => ({
    mutationFn: (postId: string, contents: string) => createComment(postId, contents),
    onSuccess: () => {
      alert('댓글이 성공적으로 등록되었습니다');
    }
  })
};
