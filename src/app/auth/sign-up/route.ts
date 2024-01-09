import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`
    }
  });

  const { data } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    return NextResponse.redirect(
      `${requestUrl.origin}/sign-up?error=Invalid details. Please try a different email.`,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301
      }
    );
  }

  return NextResponse.redirect(`${requestUrl.origin}/welcome`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301
  });
}
