'use client';

import WeatherCard from './_components/WeatherCard';
import RecommendsCard from './_components/RecommendsCard';
import Popularwear from './_components/PopularWear';
import ScrollToTopButton from './_components/ScrollToTopButton';
import Modal from './_components/modal';
import { useState } from 'react';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <WeatherCard />
      <RecommendsCard />
      <Popularwear />
      <ScrollToTopButton />
      <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded" onClick={openModal}>
        모달 열기
      </button>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Home;
