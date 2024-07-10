import AuthProvider from '@/contexts/auth.context/auth.context';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';
import QueryProvider from './_components/QueryProvider';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full min-h-screen">
      <AuthProvider>
        <QueryProvider>
          <Header />
          {children}
        </QueryProvider>
      </AuthProvider>
    </div>
  );
};

export default ProvidersLayout;
