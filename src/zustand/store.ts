import { create } from 'zustand';

interface TpostIdStore {
  postId: string;
  setPostId: (postId: string) => void;
}
export const usePostIdStore = create<TpostIdStore>((set) => ({
  postId: '',
  setPostId: (postId) => set(() => ({ postId }))
}));
