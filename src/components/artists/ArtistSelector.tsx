'use client';

import Image from 'next/image';

import { Button } from '@/src/components/ui/button';

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage
} from '@/src/components/ui/form';

import { User } from 'lucide-react';

import { redirect, useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

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
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(artistSchema)
  });

  useEffect(() => {
    form.setValue('id', selectedArtistId);
  }, [selectedArtistId, form]);

  const router = useRouter();

  const handleSubmit = async (data: any) => {
    setIsLoading(true);
    const formData = new FormData();
    for (const key of Object.keys(data)) {
      formData.append(key, data[key]);
    }

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with your actual async action
    onSubmit(formData);
    setIsLoading(false);
    form.reset();
  };

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
        { onConflict: 'user_id' }
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
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 text-center"
      >
        <FormLabel className="max-w-sm text-center font-grtsk-giga text-2xl font-bold">
          Select your Spotify profile
        </FormLabel>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist: any, index: number) => {
            const isSelected = artist.id === selectedArtistId;

            return (
              <FormItem
                className={`flex items-center space-x-3 space-y-0 `}
                key={index}
              >
                <FormControl>
                  <div
                    className={`${
                      isSelected ? 'bg-primary/25' : 'bg-primary/5'
                    } flex cursor-pointer flex-col gap-4 rounded-lg p-4 shadow-lg hover:bg-primary/10 active:bg-primary/25`}
                    onClick={() => setSelectedArtistId(artist.id)}
                  >
                    {artist.imageUrl ? (
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
                    ) : (
                      <div className="relative aspect-square h-[200px] w-[200px] overflow-hidden rounded-full bg-primary/5">
                        <User
                          size={96}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-foreground"
                        />
                      </div>
                    )}

                    <h3 className="line-clamp-1 text-center text-lg font-semibold">
                      {artist.name}
                    </h3>
                  </div>
                </FormControl>
              </FormItem>
            );
          })}
        </div>
        <input
          type="hidden"
          value={selectedArtistId}
          {...form.register('id')}
        />
        <Button onClick={getBio} type="submit">
          {isLoading ? 'Loading...' : 'Select Artist'}
        </Button>
      </form>
    </Form>
  );
};

export default ArtistSelector;
