'use client';

import { useComments } from '@/services/comments/useComments';
import _ from 'lodash';
import { useState } from 'react';
import Comment from './Comment';

const Comments = ({ postId }: { postId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: comments, error, isPending } = useComments(postId);

  const nextSlide = () => {
    if (!comments || comments.length < 3) return;
    if (currentIndex < comments.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  if (isPending) return <div>loading...</div>;
  return (
    <div className="relative w-full max-w-5xl flex items-center justify-center">
      <button className="absolute left-0 p-2 bg-white rounded-full shadow-md z-10" onClick={prevSlide}>
        &lt;
      </button>
      <div className="overflow-x-hidden w-full h-[300px] flex items-center justify-center">
        {_.isEmpty(comments) ? (
          <p className="text-lg text-[#6D758F] font-bold">아직 등록된 댓글이 없습니다</p>
        ) : (
          <div
            className="w-full flex transition-transform duration-300 py-4"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {comments?.map((comment, index) => (
              <div key={index} className="flex-none w-1/3 px-2">
                <Comment {...comment} users={comment.users || { profile_image_path: '', username: 'Unknown' }} />
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="absolute right-0 p-2 bg-white rounded-full shadow-md z-10" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Comments;
