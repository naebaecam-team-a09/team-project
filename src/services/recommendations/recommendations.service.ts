export const getRecommendations = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/recommendations`, { method: 'GET' });
  const data = await response.json();

  return data;
};
