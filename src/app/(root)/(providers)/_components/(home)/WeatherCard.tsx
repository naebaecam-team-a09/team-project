import { getRecommendations } from '@/services/recommendations/recommendations.service';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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

  const textVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 1 }
    }
  };

  return (
    <div className="relative w-full h-[650px]">
      <img
        src={weatherImgUrl || 'https://via.placeholder.com/800x550'}
        alt="Weather"
        className="w-full h-full object-cover filter blur-sm"
      />
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-50 p-4">
        <motion.h1
          className="text-[75px] font-bold mb-2 text-white"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          현재 온도
        </motion.h1>
        <div className="flex items-center mb-2">
          <motion.div
            className="h-[3px] w-[117px] bg-[#E6C68F]"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          ></motion.div>
          <motion.h3
            className="text-[48px] font-bold mx-[140px] text-white"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          >
            {temperature !== null ? `${temperature}°C` : '로딩 중...'}
          </motion.h3>
          <motion.div
            className="h-[3px] w-[117px] bg-[#E6C68F]"
            initial="hidden"
            animate="visible"
            variants={textVariant}
          ></motion.div>
        </div>
        <motion.h1
          className="text-2xl text-white font-bold mb-4 mt-4"
          initial="hidden"
          animate="visible"
          variants={textVariant}
        >
          오늘의 날씨에는 이런 옷을 추천 드려요
        </motion.h1>
        <motion.div initial="hidden" animate="visible" variants={textVariant}>
          <RecommendsText />
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <RecommendsCards />
      </div>
    </div>
  );
};

export default WeatherCard;
