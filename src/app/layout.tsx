import type { Metadata } from 'next';
import { Nanum_Gothic } from 'next/font/google';
import './globals.css';

const nanum = Nanum_Gothic({ subsets: ['latin'], weight: ['400', '700', '800'] });

export const metadata: Metadata = {
  title: 'Weather Wear',
  description: 'Weather Wear'
};

export default function HTMLLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nanum.className}>{children}</body>
    </html>
  );
}
