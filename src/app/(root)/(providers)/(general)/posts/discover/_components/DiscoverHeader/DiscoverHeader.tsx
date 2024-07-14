import { motion } from 'framer-motion';
import OrderButton from './OrderButton';

const DiscoverHeader = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <motion.h3
        className="text-[36px] text-[#E7C891] font-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        코디 모아보기
      </motion.h3>
      <motion.p
        className="text-lg text-[#FFFFFF]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        여러분들의 예쁜 코디를 봐주세요!
      </motion.p>
      <div className="w-full flex gap-5 justify-end">
        <OrderButton content={'최신순'} std={'created_at'} />
        <OrderButton content={'좋아요순'} std={'likes'} />
      </div>
    </div>
  );
};

export default DiscoverHeader;
