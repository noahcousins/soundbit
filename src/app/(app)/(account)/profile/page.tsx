import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';

import AccountForm from '@/components/forms/AccountForm';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export default async function Profile() {
  const [session, userDetails, subscription] = await Promise.all([
    getSession(),
    getUserDetails(),
    getSubscription()
  ]);

  const user = session?.user;

  if (!session) {
    return redirect('/log-in');
  }

  const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

  const updateName = async (formData: FormData) => {
    'use server';

    const cookieStore = cookies();

    const newName = formData.get('name') as string;
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
    const session = await getSession();
    const user = session?.user;
    const { error } = await supabase
      .from('users')
      .update({ full_name: newName })
      .eq('id', user?.id!);
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  const updateEmail = async (formData: FormData) => {
    'use server';

    const cookieStore = cookies();

    const newEmail = formData.get('email') as string;
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
    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      console.log(error);
    }
    revalidatePath('/account');
  };

  let profileData = null;

  if (user) {
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

    const { data: profileResponse, error: profileError } = await supabase
      .from('sites')
      .select('*')
      .eq('user_id', user.id)
      .single();

    profileData = profileResponse;
  }

  return (
    <section className="flex w-full flex-col gap-16">
      <div className="flex w-full justify-between">
        {' '}
        <div className="flex w-full flex-col">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-lg">Edit your profile on UAPoli.</p>
        </div>
        <div className="flex w-full content-end gap-4 text-right">
          <h2 className="text-4xl font-light">
            Hello,{' '}
            <span className="font-semibold">
              {profileData
                ? profileData.full_name || session.user.email
                : 'Loading...'}
            </span>
          </h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-24" variant="outline">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-scroll sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              {/* @ts-ignore */}

              <AccountForm session={session} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
