import AuthProvider from '@/contexts/auth.context/auth.context';
import { ModalProvider } from '@/contexts/modal.context/modal.context';
import { PropsWithChildren } from 'react';
import Header from './_components/Header';
import QueryProvider from './_components/providers/QueryProvider';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="h-full min-h-screen">
      <QueryProvider>
        <ModalProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </ModalProvider>
      </QueryProvider>
    </div>
  );
};

export default ProvidersLayout;
