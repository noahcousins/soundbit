'use server';

import { searchSpotifyByArtist } from '@/src/lib/spotify';

export async function searchArtist(formData: FormData) {
  const name = formData.get('name') as string;

  const artistResults = await searchSpotifyByArtist(name, 10, 0);
  const data = await artistResults.json();

  const artistNames = [data.artists.items[0].name, data.artists.items[1].name];

  return artistNames;
}
