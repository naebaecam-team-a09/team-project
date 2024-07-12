import { getPosts } from '@/services/posts.service';
import { getUserInfo } from '@/services/users.service';
import { PostType } from '@/types/posts';
import React, { useEffect, useState } from 'react';

const UserPost: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userPost, setUserPost] = useState<PostType>();
  const [images, setImages] = useState<string[]>([]);

  async function getUserPost() {
    const user = await getUserInfo();
    if (!user) return;

    const data = await getPosts();
    const userPosts = data.filter((post: any) => post.user_id === user.id);
    setUserPost(userPosts);
    if (userPosts && Array.isArray(userPosts)) {
      const imageUrls = userPosts.map((post) => post.image_url);
      setImages(imageUrls);
    }
  }
  useEffect(() => {
    getUserPost();
  }, []);

  const nextSlide = () => {
    if (currentIndex < images.length - 3) {
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
      <div className="w-full max-w-5xl">
        <h1 className="text-2xl text-gray-400 font-bold mb-5 text-left">내가 올린 코디</h1>
        <div className="border-t border-gray-300 my-5"></div>
      </div>
      <div className="relative w-full max-w-5xl flex items-center justify-center">
        <button className="absolute left-0 p-2 bg-white rounded-full shadow-md z-10" onClick={prevSlide}>
          &lt;
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {images.map((image, index) => (
              <div key={index} className="flex-none w-1/3 px-2">
                <div className="aspect-w-4 aspect-h-5">
                  <img src={image} alt={`Slide ${index + 1}`} className="object-cover rounded-lg w-full h-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <button className="absolute right-0 p-2 bg-white rounded-full shadow-md z-10" onClick={nextSlide}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default UserPost;
