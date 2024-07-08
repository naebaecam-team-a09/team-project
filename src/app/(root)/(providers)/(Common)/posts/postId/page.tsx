import React from 'react';

const PostDetailPage = () => {
  const categories = ['카테고리1', '카테고리2', '카테고리3', '카테고리4', '카테고리5'];

  return (
    <div className="flex justify-center my-10">
      <div className="max-w-4xl w-full border border-gray-300 rounded-lg shadow-md">
        <div className="flex">
          <div className="w-1/2">
            <img
              src="https://via.placeholder.com/800x1200"
              alt="코디 이미지 사진"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-3xl font-bold mb-4">{`제목`}</h1>
            <p className="text-gray-700 leading-relaxed mb-2">
              {`이곳은 코디와 관련된 내용을 적는 곳입니다.이곳은 코디와 관련된 내용을 적는 곳입니다.이곳은 코디와 관련된
              내용을 적는 곳입니다`}
            </p>
            <hr className="border-gray-300 mb-4" />
            <div className="flex items-start justify-between text-gray-500 text-xs">
              <div className="flex flex-wrap gap-2 max-w-[70%]">
                {categories.map((category, index) => (
                  <span key={index} className="bg-gray-200 px-2 py-1 rounded-full">
                    {category}
                  </span>
                ))}
              </div>
              <div className="ml-4 whitespace-nowrap">{`2024-07-09`}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;
