import ManageSubscriptionButton from '@/components/account/ManageSubscriptionButton';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import Link from 'next/link';
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

import ModeToggle from '@/components/ui/ModeToggle';

export default async function Account() {
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
  let userRoleData = null;

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
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const { data: userRoleResponse, error: userRoleError } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    profileData = profileResponse;
    userRoleData = userRoleResponse;
  }

  return (
    <section className="my-16 flex w-full flex-col gap-16">
      <div className="flex w-full flex-col justify-between gap-4">
        <div className="flex w-full flex-col">
          <h1 className="font-grtsk-giga text-4xl font-bold">Settings</h1>
          <p className="text-lg">Edit your account settings on soundbit.</p>
        </div>
        <h2 className="font-light">
          Hello, <span className="font-medium">{session.user.email}</span>
        </h2>
      </div>
      <Card
        title={subscription?.prices?.products?.name}
        description={
          subscription
            ? `You are currently on the ${subscription?.prices?.products?.name} plan.`
            : 'You are not currently subscribed to any plan.'
        }
        footer={<ManageSubscriptionButton session={session} />}
      >
        <div className="mb-4 mt-8 text-xl font-semibold">
          {subscription ? (
            <div className="flex">
              <h3 className="font-grtsk-giga text-3xl font-bold">
                {subscriptionPrice}
              </h3>
              <span className="mb-1 flex flex-col justify-end text-sm">
                {'/'}
                {subscription.prices?.interval}
              </span>
            </div>
          ) : (
            <Link href="/">Choose your plan</Link>
          )}
        </div>
      </Card>
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

function Card({ title, description, footer, children }: Props) {
  return (
    <div className="w-full max-w-3xl rounded-md border border-zinc-700">
      <div className="px-5 py-4">
        <h3 className="mb-1 font-grtsk-giga text-2xl font-medium">{title}</h3>
        <p className="text-zinc-300">{description}</p>
        {children}
      </div>
      <div className="rounded-b-md border-t p-4">{footer}</div>
    </div>
  );
}
