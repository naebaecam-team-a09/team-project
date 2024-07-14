import { OrderType } from '@/types/order';
import { create } from 'zustand';

interface TpostIdStore {
  postId: string;
  setPostId: (postId: string) => void;
}
export const usePostIdStore = create<TpostIdStore>((set) => ({
  postId: '',
  setPostId: (postId: string) => set(() => ({ postId }))
}));

interface TcommentIdStore {
  commentId: string;
  setCommentId: (commentId: string) => void;
}
export const useCommentIdStore = create<TcommentIdStore>((set) => ({
  commentId: '',
  setCommentId: (commentId) => set(() => ({ commentId }))
}));

interface TOrderStore {
  order: OrderType;
  setOrder: (order: OrderType) => void;
}

export const useOrderStore = create<TOrderStore>((set) => ({
  order: 'createdAt',
  setOrder: (order) => set(() => ({ order }))
}));
