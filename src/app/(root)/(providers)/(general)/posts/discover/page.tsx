'use client';

import { useState } from 'react';
import DiscoverHeader from './_components/DiscoverHeader';
import DiscoverPosts from './_components/DiscoverPosts';
import Divider from './_components/Divider';

const DiscoverPage = () => {
  const [order, setOrder] = useState<'createdAt' | 'likes'>('createdAt');

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[1100px] mt-[120px] flex flex-col items-center gap-6">
        <DiscoverHeader />
        <Divider />
        <DiscoverPosts />
      </div>
    </div>
  );
};

export default DiscoverPage;
