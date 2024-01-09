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

import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const handleSchema = z.object({
  handle: z.string().min(1, 'Handle is required')
});

export default function HandleInput({ onSubmit }: { onSubmit: Function }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(handleSchema)
  });

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }

    // Simulate API request delay for demonstration purposes
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with an actual async action
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
          Pick your artist handle
        </FormLabel>
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="mx-auto w-72"
                  placeholder="Your site handle"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="mx-auto w-fit" type="submit">
          {isLoading ? 'Loading...' : 'Submit'}
        </Button>
      </form>
    </Form>
  );
}
