import './globals.css';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font';

import { SoundPlayerProvider } from '@/context/SoundPlayerContext';

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

const GrtskGiga = localFont({
  src: [
    {
      path: '../public/fonts/giga/Grtsk-Giga-Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-ExtraLight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/giga/Grtsk-Giga-Bold.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-grtsk-giga'
});

const GrtskPeta = localFont({
  src: [
    {
      path: '../public/fonts/peta/Grtsk-Peta-Thin.otf',
      weight: '100',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-ExtraLight.otf',
      weight: '200',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-Light.otf',
      weight: '300',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-Regular.otf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-Medium.otf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-SemiBold.otf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../public/fonts/peta/Grtsk-Peta-Bold.otf',
      weight: '700',
      style: 'normal'
    }
  ],
  variable: '--font-grtsk-peta'
});

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GrtskGiga.variable} ${GrtskPeta.variable} bg-background focus-visible:ring-transparent dark:bg-[#181818]`}
      >
        <main className="mx-auto flex min-h-screen flex-col items-center font-grtsk-peta tracking-tighter">
          <SoundPlayerProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="flex w-full">{children}</div>
            </ThemeProvider>
          </SoundPlayerProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
