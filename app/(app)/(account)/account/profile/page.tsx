import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import AccountForm from "@/components/forms/AccountForm";

export default async function Account() {
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
    data: { session },
  } = await supabase.auth.getSession();
  //@ts-ignore
  return <AccountForm session={session} />;
}
