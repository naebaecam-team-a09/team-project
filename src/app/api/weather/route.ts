import { NextResponse } from 'next/server';

const API_KEY = process.env.OPEN_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}';
const DEFAULT_LAT = '37.5665'; // 서울의 위도
const DEFAULT_LON = '126.9780'; // 서울의 경도

export async function GET() {
  try {
    const response = await fetch(`${BASE_URL}?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.message }, { status: response.status });
    }

    const data = await response.json();

    return NextResponse.json({
      currentTemperature: data.main.temp,
      minTemperature: data.main.temp_min,
      maxTemperature: data.main.temp_max,
      location: data.name
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
