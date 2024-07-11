<<<<<<< HEAD
// pages/index.tsx

=======
import { getWeather } from '@/services/weather.service';
>>>>>>> dev
import React, { useEffect, useState } from 'react';

const WeatherCard: React.FC = () => {
  const [temperature, setTemperature] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');
        const data = await response.json();
        setTemperature(data.temperature);
      } catch (error) {
        console.error('Failed to fetch weather data', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex items-center rounded-md my-20">
      <div className="w-[859px] h-[457px]">
        <img alt="Weather" className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="-ml-[317px] w-[560px] h-[260px] flex flex-col items-start justify-center bg-gray-50 rounded-md shadow-md p-4">
        <h1 className="ml-12 text-4xl font-bold mb-2">오늘의 날씨는</h1>
        <h3 className="ml-12 text-2xl mb-2">현재 온도: {temperature ? `${temperature}°C` : '로딩 중...'}</h3>

        <div className="ml-12 flex space-x-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">오늘의 추천</button>
          <button className="px-4 py-2 bg-gray-200 text-black shadow-md rounded-md">오늘의 인기</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
