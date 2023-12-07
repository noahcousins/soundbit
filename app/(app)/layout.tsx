import AppNavigation from '@/components/layout/AppNavigation';
import Sidebar from '@/components/layout/Sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import Paywall from '@/components/layout/Paywall';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const metadata = {
  title: 'UAPoli',
  description: 'The fastest way to build apps with Next.js and Supabase'
};

export default async function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name: string) => cookieStore.get(name)?.value } }
  );

  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error) {
    // Handle error (e.g., display an error message)
  }

  const isUserLoggedIn = !!user;

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex w-full flex-col lg:w-5/6">
        <AppNavigation />
        <div className="relative flex w-full px-8 py-8">
          {/* Use the Paywall component */}
          {!isUserLoggedIn && <Paywall />}
          {/* Render the content */}
          {children}
        </div>
      </div>
    </div>
  );
}
