import Dock from '@/components/layout/Dock';
import { ThemeProvider } from '@/components/theme-provider';
import localFont from 'next/font/local';

export const metadata = {
  title: 'soundbit.',
  description: 'Easy website builder to display your music catalog.',
  icons: {
    icon: [
      {
        url: '/icon.ico',
        href: '/icon.ico'
      }
    ]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="flex w-full">{children}</div>;
}
