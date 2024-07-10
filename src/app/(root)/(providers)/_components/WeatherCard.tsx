import React from 'react';

interface WeatherCardProps {
  imageUrl: string;
  temperature: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ imageUrl, temperature }) => {
  return (
    <div className="flex items-center rounded-md my-20">
      <div className="w-[859px] h-[457px]">
        <img src={imageUrl} alt="Weather" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="-ml-[317px] w-[560px] h-[260px] flex flex-col items-start justify-center bg-gray-50 rounded-md shadow-md  p-4">
        <h1 className="ml-12 text-4xl font-bold mb-2">오늘의 날씨는</h1>
        <h3 className="ml-12 text-2xl mb-4">온도: {temperature}°C</h3>
        <div className="ml-12 flex space-x-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">오늘의 추천</button>
          <button className="px-4 py-2 bg-gray-200 text-black shadow-md rounded-md">오늘의 인기</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
