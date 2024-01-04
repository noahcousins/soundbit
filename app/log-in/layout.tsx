import { ThemeProvider } from '@/components/theme-provider';
import Navigation from '@/components/layout/Navigation';
import Sidebar from '@/components/layout/Sidebar';

import { Toaster } from '@/components/ui/toaster';

export default function SiteLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
}
