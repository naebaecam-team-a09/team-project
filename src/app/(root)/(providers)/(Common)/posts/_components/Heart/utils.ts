export const getLikeComponentProps = (isHeart: boolean | undefined) => {
  return !!isHeart
    ? {
        path: '/heart/icon-heart-filled.png',
        alt: 'filled heart'
      }
    : {
        path: '/heart/icon-heart-empty.png',
        alt: 'empty heart'
      };
};
