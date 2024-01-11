import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/app/supabase-server';

import { Separator } from '@/components/ui/separator';

import TopTrackCard from '@/components/tracks/TopTrackCard';
import ArtistDetails from '@/components/artists/ArtistDetails';
import AlbumCard from '@/components/tracks/AlbumCard';
import SingleCard from '@/components/tracks/SingleCard';
import CardGrid from '@/components/artists/CardGrid';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export default async function ArtistPage({
  handle,
  artistSiteData,
  artistSpotifyData
}: {
  handle: any;
  artistSiteData: any;
  artistSpotifyData: any;
}) {
  return (
    <div
      className={`flex w-full px-4 py-8 lg:px-8 ${artistSiteData.background_color}`}
    >
      <main
        className={`flex min-h-screen w-full flex-col items-start gap-8 pt-24`}
      >
        <ArtistDetails
          backgroundColor={artistSiteData.background_color}
          artistSiteData={artistSiteData}
          artistData={artistSpotifyData}
        />
        <div
          className={`mx-auto flex w-full flex-col gap-4 ${
            artistSiteData.background_color
          } ${
            artistSiteData.background_color === 'bg-[#DDDDDD]'
              ? 'text-black'
              : 'text-white'
          } md:w-[736px]`}
        >
          {/* {artistTopTracksData && (
            <CardGrid artistSiteData={artistSiteData} title="Top Tracks">
              {artistTopTracksData?.tracks?.map((track: any, index: number) => {
                return (
                  <TopTrackCard
                    backgroundColor={artistSiteData.background_color}
                    track={track}
                    key={index}
                    index={index}
                  />
                );
              })}
            </CardGrid>
          )}

          {artistAlbumsData && (
            <>
              <Separator
                className={`${
                  artistSiteData.background_color === 'bg-[#DDDDDD]'
                    ? 'bg-black/50'
                    : 'bg-white/50'
                }`}
              />

              <CardGrid artistSiteData={artistSiteData} title="Albums">
                {artistAlbumsData?.items?.map((album: any, index: number) => (
                  <AlbumCard
                    backgroundColor={artistSiteData.background_color}
                    key={album.id}
                    album={album}
                  />
                ))}
              </CardGrid>
            </>
          )}

          {artistSinglesData && (
            <>
              <Separator
                className={`${
                  artistSiteData.background_color === 'bg-[#DDDDDD]'
                    ? 'bg-black/50'
                    : 'bg-white/50'
                }`}
              />
              <CardGrid artistSiteData={artistSiteData} title="Albums">
                {artistSinglesData.items.map((single: any, index: number) => (
                  <SingleCard
                    backgroundColor={artistSiteData.background_color}
                    key={single.id}
                    single={single}
                  />
                ))}
              </CardGrid>
            </>
          )} */}
        </div>
        {artistSpotifyData && (
          <div
            className={`mx-auto flex flex-col gap-2 text-center ${
              artistSiteData.background_color === 'bg-[#DDDDDD]'
                ? 'text-black'
                : 'text-white'
            }`}
          >
            <p className="mx-auto text-sm uppercase">
              {artistSpotifyData.name} © ALL RIGHTS RESERVED
            </p>
            {artistSiteData.hide_branding === false ? (
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
