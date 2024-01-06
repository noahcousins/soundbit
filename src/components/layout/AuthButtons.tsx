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
      <div className="flex items-center gap-4 whitespace-nowrap">
        <Link className="text-sm hover:underline" href="/log-in">
          Log in
        </Link>
        <Button
          className="z-[999] mx-auto w-fit scale-100 rounded-full bg-[#FF2E01] p-4 text-sm font-normal text-white transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-[#e00000] active:scale-100 active:bg-[#FF2E01]"
          asChild
        >
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
