import React from 'react';

const RecommendsCard: React.FC = () => {
  const items = [
    { id: 1, imageUrl: 'https://via.placeholder.com/150', name: '아이템 1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/150', name: '아이템 2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/150', name: '아이템 3' },
    { id: 4, imageUrl: 'https://via.placeholder.com/150', name: '아이템 4' },
    { id: 5, imageUrl: 'https://via.placeholder.com/150', name: '아이템 5' },
    { id: 6, imageUrl: 'https://via.placeholder.com/150', name: '아이템 6' }
  ];

  return (
    <div className="flex flex-col items-center my-20 ">
      <h1 className="text-2xl font-bold mb-4">오늘의 날씨에는 이런 옷을 추천 드려요</h1>
      <h4 className="text-lg mb-8">오늘의 날씨에 대한 짧은 내용 추후 수파베이스에서 코멘트 부분을 가지고 올 꺼임</h4>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center ml-10">
            <img src={item.imageUrl} alt={item.name} className="w-40 h-40 object-cover rounded-full mb-2" />
            <p className="text-md font-medium mb-10">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendsCard;
