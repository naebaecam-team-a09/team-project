export const getWeather = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/weather`, { method: 'GET' });
  const data = await response.json();
  return data;
};
