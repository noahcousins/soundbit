'use client';

import Avatar from '@/components/forms/AvatarWidget';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription
} from '@/components/ui/form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { createBrowserClient } from '@supabase/ssr';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { toast } from 'sonner';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Cover from './CoverWidget';
import { Checkbox } from '../../../components/ui/checkbox';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Textarea } from '../ui/textarea';

export default function CustomizeForm({
  session,
  initialFormData,
  defaultMusicTabValue,
  artistTopTracksData,
  artistAlbumsData,
  artistSinglesData
}: {
  session: any;
  initialFormData: any;
  defaultMusicTabValue: any;
  artistTopTracksData: any;
  artistAlbumsData: any;
  artistSinglesData: any;
}) {
  const colorOptions = [
    'bg-[#DDDDDD]',
    'bg-[#111111]',
    'bg-[#B60708]',
    'bg-[#B4530A]',
    'bg-[#4D7C0F]',
    'bg-[#047857]',
    'bg-[#1C4ED8]',
    'bg-[#0568A0]',
    'bg-[#6D27D9]',
    'bg-[#7E22CD]',
    'bg-[#A21CAF]',
    'bg-[#BD123B]'
  ];

  const profileSchema = z.object({
    handle: z.string().min(1, 'handle is required'),
    artist_bio: z.string().min(1, 'bio is required').optional(),
    artist_name: z.string().min(1, 'Full Name is required'),
    avatar_url: z.string().url({ message: 'Invalid URL format' }).optional(),
    facebook: z.string().url({ message: 'Invalid URL format' }).optional(),
    instagram: z.string().url({ message: 'Invalid URL format' }).optional(),
    twitter: z.string().url({ message: 'Invalid URL format' }).optional(),
    wikipedia: z.string().url({ message: 'Invalid URL format' }).optional(),
    hide_branding: z.boolean().optional(),
    background_color: z.string().optional(),
    view: z.enum(['top_tracks', 'catalog', 'both']).default('top_tracks'),
    hidden_singles: z.array(z.string()).default([]),
    hidden_albums: z.array(z.string()).default([]),
    hidden_top_tracks: z.array(z.string()).default([])
  });

  const form = useForm({
    resolver: zodResolver(profileSchema)
  });

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [loading, setLoading] = useState(true);
  const [subscriptionActive, setSubscriptionActive] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const user = session?.user;

  async function hasActiveSubscription(userId: any) {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('status')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error checking subscription status', error);
      return false;
    }

    return data?.status === 'active';
  }

  useEffect(() => {
    async function fetchSubscriptionStatus() {
      const isActiveSubscription = await hasActiveSubscription(user?.id);
      setSubscriptionActive(isActiveSubscription);
    }

    fetchSubscriptionStatus();
  }, [user]);

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
        form.setValue('hide_branding', initialFormData.hide_branding);
        form.setValue('background_color', initialFormData.background_color);
        form.setValue('view', initialFormData.view);
        form.setValue('hidden_singles', initialFormData.hidden_singles);
        form.setValue('hidden_albums', initialFormData.hidden_albums);
        form.setValue('hidden_top_tracks', initialFormData.hidden_top_tracks);
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
            avatar_url: form.watch('avatar_url'),
            cover_url: form.watch('cover_url'),
            facebook: formData.facebook,
            instagram: formData.instagram,
            twitter: formData.twitter,
            wikipedia: formData.wikipedia,
            hide_branding: formData.hide_branding,
            background_color: formData.background_color,
            view: formData.view,
            hidden_singles: formData.hidden_singles,
            hidden_albums: formData.hidden_albums,
            hidden_top_tracks: formData.hidden_top_tracks
          },
          { onConflict: 'user_id' }
        )
        .select();

      if (error) throw error;
      toast('Changes saved!', {
        description: 'Your profile has been updated.'
      });
    } catch (error) {
      toast('Error!', {
        description: 'There was an issue updating your profile.'
      });
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = form.handleSubmit((data) => {
    updateProfile(data);
  });

  return (
    <div className="relative">
      {showForm && (
        <Button onClick={() => setShowForm(false)} className="mx-auto w-fit">
          Hide
        </Button>
      )}
      <div className={`${showForm || 'hidden sm:block'}`}>
        <Form {...form}>
          <form
            className="mx-auto flex w-full flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <Button
              onClick={() =>
                updateProfile({
                  artist_name: form.getValues('artist_name'),
                  handle: form.getValues('handle'),
                  artist_bio: form.getValues('artist_bio'),
                  facebook: form.getValues('facebook'),
                  instagram: form.getValues('instagram'),
                  twitter: form.getValues('twitter'),
                  wikipedia: form.getValues('wikipedia'),
                  hide_branding: form.getValues('hide_branding'),
                  background_color: form.getValues('background_color'),
                  view: form.getValues('view'),
                  hidden_singles: form.getValues('hidden_singles'),
                  hidden_albums: form.getValues('hidden_albums'),
                  hidden_top_tracks: form.getValues('hidden_top_tracks')
                })
              }
              type="submit"
              className="mx-auto w-fit"
            >
              Save Changes
            </Button>
            <Tabs
              defaultValue="general"
              className="mx-auto flex w-full flex-col gap-4"
            >
              <TabsList className="mx-auto">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="layout">Layout</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
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
                      <label htmlFor="handle">Handle</label>
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
                      <label htmlFor="artist_bio">Bio</label>
                      <Textarea
                        id="artist_bio"
                        placeholder="Tell us a little bit about yourself"
                        className="h-48"
                        {...field}
                      />
                      <FormMessage placeholder={field.name} />
                    </div>
                  )}
                />
              </TabsContent>
              <TabsContent className="flex flex-col gap-8" value="layout">
                {/* <Tabs
              defaultValue="default"
              className="mx-auto flex w-[400px] flex-col"
            >
              <TabsList className="mx-auto">
                <TabsTrigger disabled value="default">
                  Default
                </TabsTrigger>
                <TabsTrigger disabled value="modern">
                  Modern
                </TabsTrigger>
                <TabsTrigger disabled value="underground">
                  Underground
                </TabsTrigger>
              </TabsList>
            </Tabs> */}

                <FormField
                  control={form.control}
                  name="hide_branding"
                  render={({ field }) => (
                    <div className="mx-auto flex flex-col">
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md drop-shadow">
                        <FormControl>
                          <Checkbox
                            checked={subscriptionActive ? field.value : false}
                            onCheckedChange={
                              subscriptionActive ? field.onChange : undefined
                            }
                            disabled={!subscriptionActive}
                          />
                        </FormControl>

                        <div className="leading-none">
                          <FormLabel>
                            <span className="font-grtsk-giga text-sm font-bold">
                              soundbit.
                            </span>
                          </FormLabel>
                          <FormDescription>
                            Toggle to hide
                            <span className="px-1 font-grtsk-giga text-xs font-bold">
                              soundbit.
                            </span>
                            branding in your profile.
                          </FormDescription>
                        </div>
                      </FormItem>
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="background_color"
                  render={({ field }) => (
                    <div className="">
                      {/* <label htmlFor="background_color">Background Color</label> */}
                      <ToggleGroup
                        type="single"
                        size="sm"
                        className="flex gap-1"
                        value={field.value}
                        onValueChange={(value) =>
                          form.setValue('background_color', value)
                        }
                      >
                        {colorOptions.map((color) => (
                          <ToggleGroupItem
                            key={color}
                            value={color}
                            className="rounded-full"
                            aria-label={`Toggle ${color}`}
                          >
                            <div
                              className={`h-4 w-4 ${color} rounded-full`}
                            ></div>
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                      <FormMessage placeholder={field.name} />
                    </div>
                  )}
                />
              </TabsContent>
              <TabsContent value="music">
                <FormField
                  control={form.control}
                  name="view"
                  render={({ field }) => (
                    <div>
                      <ToggleGroup
                        type="single"
                        size="sm"
                        value={field.value}
                        onValueChange={(value) => form.setValue('view', value)}
                      >
                        {['top_tracks', 'catalog', 'both'].map((view) => (
                          <ToggleGroupItem
                            key={view}
                            value={view}
                            aria-label={`Toggle ${view}`}
                          >
                            {view === 'top_tracks' && 'Top Tracks'}
                            {view === 'catalog' && 'Catalog'}
                            {view === 'both' && 'Both'}
                          </ToggleGroupItem>
                        ))}
                      </ToggleGroup>
                      <FormMessage placeholder={field.name} />
                    </div>
                  )}
                />

                <Accordion type="single" collapsible>
                  <AccordionItem value="top tracks">
                    <AccordionTrigger>Top Tracks</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="hidden_top_tracks"
                        render={({ field }) => (
                          <ToggleGroup
                            className="flex flex-col"
                            type="multiple"
                            value={field.value || []} // Add a check here
                            onValueChange={(value) => field.onChange(value)}
                          >
                            {console.log(artistAlbumsData, 'albums')}

                            {artistTopTracksData.tracks.map((track: any) => (
                              <ToggleGroupItem
                                key={track.id}
                                value={track.id}
                                aria-label={`Toggle ${track.name}`}
                              >
                                {track.name}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />{' '}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="singles">
                    <AccordionTrigger>Singles</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="hidden_singles"
                        render={({ field }) => (
                          <ToggleGroup
                            className="flex flex-col"
                            type="multiple"
                            value={field.value || []} // Add a check here
                            onValueChange={(value) => field.onChange(value)}
                          >
                            {artistSinglesData.items.map((single: any) => (
                              <ToggleGroupItem
                                key={single.id}
                                value={single.id}
                                aria-label={`Toggle ${single.name}`}
                              >
                                {single.name}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="albums">
                    <AccordionTrigger>Albums</AccordionTrigger>
                    <AccordionContent>
                      <FormField
                        control={form.control}
                        name="hidden_albums"
                        render={({ field }) => (
                          <ToggleGroup
                            className="flex flex-col"
                            type="multiple"
                            value={field.value || []} // Add a check here
                            onValueChange={(value) => field.onChange(value)}
                          >
                            {artistAlbumsData.items.map((album: any) => (
                              <ToggleGroupItem
                                key={album.id}
                                value={album.id}
                                aria-label={`Toggle ${album.name}`}
                              >
                                {album.name}
                              </ToggleGroupItem>
                            ))}
                          </ToggleGroup>
                        )}
                      />{' '}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
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
      </div>
      {!showForm && (
        <div className="sm:hidden">
          <Button onClick={() => setShowForm(true)} className="mx-auto w-fit">
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
}
