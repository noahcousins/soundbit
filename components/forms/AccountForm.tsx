'use client';

import Avatar from '@/components/forms/AvatarWidget';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrowserClient } from '@supabase/ssr';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const profileSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  website: z.string().url({ message: 'Invalid URL format' }).optional(),
  full_name: z.string().min(1, 'Full Name is required'),
  avatar_url: z.string().url({ message: 'Invalid URL format' }).optional()
});

interface User {
  email: string | number | readonly string[] | undefined;
  id: string;
}

interface Session {
  user: User;
}

interface AccountFormProps {
  session: Session;
}

export default function AccountForm({ session }: AccountFormProps) {
  const form = useForm({
    resolver: zodResolver(profileSchema)
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('user_id', user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        form.setValue('username', data.username);
        form.setValue('website', data.website);
        form.setValue('full_name', data.full_name);
        form.setValue('avatar_url', data.avatar_url);
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase, form]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile(formData: any) {
    try {
      setLoading(true);

      const { error } = await supabase.from('profiles').upsert([
        {
          user_id: user?.id,
          full_name: formData.full_name,
          username: formData.username,
          website: formData.website,
          avatar_url: form.watch('avatar_url'), // Retain the existing avatar_url
          updated_at: new Date().toISOString()
        }
      ]);

      if (error) throw error;
      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
    } finally {
      setLoading(false);
    }
  }

  // Define a function to handle the form submission
  // Define a function to handle the form submission
  const handleSubmit = form.handleSubmit((data) => {
    updateProfile(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Avatar
            uid={user.id}
            url={form.watch('avatar_url')}
            size={150}
            onUpload={(url: string) => {
              form.setValue('avatar_url', url);
              updateProfile({
                full_name: form.getValues('full_name'),
                username: form.getValues('username'),
                website: form.getValues('website'),
                avatar_url: url
              });
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  disabled
                  placeholder={`${session?.user.email}`}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <div>
                <label htmlFor="fullName">Full Name</label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <div>
                <label htmlFor="username">Username</label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <div>
                <label htmlFor="website">Website</label>
                <Input
                  id="website"
                  placeholder="Enter your website URL"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <Button
            onClick={() =>
              updateProfile({
                full_name: form.getValues('full_name'),
                username: form.getValues('username'),
                website: form.getValues('website')
              })
            }
            type="submit"
          >
            Update Profile
          </Button>
        </div>
      </form>
    </Form>
  );
}
