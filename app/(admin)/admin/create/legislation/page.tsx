import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import CreateLegislationForm from "@/components/forms/CreateLegislationForm";

export default function AddLegislation() {
  const addLegislation = async (formData: FormData) => {
    "use server";

    // Extract all the fields from the formData
    const politicianTags = formData.getAll("politicianTags");
    const title = formData.get("title") as string;
    const date = formData.get("date") as string;
    const description = formData.get("description") as string;
    const sourceUrl = formData.get("sourceUrl") as string;
    const bill = formData.get("bill") as string;
    const handle = title?.toLowerCase().replaceAll(" ", "-");
    const bipartisanScore = formData.get("bipartisanScore");
    const disclosureScore = formData.get("disclosureScore");
    const stage = formData.get("disclosureScore");

    const bulletPoints = formData.getAll("bulletPoints");
    const excerpt = formData.get("excerpt") as string;

    const formDataEntries = Array.from(formData.entries());

    const politicianTagsArray = formDataEntries
      .filter(([name]) => name === "politicianTags[]")
      .map(([, value]) => value);

    const bulletPointsArray = formDataEntries
      .filter(([name]) => name === "bulletPoints[]")
      .map(([, value]) => value);

    console.log(politicianTagsArray, bulletPointsArray, "here should be array");

    console.log(politicianTagsArray, bulletPointsArray, "here should be array");

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
      const { data, error } = await supabase.from("legislations").upsert([
        {
          politicianTags: politicianTagsArray,
          title,
          date,
          description,
          bill,
          sourceUrl,
          handle,
          bipartisanScore,
          disclosureScore,
          stage,
          bulletPoints: bulletPointsArray,
          excerpt,
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
      <CreateLegislationForm onSubmit={addLegislation} />
    </div>
  );
}
