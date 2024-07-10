export const getData = async (postId: string) => {
  //postId: string
  // console.log('postId', postId);
  const response = await fetch(`http://localhost:3000/api/posts/${postId}`, { method: 'GET', cache: 'no-store' });
  //`http://localhost:3000/api/posts/${postId}`
  const data = await response.json();
  // console.log('data->', data);
  return data;
};
