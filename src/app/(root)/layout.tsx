import { PropsWithChildren } from 'react';

const RootLayout = ({ children }: PropsWithChildren) => {
  return <div className="h-full min-h-screen">{children}</div>;
};

export default RootLayout;
