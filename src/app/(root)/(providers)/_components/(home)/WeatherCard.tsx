import { getRecommendations } from '@/services/recommendations/recommendations.service';
import { useEffect, useState } from 'react';
import RecommendsText from './RecommendsText';
import RecommendsCards from './RecommendsCards';

interface Recommendation {
  temperature_min: number;
  temperature_max: number;
  weather_img_url: string;
}

const WeatherCard = () => {
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
    <div className="relative w-full h-[650px] ">
      <img
        src={weatherImgUrl || 'https://via.placeholder.com/800x550'}
        alt="Weather"
        className="w-full h-full object-cover filter blur-sm"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
        <h1 className="text-[75px] font-bold mb-2 text-white">현재 온도</h1>
        <div className="flex items-center mb-2">
          <div className="h-[3px] w-[117px] bg-[#E6C68F]"></div>
          <h3 className="text-[48px] font-bold mx-[140px] text-white">
            {temperature !== null ? `${temperature}°C` : '로딩 중...'}
          </h3>
          <div className="h-[3px] w-[117px] bg-[#E6C68F]"></div>
        </div>
        <h1 className="text-2xl text-white font-bold mb-4 mt-4">오늘의 날씨에는 이런 옷을 추천 드려요</h1>
        <RecommendsText />
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <RecommendsCards />
      </div>
    </div>
  );
};

export default WeatherCard;
