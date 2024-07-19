import { useState } from 'react';
import PopularPostList from './PopularPostList';

const Popularwear = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    if (currentIndex < 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="min-h-screen w-[1200px] flex flex-col items-center py-10 mt-[230px]">
      <div className="w-full">
        <p className="text-lg text-[#E7C891]">날씨에 잘 어울리는</p>
        <h1 className="text-3xl font-black text-white mb-5 text-left">오늘의 인기 코디</h1>
        <div className="border-t border-[#E7C891] my-5"></div>
      </div>
      <div className="relative w-full flex items-center justify-center ">
        <button
          className="absolute left-4 w-10 text-md h-10 flex justify-center items-center bg-white rounded-lg shadow-md z-10"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <div className="overflow-hidden w-full">
          <div
            className="flex transition-transform duration-300"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            <PopularPostList />
          </div>
        </div>
        <button
          className="absolute right-4 w-10 text-md h-10 flex justify-center items-center bg-white rounded-lg shadow-md z-10"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Popularwear;
