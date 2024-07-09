import { getData } from '@/services/posts.services';
import React from 'react';
import { Tables } from '@/types/supabase';

// type PostType = Tables<'posts'>;

// type ParamsType = { postId: string };

const PostDetailPage = async () => {
  // { params }: { params: ParamsType }
  // {params.id}?
  // console.log(params.postId);
  // const categories = ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'];

  const data = await getData();
  // const data: PostType = await getData(params.postId);
  const dateCreated = data[6].created_at.slice(0, 10);
  // console.log(data[6]);

  return (
    <div className="flex justify-center my-10">
      <div className="max-w-4xl w-full border border-gray-300 rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2 relative h-[80vh]">
            <img
              src={data[6].image_url}
              // src={data.image_url ?data.image_url: 기본이미지 }
              alt="코디 이미지 사진"
              className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">{data[6].title}</h1>
            <p className="text-gray-700 leading-relaxed mb-2">{data[6].contents}</p>
            <hr className="border-gray-300 mb-4" />
            <div className="flex items-start justify-between text-gray-500 text-xs">
              <div className="flex flex-wrap gap-2 max-w-[70%]">
                {data[6].category.map((categoryData, index) => (
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
    </div>
  );
};

export default PostDetailPage;
