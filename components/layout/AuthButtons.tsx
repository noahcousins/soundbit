'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AuthButtons() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return (
    <div className="flex-col gap-4 md:flex">
      <div className="flex gap-4 whitespace-nowrap">
        <Link href="/log-in" className={buttonVariants({ variant: 'outline' })}>
          Log in
        </Link>
        <Button asChild>
          <Link className="hidden whitespace-nowrap md:block" href="/sign-up">
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
}
