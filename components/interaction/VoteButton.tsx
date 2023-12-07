'use client';

import { useState, useEffect } from 'react';
import {
  addVote,
  updateVote,
  removeVote,
  checkVoted
} from '@/utils/supabase/api/legacy/api'; // Import your API functions
import { ArrowUp, ArrowDown } from 'lucide-react';
import { ToastAction } from '@/components/ui/toast';

import { useToast } from '@/components/ui/use-toast'; // Import useToast
import { useRouter } from 'next/navigation'; // Import useRouter

export default function VoteButton({
  legislationId,
  session
}: {
  legislationId: string;
  session: any;
}) {
  const [voteStatus, setVoteStatus] = useState(''); // Values: 'upvote', 'downvote', or null
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast hook

  useEffect(() => {
    async function fetchData() {
      if (session) {
        const voted = await checkVoted({ session, legislationId });
        if (voted !== null) {
          setVoteStatus(voted ? 'upvote' : 'downvote');
        }
      }
    }
    fetchData();
  }, [session, legislationId]);

  async function handleVote(action: string) {
    if (!session) {
      // Display the error toast message
      toast({
        variant: 'destructive',
        title: 'Sorry!',
        description: 'You must be logged in to vote on legislation.',
        action: (
          <ToastAction altText="Log in" onClick={() => router.push('/log-in')}>
            Log in
          </ToastAction>
        )
      });
      return;
    }

    if (voteStatus === action) {
      await removeVote({ legislationId, session });
      setVoteStatus('');
    } else {
      const isUpvote = action === 'upvote';
      if (voteStatus !== null) {
        await updateVote({ legislationId, session, isUpvote });
      } else {
        await addVote({ legislationId, session, isUpvote });
      }
      setVoteStatus(action);
    }
  }

  return (
    <div className="flex h-fit gap-4">
      <button
        onClick={() => handleVote('upvote')}
        className={`vote-button rounded-2xl p-2 ${
          voteStatus === 'upvote' ? 'voted bg-primary/10' : ''
        }`}
      >
        <ArrowUp />
      </button>
      <button
        onClick={() => handleVote('downvote')}
        className={`vote-button rounded-2xl p-2 ${
          voteStatus === 'downvote' ? 'voted bg-primary/10' : ''
        }`}
      >
        <ArrowDown />
      </button>
    </div>
  );
}
