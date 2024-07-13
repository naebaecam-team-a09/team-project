import { getPost, getPostWithUserInfo } from '@/services/posts/posts.service';

import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Buttons from '../buttons/Buttons';

type PostType = Tables<'posts'>;
export type UserType = Tables<'users'>;

const PostDetail = async ({ params }: { params: { postId: string } }) => {
  const data = await getPostWithUserInfo({ postId: params.postId });
  const rawDate = data.created_at;
  const date = new Date(rawDate);
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const dateCreated = localDate.toISOString().slice(0, 10);
  const user_id = data.user_id;

  return (
    <div className="overflow-hidden max-w-4xl w-full border border-gray-300 rounded-lg shadow-md mb-[80px]">
      <div className="flex">
        <div className="w-1/2 relative h-[600px]">
          {data.image_url ? (
            <div className="absolute top-0 left-0 w-full h-full object-cover rounded-lg">
              <Image fill src={data.image_url} alt="코디 이미지 사진" style={{ objectFit: 'cover' }} />
            </div>
          ) : undefined}
        </div>

        <div className="w-1/2 flex flex-col justify-center p-8">
          <div className="flex items-center mb-4">
            {data.users?.profile_image_path && (
              <Image
                width={32}
                height={32}
                src={data.users?.profile_image_path}
                alt="Profile"
                className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full mr-4"
              />
            )}
            <span className="text-gray-700 font-semibold text-[8px] xs:text-[10px]  sm:text-sm md:text-base">
              {data.users?.username}
            </span>
          </div>
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
          <Buttons ownerId={user_id} postId={params.postId} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
