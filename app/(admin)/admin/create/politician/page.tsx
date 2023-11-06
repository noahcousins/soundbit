import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import PoliticianForm from "@/components/forms/CreatePoliticianForm"; // Replace with the correct path to your form

export default function ServerAction() {
  const addPolitician = async (formData: FormData) => {
    "use server";

    // Extract all the fields from the formData
    const name = formData.get("name") as string;
    const party = formData.get("party");
    const position = formData.get("position");
    const state = formData.get("state");
    const district = formData.get("district");
    const committeeMemberships = formData.get("committeeMemberships");
    const email = formData.get("email");
    const yearIn = formData.get("yearIn");
    const yearOut = formData.get("yearOut");
    const biography = formData.get("biography");
    const facebook = formData.get("facebook");
    const twitter = formData.get("twitter");
    const officialWebsite = formData.get("officialWebsite");
    const pictureUrl = formData.get("pictureUrl");

    // Modify the 'name' field to be lowercased with spaces replaced by hyphens
    const handle = name?.toLowerCase().replaceAll(" ", "-");

    if (name && party && position && state && district) {
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

      // Insert a new politician into the "politicians" table
      const { data, error } = await supabase.from("politicians").upsert([
        {
          name,
          handle,
          party,
          position,
          state,
          district,
          committeeMemberships,
          email,
          yearIn,
          yearOut,
          biography,
          facebook,
          twitter,
          officialWebsite,
          pictureUrl,
        },
      ]);

      if (error) {
        console.error("Error adding politician:", error);
      } else {
        console.log("Politician added:", data);
        revalidatePath("/server-action-example");
      }
    }
  };

  return (
    <div className="mx-auto my-24 w-1/2">
      <h1>Add Politician</h1>
      <PoliticianForm onSubmit={addPolitician} />
    </div>
  );
}
