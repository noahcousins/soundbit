// pages/add-legislation.js
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import CreateEventForm from "@/components/forms/CreateEventForm";

export default function AddEvent() {
  const addEvent = async (formData: FormData) => {
    "use server";

    // Extract all the fields from the formData
    const politicianTags = formData.getAll("politicianTags");
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const location = formData.get("description") as string;
    const sourceUrl = formData.get("sourceUrl") as string;
    const handle = title?.toLowerCase().replaceAll(" ", "-");
    const bipartisanScore = formData.get("bipartisanScore");

    const bulletPoints = formData.getAll("bulletPoints");
    const excerpt = formData.get("excerpt") as string;

    const formDataEntries = Array.from(formData.entries());

    const politicianTagsArray = formDataEntries
      .filter(([name]) => name === "politicianTags[]")
      .map(([, value]) => value);

    if (title && date) {
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

      // Insert a new legislation into the "legislations" table
      const { data, error } = await supabase.from("events").upsert([
        {
          politicianTags: politicianTagsArray,
          title,
          date,
          description,
          sourceUrl,
          location,
          handle,
          bipartisanScore,
        },
      ]);

      if (error) {
        console.error("Error adding legislation:", error);
      } else {
        console.log("Legislation added:", data);
        revalidatePath("/add-legislation");
      }
    }
  };

  return (
    <div className="mx-auto my-24 w-1/2">
      <h1>Add Legislation</h1>
      <CreateEventForm onSubmit={addEvent} />
    </div>
  );
}
