import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';
import {
  searchArtistAlbums,
  searchArtistById,
  searchArtistTopTracks
} from '@/lib/spotify';

import { Separator } from '@/components/ui/separator';

import TopTrackCard from '@/components/tracks/TopTrackCard';
import ArtistDetails from '@/components/artists/ArtistDetails';
import AlbumCard from '@/components/tracks/AlbumCard';
import SingleCard from '@/components/tracks/SingleCard';
import CardGrid from '@/components/artists/CardGrid';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Dock from '@/components/layout/Dock';

export const revalidate = 0;

export default async function ArtistPage({ params }: { params: any }) {
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
      'artist_name, user_id, artist_id, artist_bio, instagram, facebook, twitter, wikipedia, view, avatar_url, cover_url, hide_branding, background_color, hidden_singles, hidden_albums, hidden_top_tracks'
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
  } else {
    notFound();
  }

  // const blurUrl = await dynamicBlurDataUrl(
  //   `(https://wiigbntntwayaoxtkrjv.supabase.co/storage/v1/object/public/covers/${artistSiteData[0].cover_url})`
  // );

  const hiddenAlbums = artistSiteData[0].hidden_albums || [];
  const hiddenSingles = artistSiteData[0].hidden_singles || [];
  const hiddenTopTracks = artistSiteData[0].hidden_top_tracks || [];

  // Filter out hidden albums
  const filteredAlbums = artistAlbumsData?.items?.filter(
    (album: any) => !hiddenAlbums.includes(album.id)
  );

  // Filter out hidden singles
  const filteredSingles = artistSinglesData?.items?.filter(
    (single: any) => !hiddenSingles.includes(single.id)
  );

  // Filter out hidden top tracks
  const filteredTopTracks = artistTopTracksData?.tracks?.filter(
    (track: any) => !hiddenTopTracks.includes(track.id)
  );

  return (
    <div
      className={`flex w-full px-4 py-8 lg:px-8 ${artistSiteData[0].background_color}`}
    >
      {userId === session?.user.id ? (
        <div className="fixed bottom-0 left-1/2 z-[999] mb-12 flex -translate-x-1/2 transform">
          <Dock handle={handle} />
        </div>
      ) : (
        ''
      )}
      <main
        className={`flex min-h-screen w-full flex-col items-start gap-8 pt-24`}
      >
        <ArtistDetails
          backgroundColor={artistSiteData[0].background_color}
          artistSiteData={artistSiteData[0]}
          artistData={artistData}
        />
        <div
          className={`mx-auto flex w-full flex-col gap-4 ${
            artistSiteData[0].background_color
          } ${
            artistSiteData[0].background_color === 'bg-[#DDDDDD]'
              ? 'text-black'
              : 'text-white'
          } md:w-[736px]`}
        >
          {filteredTopTracks && (
            <CardGrid artistSiteData={artistSiteData} title="Top Tracks">
              {filteredTopTracks?.map((track: any, index: number) => {
                return (
                  <TopTrackCard
                    backgroundColor={artistSiteData[0].background_color}
                    track={track}
                    key={index}
                    index={index}
                  />
                );
              })}
            </CardGrid>
          )}

          {filteredAlbums && (
            <CardGrid artistSiteData={artistSiteData} title="Albums">
              {filteredAlbums?.map((album: any, index: number) => (
                <AlbumCard
                  backgroundColor={artistSiteData[0].background_color}
                  key={album.id}
                  album={album}
                />
              ))}
            </CardGrid>
          )}

          {filteredSingles && (
            <CardGrid artistSiteData={artistSiteData} title="Singles">
              {filteredSingles.map((single: any, index: number) => (
                <SingleCard
                  backgroundColor={artistSiteData[0].background_color}
                  key={single.id}
                  single={single}
                />
              ))}
            </CardGrid>
          )}
        </div>
        {artistData && (
          <div
            className={`mx-auto flex flex-col gap-2 text-center ${
              artistSiteData[0].background_color === 'bg-[#DDDDDD]'
                ? 'text-black'
                : 'text-white'
            }`}
          >
            <p className="mx-auto text-sm uppercase">
              {artistData.name} © ALL RIGHTS RESERVED
            </p>
            {artistSiteData[0].hide_branding === false ? (
              <Link href="/">
                <p className="text-xs">
                  made with
                  <span className="pl-1 font-grtsk-giga font-bold">
                    soundbit.
                  </span>
                </p>
              </Link>
            ) : (
              ''
            )}
          </div>
        )}
      </main>
    </div>
  );
}
