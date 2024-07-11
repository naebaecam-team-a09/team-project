const Heart = ({ isHeart }: { isHeart: boolean }) => {
  const options = isHeart
    ? {
        path: '/heart/icon-heart-filled.png',
        alt: 'filled heart'
      }
    : {
        path: '/heart/icon-heart-empty.png',
        alt: 'empty heart'
      };

  return (
    <>
      <img className="w-8 h-8" src={options.path} alt={options.alt} />
    </>
  );
};

export default Heart;
