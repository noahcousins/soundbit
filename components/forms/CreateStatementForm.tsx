"use client";

import { useForm } from "react-hook-form";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statementSchema = z.object({
  politicianId: z.string().min(1, "Politician is required"),
  text: z.string().min(1, "Text is required"),
  date: z.string().min(1, "Date is required"),
  subject: z.string().min(1, "Subject is required"),
  bipartisanScore: z.string().transform((v) => Number(v) || 0),
  disclosureScore: z.string().transform((v) => Number(v) || 0),
  quote: z.string().min(1, "Quote is required"),
  sourceUrl: z.string().url("Invalid URL format"),
});

function CreateStatementForm({ onSubmit }: { onSubmit: Function }) {
  const [politicians, setPoliticians] = useState<any[]>([]);

  const form = useForm({
    resolver: zodResolver(statementSchema),
  });

  const handleSubmit = (data: any) => {
    // Convert the name to lowercase and replace spaces with hyphens
    const handle = data.subject.toLowerCase().replaceAll(" ", "-");
    // Create a new object with the modified handle
    const modifiedData = { ...data, handle };

    const formData = new FormData();
    for (const key of Object.keys(modifiedData)) {
      formData.append(key, modifiedData[key]);
    }
    onSubmit(formData);
    form.reset();
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getPoliticians = async () => {
      // This assumes you have a `todos` table in Supabase. Check out
      // the `Create Table and seed with data` section of the README 👇
      // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
      const { data } = await supabase.from("politicians").select();
      if (data) {
        setPoliticians(data);
      }
    };

    getPoliticians();
  }, [supabase, setPoliticians]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="politicianId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Politician</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="ml-2 rounded-full px-6 pb-2 pt-1 text-black"
                >
                  <option value="">--Please choose an option--</option>
                  {politicians.map((politician) => (
                    <option key={politician.id} value={politician.id}>
                      {politician.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the statement text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Enter the subject" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quote"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quote</FormLabel>
              <FormControl>
                <Input placeholder="Enter the quote" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bipartisanScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bipartisan Score</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="ml-2 rounded-full px-6 pb-2 pt-1 text-black"
                >
                  {Array.from({ length: 21 }, (_, index) => index - 10).map(
                    (score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    )
                  )}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="disclosureScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disclosure Score</FormLabel>
              <FormControl>
                <select
                  {...field}
                  className="ml-2 rounded-full px-6 pb-2 pt-1 text-black"
                >
                  {Array.from({ length: 21 }, (_, index) => index - 10).map(
                    (score) => (
                      <option key={score} value={score}>
                        {score}
                      </option>
                    )
                  )}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Source URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter the source URL" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Statement</Button>
      </form>
    </Form>
  );
}

export default CreateStatementForm;
