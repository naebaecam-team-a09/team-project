import { PropsWithChildren } from 'react';
import QueryProvider from './_components/QueryProvider';

const ProvidersLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <QueryProvider>
        <p>I am a Layout</p>
        {children}
      </QueryProvider>
    </div>
  );
};

export default ProvidersLayout;
