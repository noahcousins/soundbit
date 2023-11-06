"use client";

import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SidebarAuthButtons() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return (
    <div className="w-full flex-col gap-4 md:flex">
      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <Button asChild>
          <Link className="whitespace-nowrap" href="/sign-up">
            Sign up
          </Link>
        </Button>

        <Link href="/log-in" className={buttonVariants({ variant: "outline" })}>
          Log in
        </Link>
      </div>
    </div>
  );
}
