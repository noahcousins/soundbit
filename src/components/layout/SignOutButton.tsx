'use client';

import { useRouter } from 'next/navigation';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
import { Button, buttonVariants } from '@/components/ui/button';
import { createBrowserClient } from '@supabase/ssr';

export default function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  return (
    <Button
      onClick={handleSignOut}
      className={buttonVariants({ variant: 'default' })}
    >
      Sign Out
    </Button>
  );
}
