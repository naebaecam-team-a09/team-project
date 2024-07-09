'use client';

import { useEffect, useState } from 'react';
import { getPosts } from '@/services/posts.services';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPosts();
        setData(result);
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
    <div>
      <h1>Home Page</h1>
    </div>
  );
};

export default Home;
