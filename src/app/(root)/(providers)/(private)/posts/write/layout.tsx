import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Weather-Wear 포스트 작성',
  description: '게시물 등록 페이지'
};

const UploadPageLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return <>{children}</>;
};

export default UploadPageLayout;
