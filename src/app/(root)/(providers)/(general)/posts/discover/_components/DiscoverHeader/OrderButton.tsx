'use client';
import { OrderType } from '@/types/order';
import { useOrderStore } from '@/zustand/store';

const OrderButton = ({ content, std }: { content: string; std: OrderType }) => {
  const { order, setOrder } = useOrderStore();

  const buttonStyle = `w-[150px] h-[48px] text-lg ${std === order ? 'text-white bg-[#9F8264]' : 'text-[#9F8264] text-white'}`;
  return (
    <button onClick={() => setOrder(std)} className={buttonStyle}>
      {content}
    </button>
  );
};

export default OrderButton;
