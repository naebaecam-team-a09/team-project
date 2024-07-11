import { create } from 'zustand';

interface TpostIdStore {
  postId: string;
  setPostId: (postId: string) => void;
}
export const usePostIdStore = create<TpostIdStore>((set) => ({
  postId: '',
  setPostId: (postId) => set(() => ({ postId }))
}));

interface TcommentIdStore {
  commentId: string;
  setCommentId: (commentId: string) => void;
}
export const useCommentIdStore = create<TcommentIdStore>((set) => ({
  commentId: '',
  setCommentId: (commentId) => set(() => ({ commentId }))
}));
