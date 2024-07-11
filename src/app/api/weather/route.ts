// src/app/api/weather/route.ts

import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const serviceKey = 'CWuKl3zGpf5wdiftk8feig1ofmE42raCph%2FPcuudVpQNk2jzf3d2VsCk3vuSTxvObiqm%2FettPhRTjHGwkMrePQ%3D%3D';
  const baseDate = '20210711'; // 기준 날짜 (YYYYMMDD 형식)
  const baseTime = '0600'; // 기준 시간 (HHMM 형식)
  const nx = 60; // 예보지점 X 좌표
  const ny = 127; // 예보지점 Y 좌표

  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=CWuKl3zGpf5wdiftk8feig1ofmE42raCph%2FPcuudVpQNk2jzf3d2VsCk3vuSTxvObiqm%2FettPhRTjHGwkMrePQ%3D%3D&pageNo=1&numOfRows=14&dataType=JSON&base_date=20240711&base_time=0500&nx=55&ny=127`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // TMP (현재 온도) 데이터 추출
    const items = data.response.body.items.item;
    const temperatureItem = items.find((item: any) => item.category === 'TMP');
    const temperature = temperatureItem ? temperatureItem.fcstValue : 'N/A';

    res.status(200).json({ temperature });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
};

export default handler;
