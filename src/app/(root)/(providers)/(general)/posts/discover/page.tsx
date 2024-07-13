'use client';

import { usePostsWithUserInfo } from '@/services/posts/usePosts';
import Card from './_components/Card';
import DiscoverHeader from './_components/DiscoverHeader';
import Divider from './_components/Divider';

const DiscoverPage = () => {
  const { data: posts, isPending, error } = usePostsWithUserInfo();

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1100px] mt-[120px] flex flex-col items-center gap-6">
        <DiscoverHeader />
        <Divider />
        <ul className="w-full max-w-[1000px] grid grid-cols-3 gap-6">
          {posts?.map((post) => (
            <li key={post.id}>
              <Card {...post} users={post.users || { username: '', profile_image_path: '' }} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DiscoverPage;
