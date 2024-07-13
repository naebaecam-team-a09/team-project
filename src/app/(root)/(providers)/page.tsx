'use client';

import { useRef } from 'react';

import Popularwear from './_components/(home)/PopularWear';
import RecommendsCard from './_components/(home)/RecommendsCard';
import WeatherCard from './_components/(home)/WeatherCard';
import ScrollToTopButton from './_components/ScrollToTopButton';

const Home = () => {
  const recommendsRef = useRef<HTMLDivElement>(null);
  const popularwearRef = useRef<HTMLDivElement>(null);

  const handleRecommendClick = () => {
    recommendsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePopularClick = () => {
    popularwearRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <WeatherCard onRecommendClick={handleRecommendClick} onPopularClick={handlePopularClick} />
      <div ref={recommendsRef}>
        <RecommendsCard />
      </div>
      <div ref={popularwearRef}>
        <Popularwear />
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
