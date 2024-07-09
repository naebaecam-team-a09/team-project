export const getPosts = async () => {
  const response = await fetch('http://localhost:3000/api/posts', { method: 'GET' });
  const data = await response.json();
  return data;
};
