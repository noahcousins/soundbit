'use server';

import { searchSpotifyByArtist } from '@/lib/spotify';

export async function searchArtist(formData: FormData) {
  // Extract all the fields from the formData
  const name = formData.get('name') as string;

  const artistResults = await searchSpotifyByArtist(name, 10, 0);
  const data = await artistResults.json(); // Parse the response body as JSON

  const artistNames = [data.artists.items[0].name, data.artists.items[1].name];

  return artistNames;
}
