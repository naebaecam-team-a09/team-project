import OrderButton from './OrderButton';

const DiscoverHeader = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-[36px] text-[#6D758F] font-black">코디 모아보기</h3>
      <p className="text-lg text-[#6D758F]">여러분들의 예쁜 코디를 봐주세요!</p>
      <div className="w-full flex gap-2 justify-end">
        <OrderButton content={'최신순'} std={'createdAt'} />
        <OrderButton content={'좋아요순'} std={'likes'} />
      </div>
    </div>
  );
};

export default DiscoverHeader;
