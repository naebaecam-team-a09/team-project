'use client';

import { useEffect, useState } from 'react';
import { getPosts } from '@/services/posts.services';
import WeatherCard from './_components/WeatherCard';

const Home = () => {
  const [data, setData] = useState<{ imageUrl: string; temperature: number } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosts();
        const dummyData = {
          imageUrl: 'https://via.placeholder.com/100', // 실제 데이터로 수정 필요
          temperature: 25
        };
        setData(dummyData); // 추후 날씨 api 에서 가지고 올꺼임 지금 은 테스트 용으로 더미 데이터 설정
      } catch (error) {
        console.error('에러:', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <WeatherCard imageUrl={data.imageUrl} temperature={data.temperature} />
    </div>
  );
};

export default Home;
