import NavLinks from "@/components/layout/NavLinks";

import Image from "next/image";
import Link from "next/link";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

import MainAccountTab from "./MainAccountTab";
import AuthButtons from "./AuthButtons";

export default async function Navigation() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="w-full flex sticky top-0 bg-background z-50 justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full flex justify-between items-center p-3 text-sm">
        <Link href="/">
          <Image
            alt="UAPoli logo"
            width={80}
            height={20.96}
            src="/uapoli_logo_nav.png"
          />
        </Link>{" "}
        <NavLinks />
        <div className="flex">
          {" "}
          {!user && <AuthButtons />}
          {/* {isSupabaseConnected && <AuthButton />} */}
          {user && <MainAccountTab sessionUser={user} />}
        </div>
      </div>
    </nav>
  );
}
