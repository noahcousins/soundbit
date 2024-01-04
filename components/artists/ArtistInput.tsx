'use client';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { redirect, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const artistSchema = z.object({
  name: z.string().min(1, 'Name is required')
});

export default function ArtistInput({ onSubmit }: { onSubmit: Function }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(artistSchema)
  });

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    // Simulate API request delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with your actual async action
    onSubmit(formData);
    setIsLoading(false);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full flex-col gap-8"
      >
        <FormLabel className="max-w-md text-center font-grtsk-giga text-4xl font-bold">
          What is your artist name?
        </FormLabel>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="mx-auto w-72"
                  placeholder="Artist's name"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button className="mx-auto w-fit" type="submit">
          {isLoading ? 'Loading...' : 'Next'}
        </Button>
      </form>
    </Form>
  );
}
