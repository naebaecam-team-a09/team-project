export const getRecommendations = async () => {
  const response = await fetch('api/recommendations', { method: 'GET' });
  const data = await response.json();
  return data;
};
