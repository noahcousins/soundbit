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

const legislationSchema = z.object({
  politicianTags: z.array(z.string()).min(1, "Select at least one politician"),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  description: z.string(),
  bill: z.string(),
  sourceUrl: z.string().url("Invalid URL format"),
  bipartisanScore: z.string().transform((v) => Number(v) || 0),
  disclosureScore: z.string().transform((v) => Number(v) || 0),
  stage: z.string().transform((v) => Number(v) || 0),
  bulletPoints: z.array(z.string()).min(1, "Provide at least one bullet point"), // Added field for bullet points
  excerpt: z.string(),
});

function CreateLegislationForm({ onSubmit }: { onSubmit: Function }) {
  const form = useForm({
    resolver: zodResolver(legislationSchema),
  });

  const handleSubmit = (data: any) => {
    const handle = data.title.toLowerCase().replaceAll(" ", "-");
    const modifiedData = { ...data, handle };
    const formData = new FormData();

    for (const key of Object.keys(modifiedData)) {
      if (Array.isArray(modifiedData[key])) {
        for (const item of modifiedData[key]) {
          formData.append(`${key}[]`, item);
        }
      } else {
        formData.append(key, modifiedData[key]);
      }
    }

    onSubmit(formData);
    form.reset();
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const [politicians, setPoliticians] = useState<any[]>([]);

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
          name="politicianTags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Politician(s)</FormLabel>
              <FormControl>
                <div className="flex flex-wrap space-x-2">
                  {politicians.map((politician) => (
                    <div
                      key={politician.id}
                      className={`cursor-pointer rounded-full bg-gray-200 px-2 py-1 ${
                        Array.isArray(field.value) &&
                        field.value.includes(politician.id)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-300 text-black"
                      }`}
                      onClick={() => {
                        const updatedTags = Array.isArray(field.value)
                          ? field.value.includes(politician.id)
                            ? field.value.filter(
                                (tag: any) => tag !== politician.id
                              )
                            : [...field.value, politician.id]
                          : [politician.id];
                        field.onChange(updatedTags);
                      }}
                    >
                      {politician.name}
                    </div>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter the title" {...field} />
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
          name="bill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bill</FormLabel>
              <FormControl>
                <Input placeholder="Enter the bill" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter the description" {...field} />
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

        <FormField
          control={form.control}
          name="bipartisanScore"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bipartisan Score</FormLabel>
              <FormControl>
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <FormControl>
                <Input type="number" step="1" {...field} />
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
                <Input type="number" step="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bulletPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bullet Points</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter bullet points (separated by line breaks)"
                  {...field}
                  onChange={(e) => {
                    const bulletPointsArray = e.target.value.split("\n");
                    form.setValue("bulletPoints", bulletPointsArray);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter the excerpt" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Legislation</Button>
      </form>
    </Form>
  );
}

export default CreateLegislationForm;
