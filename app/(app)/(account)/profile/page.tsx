import ManageSubscriptionButton from '@/components/account/ManageSubscriptionButton';
import {
  getSession,
  getUserDetails,
  getSubscription
} from '@/app/supabase-server';
import { Database } from '@/types_db';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SmallStatementCard from '@/components/statements/SmallStatementCard';
import { UUID } from 'crypto';
import HorizontalGallery from '@/components/sections/HorizontalGallery';
import LegislationCard from '@/components/legislation/SmallLegislationCard';

export const metadata = {
  title: 'My Account | UAPoli',
  description:
    'A bipartisan congressional outreach platform advocating for UAP disclosure.'
};

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
  let userRoleData = null;
  let userLikesData = null;
  let userVotesData = null;

  let userSendsData = null;

  let statementCount = null;

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

    const { data: userLikesResponse, error: userLikesError } = await supabase
      .from('likes')
      .select('*')
      .eq('user_id', user.id);

    const { data: userVotesResponse, error: userVotesError } = await supabase
      .from('votes')
      .select('*')
      .eq('user_id', user.id);

    const { data: userSendsResponse, error: userSendsError } = await supabase
      .from('sends')
      .select('id', { count: 'exact' })
      .eq('user_id', user.id);

    profileData = profileResponse;
    userRoleData = userRoleResponse;
    userLikesData = userLikesResponse;
    userVotesData = userVotesResponse;
    userSendsData = userSendsResponse;
    console.log(userSendsData, 'sends abbab');
    //@ts-ignore
    if (Array.isArray(userSendsData)) {
      statementCount = userSendsData.length;
    }
    console.log(statementCount, 'cococococo');
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
        </div>
      </div>

      <div className="">
        <p className="text-2xl font-light">You have {statementCount} sends.</p>
      </div>
      <div className="flex w-full">
        <LikesSection session={session} userLikes={userLikesData} />
      </div>
      <div className="flex w-full">
        <VotesSection session={session} userVotes={userVotesData} />
      </div>
    </section>
  );
}

interface Props {
  title: string;
  description?: string;
  footer?: ReactNode;
  children: ReactNode;
}

async function LikesSection({
  userLikes,
  session
}: {
  userLikes: any;
  session: any;
}) {
  const statements = await Promise.all(
    userLikes.map((userLike: { statement_id: UUID }) =>
      fetchStatement(userLike.statement_id)
    )
  );

  return (
    <HorizontalGallery
      heading="Liked Statements"
      description={`Discover the latest remarks about UAPs straight from the politicians themselves.`}
      link="/statements"
    >
      {' '}
      {statements.map((statement, index) => (
        <div key={statement.id} className="snap-start">
          <SmallStatementCard
            statement={statement}
            index={index}
            loading={false}
            session={session} // Pass other necessary props as needed
          />
        </div>
      ))}
    </HorizontalGallery>
  );
}

async function VotesSection({
  userVotes,
  session
}: {
  userVotes: any;
  session: any;
}) {
  const legislations = await Promise.all(
    userVotes.map((userVote: { legislation_id: UUID }) =>
      fetchLegislation(userVote.legislation_id)
    )
  );

  return (
    <HorizontalGallery
      heading="Legislation Votes"
      description={`Discover the latest remarks about UAPs straight from the politicians themselves.`}
      link="/legislation"
    >
      {' '}
      {legislations.map((legislation, index) => (
        <div key={legislation.id} className="snap-start">
          <LegislationCard
            legislation={legislation}
            index={index}
            session={session} // Pass other necessary props as needed
          />
        </div>
      ))}
    </HorizontalGallery>
  );
}

async function fetchStatement(statementId: UUID) {
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
  let { data, error } = await supabase
    .from('statements')
    .select('*')
    .eq('id', statementId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}

async function fetchLegislation(legislationId: UUID) {
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
  let { data, error } = await supabase
    .from('legislations')
    .select('*')
    .eq('id', legislationId)
    .single();

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
