import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full min-h-screen bg-[#13191F]">{children}</div>;
};

export default RootLayout;
