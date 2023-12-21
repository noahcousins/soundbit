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
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const handleSchema = z.object({
  handle: z.string().min(1, 'Handle is required')
});

function HandleInput({ onSubmit }: { onSubmit: Function }) {
  const form = useForm({
    resolver: zodResolver(handleSchema)
  });

  const router = useRouter();

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }
    onSubmit(formData);
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
              <FormLabel>Handle</FormLabel>
              <FormControl>
                <Input placeholder="Your site handle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default HandleInput;
