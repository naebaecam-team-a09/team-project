import { useGetPostsWithUserInfo } from '@/services/posts/usePosts';
import Card from '../Card';

const DiscoverPosts = () => {
  const { data: posts, isPending, error } = useGetPostsWithUserInfo();

  if (isPending) return <div>Loading...</div>;

  return (
    <ul className="w-full max-w-[1000px] grid grid-cols-3 gap-6">
      {posts?.map((post) => (
        <li key={post.id}>
          <Card {...post} users={post.users || { username: '', profile_image_path: '' }} />
        </li>
      ))}
    </ul>
  );
};

export default DiscoverPosts;
