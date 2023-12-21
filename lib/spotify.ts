//@ts-nocheck

const getAccessToken = async () => {
  const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token
    })
  });

  return response.json();
};

export const searchSpotifyByArtist = async (
  artistName,
  limit = 20,
  offset = 0
) => {
  const { access_token } = await getAccessToken();

  const queryParams = new URLSearchParams({
    q: `artist:"${artistName}"`,
    type: 'artist', // Search only for artists
    limit: limit.toString(),
    offset: offset.toString()
  });

  const url = `https://api.spotify.com/v1/search?${queryParams.toString()}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const searchArtistById = async (artistId) => {
  const { access_token } = await getAccessToken(); // Assuming you have a function to get the access token

  const url = `https://api.spotify.com/v1/artists/${artistId}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const searchArtistAlbums = async ({
  artistId,
  includeGroups = 'album',
  market = '',
  limit = 20,
  offset = 0
}) => {
  const { access_token } = await getAccessToken(); // Assuming you have a function to get the access token

  // Construct the URL with query parameters
  const queryParams = new URLSearchParams({
    include_groups: includeGroups,
    market,
    limit: limit.toString(),
    offset: offset.toString()
  });

  const url = `https://api.spotify.com/v1/artists/${artistId}/albums?${queryParams.toString()}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};

export const searchArtistTopTracks = async ({ artistId, market = '' }) => {
  const { access_token } = await getAccessToken(); // Assuming you have a function to get the access token

  // Construct the URL with query parameters
  const queryParams = new URLSearchParams({
    market
  });

  const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?${queryParams.toString()}`;

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
