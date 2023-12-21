'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import Image from 'next/image';
import Link from 'next/link';
import SocialLinks from '@/components/artists/SocialLinks';

import { motion, AnimatePresence } from 'framer-motion';

export default function ArtistDetails({
  artistData,
  artistSiteData
}: {
  artistData: any;
  artistSiteData: any;
}) {
  let artistName = 'Unknown';
  let artistId = 'Unknown';
  let artistBio = 'Unknown';
  let artistInstagram = 'Unknown';
  let artistFacebook = 'Unknown';
  let artistTwitter = 'Unknown';
  let artistWikipedia = 'Unknown';
  let avatarUrl = 'Unknown';
  let coverUrl = 'Unknown';

  if (artistSiteData && artistSiteData.length > 0) {
    artistName = artistSiteData[0].artist_name;
    artistId = artistSiteData[0].artist_id;
    artistBio = artistSiteData[0].artist_bio;
    avatarUrl = artistSiteData[0].avatar_url;
    coverUrl = artistSiteData[0].cover_url;
    artistInstagram = artistSiteData[0].instagram;
    artistFacebook = artistSiteData[0].facebook;
    artistTwitter = artistSiteData[0].twitter;
    artistWikipedia = artistSiteData[0].wikipedia;
  }

  console.log(avatarUrl, coverUrl, 'imsmsmsdm');

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: { opacity: 0, scale: 0.95 }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const tagVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 // Stagger the animation of each tag
      }
    }),
    exit: { opacity: 0, y: -20 }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="border-gradient mx-auto rounded-2xl"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        exit="exit"
      >
        {artistData && (
          <div
            className="relative mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl p-8"
            style={{
              backgroundSize: coverUrl ? 'cover' : '',
              backgroundImage: coverUrl ? `url(${coverUrl})` : 'none'
            }}
          >
            <div className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl bg-gradient-to-t from-black to-transparent filter"></div>
            <div className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl backdrop-blur-2xl"></div>

            <div className="relative z-10 mx-auto flex flex-col gap-4 lg:flex-row">
              <div
                className="absolute -top-8 left-1/2 aspect-square h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-8 border-black drop-shadow-md"
                style={{ overflow: 'hidden', height: '200px' }}
              >
                <Image
                  className="image-no-drag"
                  src={avatarUrl}
                  alt="Image"
                  fill={true}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-4 pt-20">
                <div className="mx-auto flex flex-col gap-2 text-center">
                  <Link
                    href={artistData.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <p className="scale-y-75 text-4xl font-extrabold uppercase drop-shadow-lg">
                      {artistData.name}
                    </p>
                  </Link>{' '}
                  <SocialLinks
                    artistInstagram={artistInstagram}
                    artistFacebook={artistFacebook}
                    artistTwitter={artistTwitter}
                    artistWikipedia={artistWikipedia}
                  />
                </div>

                <Dialog>
                  <DialogTrigger className="text-left">
                    <div className="flex w-full items-center justify-between">
                      <p className="line-clamp-6 max-w-2xl font-extralight">
                        {artistBio}
                      </p>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="h-[500px] max-h-screen overflow-y-scroll">
                    <DialogHeader>
                      <div className="flex w-full items-center justify-between">
                        <p className="font-extralight">{artistBio}</p>
                      </div>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <div className="z-10 mx-auto flex gap-2">
              {artistData.genres.map((genre: any, index: number) => (
                <motion.div
                  key={index}
                  className="line-clamp-1 w-fit rounded-sm bg-white/20 px-2 py-1 text-xs backdrop-blur-2xl transition-transform duration-100 ease-in-out hover:bg-white/40 active:scale-105 active:bg-white/50"
                  variants={tagVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  custom={index} // Pass the index to the variant
                >
                  <span className="line-clamp-1"> {genre}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
