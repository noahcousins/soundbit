'use client';

import Image from 'next/image';

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
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Session } from '@supabase/supabase-js';

const artistSchema = z.object({
  id: z.string().min(1, 'Name is required')
});

const ArtistSelector = ({
  artistNameData,
  onSubmit,
  session
}: {
  artistNameData: any;
  onSubmit: Function;
  session: any;
}) => {
  const [selectedArtistId, setSelectedArtistId] = useState('');

  const form = useForm({
    resolver: zodResolver(artistSchema)
  });

  useEffect(() => {
    form.setValue('id', selectedArtistId);
  }, [selectedArtistId, form]);

  const router = useRouter();

  const handleSubmit = (data: any) => {
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }

    onSubmit(formData);
    form.reset();
  };

  if (!artistNameData || artistNameData.length === 0) {
    return <div>Error: No artist name found for the user.</div>;
  }

  const artists = artistNameData.map(
    (artist: { name: string; imageUrl: string; id: string }) => ({
      name: artist.name,
      imageUrl: artist.imageUrl,
      id: artist.id
    })
  );

  const getBio = async () => {
    try {
      const res = await fetch(`/api/get-bio?artistId=${selectedArtistId}`);

      if (!res.ok) {
        throw new Error('Failed to fetch bio');
      }

      const data = await res.json();
      console.log(data, 'bio');

      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { bio, socialMediaLinks } = data.responseContent;

      console.log(data, 'djdjdjdj');

      const { error } = await supabase.from('sites').upsert(
        {
          artist_bio: bio,
          user_id: session?.user.id,
          facebook: socialMediaLinks.facebook,
          instagram: socialMediaLinks.instagram,
          twitter: socialMediaLinks.twitter,
          wikipedia: socialMediaLinks.wikipedia
        },
        { onConflict: 'user_id' } // Specify the conflict target
      );

      if (error) {
        console.error('Error adding artist bio:', error);
      } else {
        console.log('Artist bio added');
      }
    } catch (error) {
      console.error('Error fetching bio:', error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist: any, index: number) => {
            return (
              <FormItem
                className="flex items-center space-x-3 space-y-0"
                key={index}
              >
                <FormControl>
                  <div
                    className="flex cursor-pointer flex-col gap-4 rounded-lg bg-primary/5 p-4 shadow-lg hover:bg-primary/10 active:bg-primary/25"
                    onClick={() => setSelectedArtistId(artist.id)}
                  >
                    <div
                      className="aspect-square h-[200px] w-[200px] rounded-full"
                      style={{
                        position: 'relative',
                        overflow: 'hidden',
                        height: '200px'
                      }}
                    >
                      <Image
                        src={artist.imageUrl}
                        alt="Image"
                        fill={true}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <h3 className="line-clamp-1 text-center text-lg font-semibold">
                      {artist.name}
                    </h3>
                  </div>
                </FormControl>
              </FormItem>
            );
          })}
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  className="hidden"
                  value={selectedArtistId}
                  placeholder="Artist's name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <input
          type="hidden"
          value={selectedArtistId}
          {...form.register('id')} // Register the hidden input for the artist ID
        />
        <Button onClick={getBio} type="submit">
          Select Artist
        </Button>
      </form>
    </Form>
  );
};

export default ArtistSelector;
