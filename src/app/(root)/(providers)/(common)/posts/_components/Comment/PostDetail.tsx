import { getPost } from '@/services/posts/posts.service';
import { Tables } from '@/types/supabase';
import Image from 'next/image';

type PostType = Tables<'posts'>;

const PostDetail = async ({ params }: { params: { postId: string } }) => {
  const data: PostType = await getPost(params.postId);

  const rawDate = data.created_at;
  const date = new Date(rawDate);
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const dateCreated = localDate.toISOString().slice(0, 10);

  return (
    <div className="overflow-hidden max-w-4xl w-full border border-gray-300 rounded-lg shadow-md mb-[80px]">
      <div className="flex">
        <div className="w-1/2 relative h-[600px]">
          {data.image_url ? (
            <div className="absolute top-0 left-0 w-full h-full object-cover rounded-lg">
              <Image
                fill
                src={data.image_url}
                // src={data.image_url ?data.image_url: 기본이미지 }
                alt="코디 이미지 사진"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ) : undefined}
        </div>
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
          <p className="text-gray-700 leading-relaxed mb-2">{data.contents}</p>
          <hr className="border-gray-300 mb-4" />
          <div className="flex items-start justify-between text-gray-500 text-xs">
            <div className="flex flex-wrap gap-2 max-w-[70%]">
              {data.category.map((categoryData, index) => (
                <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">
                  {categoryData}
                </span>
              ))}
            </div>
            <div className="ml-4 whitespace-nowrap">{dateCreated}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
