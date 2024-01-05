import { searchArtistAlbums, searchArtistById } from '@/src/lib/spotify';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getSession } from '@/src/app/supabase-server';

async function getBio(req: NextRequest, res: NextApiResponse) {
  const searchParams = req.nextUrl.searchParams;
  const artistId = searchParams.get('artistId');

  if (!artistId || typeof artistId !== 'string') {
    res.status(400).json({ error: 'Invalid or missing artistId' });
    return;
  }

  try {
    const response = await fetch(`https://open.spotify.com/artist/${artistId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const artistDetails = await searchArtistById(artistId);
    const artistData = await artistDetails.json();

    const albumFilters = {
      includeGroups: 'album',
      market: 'US',
      limit: 50,
      offset: 0
    };

    const artistAlbums = await searchArtistAlbums({
      artistId,
      ...albumFilters
    });

    let artistAlbumsData;

    artistAlbumsData = await artistAlbums.json();

    const albumImageUrl = artistAlbumsData?.items[0].images[0].url;

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

    const avatarUrl = artistData.images[0].url;
    const blob1 = await fetch(avatarUrl).then((r) => r.blob());
    const blob2 = await fetch(albumImageUrl).then((r) => r.blob());

    const timestamp = new Date().toISOString();

    const userId = session?.user.id;
    if (!userId) {
      throw new Error('User ID is not available');
    }

    // Upload avatar with a unique file name
    await supabase.storage
      .from('avatars')
      .upload(`${userId}_${timestamp}.jpg`, blob1);

    // Upload cover with a unique file name
    await supabase.storage
      .from('covers')
      .upload(`${userId}_${timestamp}.jpg`, blob2);

    const { data: avatarData } = supabase.storage
      .from('avatars')
      .getPublicUrl(`${userId}_${timestamp}` + '.jpg');

    const { data: coverData } = supabase.storage
      .from('covers')
      .getPublicUrl(`${userId}_${timestamp}` + '.jpg');

    const reformatUrl = function (url: string) {
      const parts = url.split('/');
      parts.splice(parts.length - 1, 0, 'public');

      const fullPath = parts.join('/');
      const pathSegments = fullPath.split('/');
      const path = pathSegments[pathSegments.length - 1];

      return path;
    };

    const avatarNewUrl = avatarData.publicUrl;
    const coverUrl = coverData.publicUrl;

    const formattedAvatarUrl = reformatUrl(avatarNewUrl);
    const formattedCoverUrl = reformatUrl(coverUrl);

    console.log(formattedAvatarUrl, formattedCoverUrl, 'owowoow');

    await supabase
      .from('sites')
      .update({
        avatar_url: formattedAvatarUrl,
        cover_url: formattedCoverUrl
      })
      .eq('user_id', session?.user.id);

    const html = await response.text();

    const startMarker =
      'class="Type__TypeElement-sc-goli3j-0 gLgnHU G_f5DJd2sgHWeto5cwbi" data-encore-id="type">';
    const endMarker = '</span>';
    const startIndex = html.indexOf(startMarker);
    const endIndex = html.indexOf(endMarker, startIndex + startMarker.length);
    const extractedBioHtml =
      startIndex !== -1 && endIndex !== -1
        ? html.slice(startIndex + startMarker.length, endIndex)
        : null;

    const bioTextOnly = extractedBioHtml?.replace(/<[^>]*>/g, '');

    const bioTextDecoded = bioTextOnly
      ?.replace(/&quot;/g, '"')
      .replace(/&#x27;/g, "'")
      .replace(/&amp;/g, '&');

    const facebookRegex = /href="(https:\/\/facebook.com\/[^"]+)"/;
    const instagramRegex = /href="(https:\/\/instagram.com\/[^"]+)"/;
    const twitterRegex = /href="(https:\/\/twitter.com\/[^"]+)"/;
    const wikipediaRegex = /href="(https:\/\/en.wikipedia.org\/wiki\/[^"]+)"/;

    const facebookLink = facebookRegex.exec(html)?.[1];
    const instagramLink = instagramRegex.exec(html)?.[1];
    const twitterLink = twitterRegex.exec(html)?.[1];
    const wikipediaLink = wikipediaRegex.exec(html)?.[1];

    const responseContent = {
      bio: bioTextDecoded,
      socialMediaLinks: {
        facebook: facebookLink,
        instagram: instagramLink,
        twitter: twitterLink,
        wikipedia: wikipediaLink
      }
    };

    return Response.json({ responseContent });
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { getBio as GET };
