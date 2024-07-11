import { getRecommendations } from '@/services/recommendations.service';
import React, { useEffect, useState } from 'react';
import Loading from './Loading';

interface Recommendation {
  id: number;
  img_url: string[];
  contents: string;
  clothingItems: string[];
  temperature_min: number;
  temperature_max: number;
}

const RecommendsCard: React.FC = () => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [temperature, setTemperature] = useState<number | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch('/api/weather');
        const weatherData = await weatherResponse.json();
        setTemperature(weatherData.temperature);

        const recommendationsData: Recommendation[] = await getRecommendations();
        const matchedRecommendations = recommendationsData.filter(
          (recommendation) =>
            weatherData.temperature >= recommendation.temperature_min &&
            weatherData.temperature <= recommendation.temperature_max
        );

        setItems(matchedRecommendations);
      } catch (error) {
        console.error('에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (items.length === 0) {
    return <div>추천 데이터를 불러오지 못했습니다.</div>;
  }

  const item = items[0];

  return (
    <div className="flex flex-col items-center my-20">
      <h1 className="text-2xl font-bold mb-4">오늘의 날씨에는 이런 옷을 추천 드려요</h1>
      <h4 className="text-lg mb-8">{item.contents}</h4>
      <div className="grid grid-cols-3 gap-4">
        {item.clothingItems.map((clothingItem, index) => (
          <div key={index} className="flex flex-col items-center ml-10">
            <img
              src={item.img_url[index]}
              alt={'내용을 불러오는중'}
              className="w-40 h-40 object-cover rounded-full mb-2"
            />
            <p className="text-md font-medium mb-10">{clothingItem}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendsCard;
