export const getRecommendations = async () => {
  const response = await fetch('http://localhost:3001/api/recommendations', { method: 'GET' });
  const data = await response.json();
  return data;
};
