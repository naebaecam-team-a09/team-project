'use client';
import { getPostWithUserInfo } from '@/services/posts/posts.service';
import { Tables } from '@/types/supabase';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Heart from '../Heart/Heart';
import Buttons from '../buttons/Buttons';

type PostType = Tables<'posts'>;
export type UserType = Tables<'users'>;

const PostDetail = ({ params }: { params: { postId: string } }) => {
  const { data, isPending } = useQuery({
    queryKey: ['posts', params.postId],
    queryFn: () => getPostWithUserInfo({ postId: params.postId })
  });
  if (!data || isPending) return <div>loading...</div>;
  const rawDate = data.created_at;
  const date = new Date(rawDate);
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const dateCreated = localDate.toISOString().slice(0, 10);
  const user_id = data.user_id;

  return (
    <div className="overflow-hidden w-[900px] border border-[#D5BA8A] rounded-lg shadow-md mb-[80px] ">
      <div className="flex ">
        <div className="w-2/5 relative h-[600px]">
          {data.image_url ? (
            <div className="absolute top-0 left-0 w-full h-full object-cover rounded-lg">
              <Image fill src={data.image_url} alt="코디 이미지 사진" style={{ objectFit: 'cover' }} />
            </div>
          ) : undefined}
        </div>

        <div className="relative w-3/5 flex flex-col justify-center p-8 bg-[#132A43]">
          <Buttons ownerId={user_id} postId={params.postId} />
          <div className="flex w-full justify-between items-center">
            <div className="flex items-center mb-4">
              {data.users?.profile_image_path && (
                <Image
                  width={72}
                  height={72}
                  src={data.users?.profile_image_path}
                  alt="Profile"
                  className="w-12 h-12 rounded-full mr-4 border border-[#E7C891]"
                />
              )}
              <span className="text-white font-semibold text-[26px]">{data.users?.username}</span>
            </div>
            <p className="whitespace-nowrap text-white text-sm font-medium">{dateCreated}</p>
          </div>
          <h1 className="text-[36px] text-[#E7C891] font-black mb-4">{data.title}</h1>
          <p className="text-white text-sm leading-relaxed mb-2">{data.contents}</p>
          <hr className="border-[#E7C891] my-4" />
          <div className="flex items-start justify-between text-gray-500 text-xs">
            <div className="flex w-full gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2 w-full flex-1">
                {data.category.map((categoryData, index) => (
                  <span key={index} className="bg-[#E7C891] text-[#353E5C] px-3 py-1 rounded-full font-semibold">
                    {categoryData}
                  </span>
                ))}
              </div>
              <Heart postId={params.postId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
