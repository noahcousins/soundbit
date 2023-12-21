import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';
import { Session } from '@supabase/supabase-js';
import {
  searchArtistAlbums,
  searchArtistById,
  searchArtistTopTracks
} from '@/lib/spotify';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';
import TestButton from '@/components/artists/TestButton';
import TopTrackCard from '@/components/tracks/TopTrackCard';
import ArtistDetails from '@/components/artists/ArtistDetails';
import AlbumCard from '@/components/tracks/AlbumCard';
import SingleCard from '@/components/tracks/SingleCard';
import CardGrid from '@/components/artists/CardGrid';
import AccountForm from '@/components/forms/AccountForm';

export const revalidate = 0;

export default async function Profile({ params }: { params: any }) {
  const { handle } = params;

  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );

  const session = await getSession();

  const { data, error } = await supabase
    .from('sites')
    .select(
      'artist_name, user_id, artist_id, artist_bio, instagram, facebook, twitter, wikipedia, view, avatar_url, cover_url'
    )
    .eq('handle', handle);

  const artistSiteData = data;

  let artistName = 'Unknown';
  let artistId = 'Unknown';
  let artistBio = 'Unknown';
  let userId = 'Unknown';
  let market = 'Unknown';

  if (artistSiteData && artistSiteData.length > 0) {
    artistName = artistSiteData[0].artist_name;
    artistId = artistSiteData[0].artist_id;
    artistBio = artistSiteData[0].artist_bio;
    userId = artistSiteData[0].user_id;
    market = 'US';
  }

  const artistDetails = await searchArtistById(artistId);

  const artistData = await artistDetails.json();

  const albumFilters = {
    includeGroups: 'album',
    market: 'US',
    limit: 50,
    offset: 0
  };

  const singleFilters = {
    includeGroups: 'single',
    market: 'US',
    limit: 50,
    offset: 0
  };

  let artistAlbumsData, artistSinglesData, artistTopTracksData;

  // Conditional checks based on the 'view' value
  if (artistSiteData && artistSiteData.length > 0) {
    const view = artistSiteData[0].view;

    if (view === 'top_tracks' || view === 'both') {
      const artistTopTracks = await searchArtistTopTracks({ artistId, market });
      artistTopTracksData = await artistTopTracks.json();
    }

    if (view === 'catalog' || view === 'both') {
      const artistAlbums = await searchArtistAlbums({
        artistId,
        ...albumFilters
      });
      const artistSingles = await searchArtistAlbums({
        artistId,
        ...singleFilters
      });

      artistAlbumsData = await artistAlbums.json();
      artistSinglesData = await artistSingles.json();
    }
  }

  const albumImageUrl = artistAlbumsData?.items[0].images[0].url;

  return (
    <main className="flex min-h-screen w-full flex-col items-start gap-8 pt-24">
      <ArtistDetails artistSiteData={artistSiteData} artistData={artistData} />
      <div className="mx-auto flex w-full flex-col gap-4 md:w-[736px]">
        {artistTopTracksData && (
          <CardGrid title="Top Tracks">
            {artistTopTracksData.tracks.map((track: any, index: number) => {
              return <TopTrackCard track={track} key={index} index={index} />;
            })}
          </CardGrid>
        )}

        <Separator className="" />

        {artistAlbumsData && (
          <CardGrid title="Albums">
            {artistAlbumsData.items.map((album: any, index: number) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </CardGrid>
        )}

        <Separator className="" />

        {artistSinglesData && (
          <CardGrid title="Albums">
            {artistSinglesData.items.map((single: any, index: number) => (
              <SingleCard key={single.id} single={single} />
            ))}
          </CardGrid>
        )}
      </div>
      {artistData && (
        <div className="mx-auto flex flex-col gap-2 text-center">
          <p className="mx-auto text-sm uppercase">
            {artistData.name} © ALL RIGHTS RESERVED
          </p>
          <p className="text-xs">
            made with <span className="font-bold">soundbit</span>
          </p>
        </div>
      )}
    </main>
  );
}
