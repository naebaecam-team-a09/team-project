import { PropsWithChildren } from 'react';
import QueryProvider from './_components/QueryProvider';
import Header from './_components/Header';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <QueryProvider>
        <Header />
        {children}
      </QueryProvider>
    </div>
  );
};

export default ProvidersLayout;
