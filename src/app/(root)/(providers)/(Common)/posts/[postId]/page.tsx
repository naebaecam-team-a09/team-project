import { CommentButton } from '../_components/Comment/CommentButton';
import Comments from '../_components/Comment/Comments';
import PostDetail from '../_components/Comment/PostDetail';
import Heart from '../_components/Heart/Heart';

type ParamsType = { postId: string };

const PostDetailPage = async ({ params }: { params: ParamsType }) => {
  // { params }: { params: ParamsType }
  // {params.id}?
  // console.log(params.postId);
  // const categories = ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'];
  // console.log(params.postId);
  // const data = await getData();

  return (
    <article className="flex flex-col items-center justify-center my-10">
      <div className="h-12 bg-gray-500 mt-[120px] max-w-4xl w-full flex justify-end">
        <Heart isHeart={true} />
      </div>
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
