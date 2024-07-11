import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEXT_PUBLIC_KMA_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_KMA_URL;
  const pageNo = 1;
  const numOfRows = 20;
  const dataType = 'JSON';
  const baseTime = '0500';
  const nx = 52;
  const ny = 38;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const baseDate = `${year}${month}${day}`;

  const url = `${baseUrl}?serviceKey=${apiKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const temperature = data.response.body.items.item.find(
      (item: { category: string }) => item.category === 'TMP'
    )?.fcstValue;

    return NextResponse.json({ temperature });
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
