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

import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/components/ui/use-toast';
import { ScrollArea } from '../ui/scroll-area';

const profileSchema = z.object({
  facebook: z.string().url({ message: 'Invalid URL format' }).optional(),
  instagram: z.string().url({ message: 'Invalid URL format' }).optional(),
  twitter: z.string().url({ message: 'Invalid URL format' }).optional(),
  wikipedia: z.string().url({ message: 'Invalid URL format' }).optional()
});

export default function AccountForm({
  session,
  initialFormData
}: {
  session: any;
  initialFormData: any;
}) {
  const form = useForm({
    resolver: zodResolver(profileSchema)
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const user = session?.user;

  const { toast } = useToast();

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);
      if (initialFormData) {
        form.setValue('facebook', initialFormData.facebook);
        form.setValue('instagram', initialFormData.instagram);
        form.setValue('twitter', initialFormData.twitter);
        form.setValue('wikipedia', initialFormData.wikipedia);
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

      const { error } = await supabase.from('sites').upsert([
        {
          updated_at: new Date().toISOString(),
          facebook: formData.facebook,
          instagram: formData.instagram,
          twitter: formData.twitter,
          wikipedia: formData.wikipedia
        }
      ]);

      if (error) throw error;
      toast({
        title: 'Updated',
        description: 'Your profile has been updated.'
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Error updating your profile.'
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    updateProfile(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        {/* <ScrollArea className="h-[500px] w-[350px] rounded-md border p-4"> */}
        <div className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="facebook"
            render={({ field }) => (
              <div>
                <label htmlFor="facebook">Facebook</label>
                <Input
                  id="facebook"
                  placeholder="Enter your Facebook link"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="instagram"
            render={({ field }) => (
              <div>
                <label htmlFor="instagram">Instagram</label>
                <Input
                  id="instagram"
                  placeholder="Enter your Instagram link"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="twitter"
            render={({ field }) => (
              <div>
                <label htmlFor="twitter">Twitter</label>
                <Input
                  id="twitter"
                  placeholder="Enter your Twitter link"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <FormField
            control={form.control}
            name="wikipedia"
            render={({ field }) => (
              <div>
                <label htmlFor="wikipedia">Wikipedia</label>
                <Input
                  id="wikipedia"
                  placeholder="Enter your Wikipedia link"
                  {...field}
                />
                <FormMessage placeholder={field.name} />
              </div>
            )}
          />
          <div className="flex w-full justify-end">
            <Button
              onClick={() =>
                updateProfile({
                  artist_name: form.getValues('artist_name'),
                  handle: form.getValues('handle'),
                  artist_bio: form.getValues('artist_bio'),
                  facebook: form.getValues('facebook'),
                  instagram: form.getValues('instagram'),
                  twitter: form.getValues('twitter'),
                  wikipedia: form.getValues('wikipedia')
                })
              }
              type="submit"
              className="mr-0 w-1/3"
            >
              Update Links
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
