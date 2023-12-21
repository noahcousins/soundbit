import ArtistInput from '@/components/artists/ArtistInput';
import { useState } from 'react';

import { searchArtist } from '@/app/actions';
import { searchSpotifyByArtist } from '@/lib/spotify';

// Replace with the correct path to your form

export default function ArtistSection() {
  const searchArtist = async (formData: FormData) => {
    'use server';

    const name = formData.get('name') as string;

    const artistResults = await searchSpotifyByArtist(name, 10, 0);

    const data = await artistResults.json(); // Parse the response body as JSON

    // const artistNames = [
    //   data.artists.items[0].name,
    //   data.artists.items[1].name
    // ];

    // console.log(artistNames);

    return (
      <div className="mx-auto my-24 w-1/2">
        <h1>Add Politician</h1>
        <ArtistInput onSubmit={searchArtist} />
      </div>
    );
  };
}
