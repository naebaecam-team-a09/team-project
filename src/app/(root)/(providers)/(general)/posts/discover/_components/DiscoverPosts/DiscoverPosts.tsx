import useIntersect from '@/hooks/useIntersect';
import { useGetPagenatedPostsWithUserInfo } from '@/services/posts/usePosts';
import { useOrderStore } from '@/zustand/store';
import Card from '../Card';

const DiscoverPosts = () => {
  const order = useOrderStore((state) => state.order);
  const { data, isPending, fetchNextPage, isFetching, hasNextPage } = useGetPagenatedPostsWithUserInfo({ order });

  const ref = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    if (hasNextPage && !isFetching) {
      fetchNextPage();
    }
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <>
      <ul className="w-full max-w-[1000px] grid grid-cols-3 gap-6">
        {data?.pages.map((page) =>
          page.data?.map((post) => (
            <li key={post.id}>
              <Card {...post} users={post.users || { username: '', profile_image_path: '' }} />
            </li>
          ))
        )}
      </ul>
      <div ref={ref}></div>
    </>
  );
};

export default DiscoverPosts;
