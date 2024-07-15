import { getPosts } from '@/services/posts/posts.service';
import { getUserInfo } from '@/services/users/users.service';
import { PostType } from '@/types/posts';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const UserPost: React.FC<{}> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPost, setUserPost] = useState<PostType[]>([]);

  async function getUserPost() {
    const user = await getUserInfo();
    if (!user) return;

    const data = await getPosts();

    const userPosts = data.filter((post: any) => post.user_id === user.id);

    setUserPost(userPosts);
  }

  useEffect(() => {
    getUserPost();
  }, []);

  const nextSlide = () => {
    if (currentIndex < userPost.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full">
        <h1 className="text-3xl text-[#E7C891] font-bold mb-5 text-left">내가 올린 코디</h1>
        <div className="border-t border-[#E7C891] my-5"></div>
      </div>
      <div className="relative w-full flex items-center justify-center">
        <button
          className="hover:brightness-75 absolute left-2 w-10 h-10 bg-white rounded-lg shadow-md z-10"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {userPost &&
              userPost.map((image, index) => (
                <div key={index} className="flex-none w-1/3 px-2 hover:">
                  <div className="aspect-[4/5] hover:brightness-50 relative overflow-hidden">
                    <Link href={`/posts/${image.id}`}>
                      <div className="opacity-0 hover:opacity-100 transition-all absolute inset-0 z-10 flex justify-center items-center text-md text-white font-semibold">
                        페이지로 이동
                      </div>
                      <img
                        src={image.image_url}
                        alt={`Slide ${index + 1}`}
                        className="object-cover rounded-lg w-full h-full"
                      />
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <button
          className="absolute right-2 w-10 h-10 bg-white rounded-lg shadow-md z-10 hover:brightness-75"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default UserPost;
