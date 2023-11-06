import { Inter } from "next/font/google";
// import MainNav from "@/components/layout/MainNav";
// import Footer from "@/components/layout/Footer";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
// import { ThemeProvider } from "@/components/theme-provider";
// import { SidebarProvider } from "@/context/SidebarContext";
import { redirect } from "next/navigation"; // Import useRouter

export const metadata = {
  title: "UAPoli",
  description: "The most comprehensive resource for UAP politics",
};

export default async function AdminLayout({ children }: { children: any }) {
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
  async function fetchData() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/unauthenticated");
      return null;
    }

    let { data: user } = await supabase
      .from("user_roles")
      .select("*")
      .eq("user_id", session.user.id)
      .single();

    if (user?.role !== "admin") {
      redirect("/");
      return null;
    }

    return session; // Return session here
  }

  const session = await fetchData(); // Get the session

  return (
    // <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    //   <SidebarProvider>
    <div className="mx-auto flex max-w-[1600px] px-2 md:px-4 lg:space-x-8 lg:px-8">
      <div className="flex w-full flex-col">
        {/* <MainNav sessionUser={session} /> */}
        <main className="px-2 md:px-4 lg:px-8"> {children}</main>
      </div>
    </div>
    // {/* <Footer /> */}
    //   </SidebarProvider>
    // </ThemeProvider>
  );
}
