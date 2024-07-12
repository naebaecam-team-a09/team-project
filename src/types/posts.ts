export interface PostType {
  id: string;
  user_id: string;
  image_url?: string;
  category: string[];
  contents: string;
  title: string;
}

export type UpdatedPostType = Partial<PostType>;

export type UpdatePostParamsType = {
  postId: string;
  updatedPost: UpdatedPostType;
};
