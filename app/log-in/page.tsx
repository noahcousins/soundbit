import Link from 'next/link';
import Messages from './messages';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';

export default function Login() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );

  return (
    <div className="mx-auto my-28 flex h-fit w-full flex-col justify-center gap-4 px-8 sm:max-w-md">
      <Link className="flex cursor-pointer" href="/">
        <h1 className="text mx-auto text-center font-grtsk-giga text-4xl font-bold">
          soundbit.
        </h1>
      </Link>
      <h2 className="text-center text-xl font-medium">
        Create your free account
      </h2>
      <form
        className="flex h-full w-full flex-1 flex-col justify-center gap-4 text-foreground"
        action="/auth/sign-in"
        method="post"
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md border bg-inherit px-4 py-2"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md border bg-inherit px-4 py-2"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        {/* <p className="text-left text-sm">Forgot your password?</p> */}
        <button className="mb-2 rounded-md bg-[#FF2E01] px-4 py-2 tracking-tighter text-foreground">
          Continue
        </button>
        <Messages />
      </form>
      <p className="text-left text-sm">
        Need an account?{' '}
        <Link href={'/sign-up'}>
          <span className="font-semibold">Sign up</span>
        </Link>
      </p>
    </div>
  );
}
