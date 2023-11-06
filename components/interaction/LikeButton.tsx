"use client";

import { useState } from "react";
import { addLike, removeLike, checkLiked } from "@/utils/supabase/api"; // Import your API functions
import { useRouter } from "next/navigation"; // Import useRouter
import { ToastAction } from "@/components/ui/toast";
import { Heart } from "lucide-react";

import { useToast } from "@/components/ui/use-toast"; // Import useToast

export default function LikeButton({
  statementId,
  session,
}: {
  statementId: string;
  session: any;
}) {
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const { toast } = useToast(); // Initialize useToast hook

  async function fetchData() {
    if (session) {
      const liked = await checkLiked({ session, statementId });
      setIsLiked(liked);
    }
  }

  fetchData(); // Fetch the initial liked status when the component is rendered

  async function handleLike() {
    if (!session) {
      // Display the error toast message
      toast({
        variant: "destructive",
        title: "Sorry!",
        description: "You must be logged in to like statements.",
        action: (
          <ToastAction altText="Log in" onClick={() => router.push("/log-in")}>
            Log in
          </ToastAction>
        ),
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
        className={`like-button ${isLiked ? "liked" : ""}`}
      >
        <Heart
          size={48}
          className={` ${
            isLiked
              ? "pointer-events-none rounded-full bg-violet-600/90 p-2 transition-all duration-200 ease-in-out hover:p-4"
              : "pointer-events-none rounded-full p-2"
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
