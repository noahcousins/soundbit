import AppNavigation from '@/components/layout/AppNavigation';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

export const metadata = {
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex flex-col w-full lg:w-5/6">
        {' '}
        <AppNavigation /> <div className="flex px-4 w-full">{children}</div>
      </div>
    </div>
  );
}
