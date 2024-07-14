'use client';

import Popularwear from './_components/(home)/PopularWear';
import WeatherCard from './_components/(home)/WeatherCard';
import ScrollToTopButton from './_components/ScrollToTopButton';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <WeatherCard />
      <Popularwear />
      <ScrollToTopButton />
    </div>
  );
};

export default Home;
