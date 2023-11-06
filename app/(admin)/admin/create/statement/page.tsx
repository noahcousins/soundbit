import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import CreateStatementForm from "@/components/forms/CreateStatementForm";

export default function ServerAction() {
  const addStatement = async (formData: FormData) => {
    "use server";

    // Extract all the fields from the formData
    const politicianId = formData.get("politicianId") as string;
    const text = formData.get("text") as string;
    const date = formData.get("date") as string;
    const subject = formData.get("subject") as string;
    const bipartisanScore = formData.get("bipartisanScore");
    const disclosureScore = formData.get("disclosureScore");
    const quote = formData.get("quote") as string;
    const sourceUrl = formData.get("sourceUrl") as string;

    // Modify the 'name' field to be lowercased with spaces replaced by hyphens
    const handle = subject?.toLowerCase().replaceAll(" ", "-");

    if (politicianId && text && date && subject && quote && sourceUrl) {
      // Create a Supabase client configured to use cookies
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

      // Insert a new statement into the "statements" table
      const { data, error } = await supabase.from("statements").upsert([
        {
          politicianId,
          text,
          handle,
          date,
          subject,
          bipartisanScore,
          disclosureScore,
          quote,
          sourceUrl,
        },
      ]);

      if (error) {
        console.error("Error adding statement:", error);
      } else {
        console.log("Statement added:", data);
        revalidatePath("/server-action-example");
      }
    }
  };

  return (
    <div className="mx-auto my-24 w-1/2">
      <h1>Add Statement</h1>
      <CreateStatementForm onSubmit={addStatement} />
    </div>
  );
}
