import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`fixed bottom-10 right-10 w-20 h-20 bg-[#9F8264] text-white rounded-full flex items-center justify-center shadow-lg transition-opacity duration-500 transform ${showScrollButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      onClick={scrollToTop}
      style={{ transition: 'opacity 0.5s, transform 0.5s' }}
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;
