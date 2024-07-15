import { CommentButton } from '../_components/Comment/CommentButton';
import Comments from '../_components/Comment/CommentList';
import PostDetail from '../_components/Comment/PostDetail';

type ParamsType = { postId: string };

const PostDetailPage = async ({ params }: { params: ParamsType }) => {
  return (
    <article className="flex flex-col items-center justify-center mt-10">
      <div className="h-24 mt-[80px] max-w-4xl w-full flex justify-end items-center pr-4"></div>
      <PostDetail params={params} />
      <div className="w-[1000px]">
        <CommentButton postId={params.postId} />
        <Comments postId={params.postId} />
      </div>

      <div id="white-space" className="h-60"></div>
    </article>
  );
};

export default PostDetailPage;
