import { getWeather } from '@/services/weather.service';
import React, { useEffect, useState } from 'react';

const WeatherCard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<{
    currentTemperature: number;
    minTemperature: number;
    maxTemperature: number;
    location: string;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getWeather();
        setWeatherData(data);
      } catch (error) {
        console.error('에러:', error);
        setError('날씨 정보를 가져오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex items-center rounded-md my-20">
      <div className="w-[859px] h-[457px]">
        <img
          src={`https://source.unsplash.com/featured/?${weatherData?.location}`}
          alt="Weather"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="-ml-[317px] w-[560px] h-[260px] flex flex-col items-start justify-center bg-gray-50 rounded-md shadow-md p-4">
        <h1 className="ml-12 text-4xl font-bold mb-2">오늘의 날씨는</h1>
        <h3 className="ml-12 text-2xl mb-2">현재 온도: {weatherData?.currentTemperature}°C</h3>
        <h3 className="ml-12 text-2xl mb-2">최저 온도: {weatherData?.minTemperature}°C</h3>
        <h3 className="ml-12 text-2xl mb-4">최고 온도: {weatherData?.maxTemperature}°C</h3>
        <div className="ml-12 flex space-x-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md">오늘의 추천</button>
          <button className="px-4 py-2 bg-gray-200 text-black shadow-md rounded-md">오늘의 인기</button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
