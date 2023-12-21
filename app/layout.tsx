import './globals.css';
import Footer from '@/components/layout/Footer';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { GeistSans } from 'geist/font';

import { WaveSurferProvider } from '@/context/WavesurferContent';
import { SoundPlayerProvider } from '@/context/SoundPlayerContext';

export const metadata = {
  title: 'UAPoli',
  description:
    'A bipartisan congressional outreach platform advocating for UAP disclosure.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body
        className={`select-none bg-background focus-visible:ring-transparent dark:bg-[#010101]`}
      >
        <main className="mx-auto flex min-h-screen max-w-[1280px] flex-col items-center">
          <SoundPlayerProvider>
            <WaveSurferProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex w-full">{children}</div>
              </ThemeProvider>
            </WaveSurferProvider>
          </SoundPlayerProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
