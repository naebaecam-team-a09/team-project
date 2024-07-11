import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import UpdateForm from './_components/UpdateForm';
import { getPost } from '@/services/posts.service';

const UpdatePage = async ({ params }: { params: { postId: string } }) => {
  const { postId } = params;

  const prefetchQueryClient = new QueryClient();

  await prefetchQueryClient.prefetchQuery({
    queryKey: ['posts', postId],
    queryFn: async () => await getPost(postId)
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(prefetchQueryClient)}>
        <UpdateForm postId={postId} />
      </HydrationBoundary>
    </>
  );
};

export default UpdatePage;
