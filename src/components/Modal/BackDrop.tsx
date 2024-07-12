import { PropsWithChildren } from 'react';

function Backdrop({ children }: PropsWithChildren) {
  return (
    <div className="z-10 fixed inset-0 bg-gradient-to-t from-black/50 to-gray-500/50 flex justify-center items-center">
      {children}
    </div>
  );
}

export default Backdrop;
