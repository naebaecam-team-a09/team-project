import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/services/recommendations.service';

interface Recommendation {
  temperature_min: number;
  temperature_max: number;
  weather_img_url: string;
}

const WeatherCard = ({
  onRecommendClick,
  onPopularClick
}: {
  onRecommendClick: () => void;
  onPopularClick: () => void;
}) => {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [weatherImgUrl, setWeatherImgUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch('/api/weather');
        const weatherData = await weatherResponse.json();
        setTemperature(weatherData.temperature);

        const recommendationsData: Recommendation[] = await getRecommendations();
        const matchedRecommendation = recommendationsData.find(
          (recommendation) =>
            weatherData.temperature >= recommendation.temperature_min &&
            weatherData.temperature <= recommendation.temperature_max
        );

        setWeatherImgUrl(matchedRecommendation ? matchedRecommendation.weather_img_url : null);
      } catch (error) {
        console.error('Failed to fetch weather data or recommendations', error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="flex items-center rounded-md mt-[120px] mb-[80px]">
      <div className="w-[859px] h-[457px]">
        <img
          src={weatherImgUrl || 'https://via.placeholder.com/800x550'}
          alt="Weather"
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      <div className="-ml-[317px] w-[560px] h-[260px] flex flex-col items-start justify-center bg-gray-50 rounded-md shadow-md p-4">
        <h1 className="ml-12 text-4xl font-bold mb-2">오늘의 날씨는</h1>
        <h3 className="ml-12 text-2xl mb-2">현재 온도: {temperature !== null ? `${temperature}°C` : '로딩 중...'}</h3>

        <div className="ml-12 flex space-x-4">
          <button className="px-4 py-2 bg-gray-500 text-white rounded-md" onClick={onRecommendClick}>
            오늘의 추천
          </button>
          <button className="px-4 py-2 bg-gray-200 text-black shadow-md rounded-md" onClick={onPopularClick}>
            오늘의 인기
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
