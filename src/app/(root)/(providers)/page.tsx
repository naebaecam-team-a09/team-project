'use client';

import { useRef } from 'react';
import Popularwear from './_components/PopularWear';
import RecommendsCard from './_components/RecommendsCard';
import ScrollToTopButton from './_components/ScrollToTopButton';
import WeatherCard from './_components/WeatherCard';

const Home = () => {
  const recommendsRef = useRef<HTMLDivElement>(null);
  const popularwearRef = useRef<HTMLDivElement>(null);

  const handleRecommendClick = () => {
    recommendsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePopularClick = () => {
    popularwearRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  console.log('hello');

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
