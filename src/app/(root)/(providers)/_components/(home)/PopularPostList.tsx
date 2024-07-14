'use client';

import { useGetPopularPosts } from '@/services/posts/usePosts';
import Image from 'next/image';
import Link from 'next/link';

const PopularPostList = () => {
  const { data: popularPosts, isPending } = useGetPopularPosts();
  if (isPending) return <div>Loading...</div>;

  return (
    <>
      {popularPosts?.map(({ id: postId, likes, title, users, image_url }, index) => {
        if (!users?.profile_image_path || !users?.username) return;
        return (
          <div key={postId} className="flex-none w-1/3 box-border px-4">
            <div className=" relative aspect-[3/5] overflow-hidden rounded-lg">
              <div className="z-10 w-full h-60 absolute bottom-0 custom-post-card-info-bg text-white flex flex-col justify-end p-4 gap-4">
                <p className="text-lg font-semibold">♥︎ {likes}</p>
                <p className="text-3xl font-black">{title}</p>

                <div className="flex gap-2 items-center">
                  <div className="relative rounded-full w-12 h-12 overflow-hidden">
                    <Image src={users.profile_image_path} alt={'프로필 이미지'} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <p className="text-xl font-bold">{users.username}</p>
                </div>
              </div>
              <Link href={`/posts/${postId}`}>
                <Image fill src={image_url} alt={`Slide ${index + 1}`} style={{ objectFit: 'cover' }} />
              </Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PopularPostList;
