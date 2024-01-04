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

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Cover from './CoverWidget';

const profileSchema = z.object({
  handle: z.string().min(1, 'handle is required'),
  artist_bio: z.string().min(1, 'bio is required').optional(),
  artist_name: z.string().min(1, 'Full Name is required'),
  avatar_url: z.string().url({ message: 'Invalid URL format' }).optional(),
  facebook: z.string().url({ message: 'Invalid URL format' }).optional(),
  instagram: z.string().url({ message: 'Invalid URL format' }).optional(),
  twitter: z.string().url({ message: 'Invalid URL format' }).optional(),
  wikipedia: z.string().url({ message: 'Invalid URL format' }).optional()
});

export default function CustomizeForm({
  session,
  initialFormData,
  defaultMusicTabValue
}: {
  session: any;
  initialFormData: any;
  defaultMusicTabValue: any;
}) {
  console.log(initialFormData, 'dkdkdkkd11111');
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
        form.setValue('handle', initialFormData.handle);
        form.setValue('artist_bio', initialFormData.artist_bio);
        form.setValue('artist_name', initialFormData.artist_name);
        form.setValue('avatar_url', initialFormData.avatar_url);
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

      const { error } = await supabase
        .from('sites')
        .upsert(
          {
            user_id: user?.id,
            artist_name: formData.artist_name,
            handle: formData.handle,
            artist_bio: formData.artist_bio,
            avatar_url: form.watch('avatar_url'), // Retain the existing avatar_url
            cover_url: form.watch('cover_url'), // Retain the existing avatar_url
            // updated_at: new Date().toISOString(),
            facebook: formData.facebook,
            instagram: formData.instagram,
            twitter: formData.twitter,
            wikipedia: formData.wikipedia
          },
          { onConflict: 'user_id' }
        )
        .select();

      if (error) throw error;
      toast({
        title: 'Updated',
        description: 'Your profile has been updated.'
      });
    } catch (error) {
      console.log('ahhhhh fahk', error);
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Error updating your profile@@@@.'
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
      <form className="mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
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
          className="mx-auto w-fit"
        >
          Update Profile
        </Button>
        <Tabs
          defaultValue="general"
          className="mx-auto flex w-full flex-col gap-4"
        >
          <TabsList className="mx-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger disabled value="theme">
              Theme
            </TabsTrigger>
            <TabsTrigger disabled value="music">
              Music
            </TabsTrigger>
            <TabsTrigger value="links">Links</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <div className="flex flex-col items-center gap-8 md:flex-row">
              <Avatar
                uid={user.id}
                url={initialFormData.avatar_url}
                size={150}
                onUpload={(url: string) => {
                  form.setValue('avatar_url', url);
                  updateProfile({
                    artist_name: form.getValues('artist_name'),
                    handle: form.getValues('handle'),
                    artist_bio: form.getValues('artist_bio'),
                    avatar_url: url,
                    facebook: form.getValues('facebook'),
                    instagram: form.getValues('instagram'),
                    twitter: form.getValues('twitter'),
                    wikipedia: form.getValues('wikipedia')
                  });
                }}
              />

              <Cover
                uid={user.id}
                url={initialFormData.cover_url}
                size={150}
                onUpload={(url: string) => {
                  form.setValue('cover_url', url);
                  updateProfile({
                    artist_name: form.getValues('artist_name'),
                    handle: form.getValues('handle'),
                    artist_bio: form.getValues('artist_bio'),
                    cover_url: url,
                    facebook: form.getValues('facebook'),
                    instagram: form.getValues('instagram'),
                    twitter: form.getValues('twitter'),
                    wikipedia: form.getValues('wikipedia')
                  });
                }}
              />
            </div>

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
              name="artist_name"
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
              name="handle"
              render={({ field }) => (
                <div>
                  <label htmlFor="handle">handle</label>
                  <Input
                    id="handle"
                    placeholder="Enter your handle"
                    {...field}
                  />
                  <FormMessage placeholder={field.name} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="artist_bio"
              render={({ field }) => (
                <div>
                  <label htmlFor="artist_bio">artist_bio</label>
                  <Input
                    id="artist_bio"
                    placeholder="Enter your artist bio"
                    {...field}
                  />
                  <FormMessage placeholder={field.name} />
                </div>
              )}
            />
          </TabsContent>
          <TabsContent value="theme">
            <Tabs defaultValue="default" className="flex w-[400px] flex-col">
              <TabsList className="mx-auto">
                <TabsTrigger value="default">Default</TabsTrigger>
                <TabsTrigger value="modern">Modern</TabsTrigger>
                <TabsTrigger value="underground">Underground</TabsTrigger>
              </TabsList>
              <TabsContent value="general"></TabsContent>
              <TabsContent value="theme">
                Change your password here.
              </TabsContent>
              <TabsContent value="theme">
                Change your password here.
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent value="music">
            <Tabs defaultValue="default" className="flex w-[400px] flex-col">
              <TabsList className="mx-auto">
                <TabsTrigger value="catalog">Catalog</TabsTrigger>
                <TabsTrigger value="top_tracks">Top Tracks</TabsTrigger>
                <TabsTrigger disabled value="both">
                  Both
                </TabsTrigger>
              </TabsList>
              <TabsContent value="general"></TabsContent>
              <TabsContent value="theme">
                Change your password here.
              </TabsContent>
              <TabsContent value="theme">
                Change your password here.
              </TabsContent>
            </Tabs>
          </TabsContent>
          <TabsContent className="flex flex-col gap-4" value="links">
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
          </TabsContent>
        </Tabs>
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-end"></div>
        </div>
        {/* </ScrollArea> */}
      </form>
    </Form>
  );
}
