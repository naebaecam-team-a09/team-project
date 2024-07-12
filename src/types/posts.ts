export interface PostType {
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
