'use client';
import { OrderType } from '@/types/order';
import { useOrderStore } from '@/zustand/store';

const OrderButton = ({ content, std }: { content: string; std: OrderType }) => {
  const { order, setOrder } = useOrderStore();

  const buttonStyle = `w-[132px] h-[48px] text-lg font-bold rounded-md shadow-md ${std === order ? 'text-white bg-[#9F8264]' : 'text-[#172E47] bg-[#C8C8C8]'}`;
  return (
    <button onClick={() => setOrder(std)} className={buttonStyle}>
      {content}
    </button>
  );
};

export default OrderButton;
