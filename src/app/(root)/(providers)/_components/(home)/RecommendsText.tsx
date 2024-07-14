import { getRecommendations } from '@/services/recommendations/recommendations.service';
import { useEffect, useState } from 'react';
import Loading from '../Loading';

interface Recommendation {
  id: number;
  img_url: string[];
  contents: string;
  clothingItems: string[];
  temperature_min: number;
  temperature_max: number;
}

const RecommendsText = () => {
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
    <div className="flex flex-col items-center ">
      <h4 className="text-lg text-white mb-8">{item.contents}</h4>
    </div>
  );
};

export default RecommendsText;
