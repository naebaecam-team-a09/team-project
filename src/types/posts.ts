export interface PostType {
  user_id: string; //로그인, 로그아웃 기능 생기면 빼줄꺼에용
  image_url?: string;
  category: string[];
  contents: string;
  title: string;
}

export type UpdatedPostType = Partial<PostType>;
