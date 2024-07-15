import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather-Wear 포스트 수정',
  description: '게시물 수정 페이지'
};

const UpdatePageLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default UpdatePageLayout;
