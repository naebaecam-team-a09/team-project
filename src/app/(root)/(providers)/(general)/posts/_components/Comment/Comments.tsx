'use client';

import { useComments } from '@/services/comments/useComments';
import { useState } from 'react';
import Comment from './Comment';

const Comments = ({ postId }: { postId: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const commentDummy = {
    username: 'username',
    profile_image_url: 'https://jkuhktbimkshohrktrhc.supabase.co/storage/v1/object/public/avatars/defaultImage.png',
    content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At corrupti Lorem ipsum dolor sit, amet'
  };

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
      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-300 py-4"
          style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
        >
          {comments?.map((comment, index) => (
            <div key={index} className="flex-none w-1/3 px-2">
              <Comment {...comment} users={comment.users || { profile_image_path: '', username: 'Unknown' }} />
            </div>
          ))}
        </div>
      </div>
      <button className="absolute right-0 p-2 bg-white rounded-full shadow-md z-10" onClick={nextSlide}>
        &gt;
      </button>
    </div>
  );
};

export default Comments;
