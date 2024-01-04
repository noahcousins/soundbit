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

const handleSchema = z.object({
  handle: z.string().min(1, 'Handle is required')
});

function HandleInput({ onSubmit }: { onSubmit: Function }) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(handleSchema)
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-grtsk-giga text-2xl font-bold">
                Pick your artist handle
              </FormLabel>
              <FormControl>
                <Input placeholder="Your site handle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit"> {isLoading ? 'Loading...' : 'Submit'}</Button>
      </form>
    </Form>
  );
}

export default HandleInput;
