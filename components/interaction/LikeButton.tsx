'use client';

// Import useRouter
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import {
  addLike,
  removeLike,
  checkLiked
} from '@/utils/supabase/api/legacy/api';
import { Heart } from 'lucide-react';
// Import your API functions
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// Import useToast

export default function LikeButton({
  statementId,
  session,
  initialLiked
}: {
  statementId: string;
  session: any;
  initialLiked: boolean;
}) {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast hook
  // Fetch the initial liked status when the component is rendered

  async function handleLike() {
    if (!session) {
      // Display the error toast message
      toast({
        variant: 'destructive',
        title: 'Sorry!',
        description: 'You must be logged in to like statements.',
        action: (
          <ToastAction altText="Log in" onClick={() => router.push('/log-in')}>
            Log in
          </ToastAction>
        )
      });
      return;
    }

    if (isLiked) {
      await removeLike(statementId, session);
    } else {
      await addLike(statementId, session);
    }
    setIsLiked(!isLiked);
  }

  if (session) {
    return (
      <button
        onClick={handleLike}
        className={`like-button ${isLiked ? 'liked' : ''}`}
      >
        <Heart
          size={48}
          className={` ${
            isLiked
              ? 'pointer-events-none rounded-full bg-purple-700 p-2 transition-all duration-200 ease-in-out hover:p-4'
              : 'pointer-events-none rounded-full p-2'
          }`}
        />
      </button>
    );
  } else {
    return (
      <button onClick={handleLike} className="like-button">
        <Heart />
      </button>
    );
  }
}
