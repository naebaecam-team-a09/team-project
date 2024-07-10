export const getWeather = async () => {
  const response = await fetch('api/weather', { method: 'GET' });
  const data = await response.json();
  return data;
};
