import React, { useEffect, useState } from 'react';
import { getRecommendations } from '@/services/recommendations.services';
import Loading from './Loading';

interface Recommendation {
  id: number;
  img_url: string[];
  contents: string;
  clothingItems: string[];
}

const RecommendsCard: React.FC = () => {
  const [items, setItems] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecommendations();
        setItems(data.slice(0, 1)); // 지금은 슬라이스로 짤랐는데 나중에 온도 데이터랑 연결해서 받을 예정
      } catch (error) {
        console.error('에러:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
