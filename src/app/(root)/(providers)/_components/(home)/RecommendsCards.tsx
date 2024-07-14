import { getRecommendations } from '@/services/recommendations/recommendations.service';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Recommendation {
  id: number;
  img_url: string[];
  contents: string;
  clothingItems: string[];
  temperature_min: number;
  temperature_max: number;
}

const RecommendsCards = () => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weather`);
        const weatherData = await weatherResponse.json();

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

  if (items.length === 0) {
    return <div></div>;
  }

  const item = items[0];

  return (
    <div className="flex flex-col items-center">
      <div className="flex ">
        {item.clothingItems.map((clothingItem, index) => (
          <motion.div
            key={index}
            className="flex w-[300px] h-[340px] flex-col items-center bg-[#132A43] border-4 border-[#E7C891] p-2 m-2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.5, duration: 0.5 }}
          >
            <div className="w-full h-3/4">
              <img src={item.img_url[index]} alt={'내용을 불러오는중'} className="w-full h-full object-cover p-2" />
            </div>
            <p className="text-lg font-bold text-white font-medium mt-2">{clothingItem}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendsCards;
