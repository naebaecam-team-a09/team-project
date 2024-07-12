'use client';

import WeatherCard from './_components/WeatherCard';
import RecommendsCard from './_components/RecommendsCard';
import Popularwear from './_components/PopularWear';
import ScrollToTopButton from './_components/ScrollToTopButton';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <WeatherCard />
      <RecommendsCard />
      <Popularwear />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
