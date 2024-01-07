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
import { dynamicBlurDataUrl } from '../util/dynamicBlurDataUrl';

export default async function ArtistDetails({
  artistData,
  artistSiteData,
  backgroundColor
}: {
  artistData: any;
  artistSiteData: any;
  backgroundColor: string;
}) {
  console.log(artistSiteData, 'this what we need');

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

  const blurUrl = await dynamicBlurDataUrl(
    `(https://wiigbntntwayaoxtkrjv.supabase.co/storage/v1/object/public/covers/${artistSiteData[0].cover_url})`
  );

  if (artistSiteData.length > 0 && artistSiteData[0].artist_id) {
    return (
      <AnimatePresence>
        <motion.div
          className="border-gradient mx-auto rounded-2xl text-white"
          variants={containerVariants}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          {artistSiteData?.[0] && (
            <div
              className="relative mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl p-8"
              style={{
                backgroundSize: artistSiteData[0].cover_url ? 'cover' : '',
                backgroundImage: artistSiteData[0].cover_url
                  ? `url(https://wiigbntntwayaoxtkrjv.supabase.co/storage/v1/object/public/covers/${artistSiteData[0].cover_url})`
                  : 'none'
              }}
            >
              <div className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl bg-gradient-to-t from-black to-transparent filter"></div>
              <div className="absolute left-0 top-0 z-0 h-full w-full rounded-2xl backdrop-blur-2xl"></div>

              <div className="relative z-10 mx-auto flex flex-col gap-4 lg:flex-row">
                <div
                  className={`absolute -top-8 left-1/2 aspect-square h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 items-center rounded-full border-8 ${backgroundColor} border-transparent drop-shadow-md`}
                  style={{ overflow: 'hidden', height: '200px' }}
                >
                  {artistSiteData[0].avatar_url && (
                    <Image
                      className="image-no-drag"
                      src={`https://wiigbntntwayaoxtkrjv.supabase.co/storage/v1/object/public/avatars/${artistSiteData[0].avatar_url}`}
                      alt="Image"
                      fill={true}
                      placeholder="blur"
                      blurDataURL={blurUrl}
                      style={{ objectFit: 'cover' }}
                    />
                  )}
                </div>
                <div className="flex w-full flex-col items-center gap-4 pt-20">
                  <div className="mx-auto flex flex-col gap-4 text-center">
                    <Link
                      href={artistData.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="font-grtsk-giga text-4xl font-extrabold uppercase drop-shadow-lg">
                        {artistData.name}
                      </p>
                    </Link>{' '}
                    <SocialLinks
                      artistInstagram={artistSiteData[0].instagram}
                      artistFacebook={artistSiteData[0].facebook}
                      artistTwitter={artistSiteData[0].twitter}
                      artistWikipedia={artistSiteData[0].wikipedia}
                    />
                  </div>

                  <Dialog>
                    <DialogTrigger className="text-left">
                      <div className="flex w-full items-center justify-between">
                        <p className="line-clamp-6 max-w-2xl font-extralight tracking-tight">
                          {artistSiteData[0].artist_bio}
                        </p>
                      </div>
                    </DialogTrigger>
                    <DialogContent className="h-[500px] max-h-screen overflow-y-scroll">
                      <DialogHeader>
                        <div className="flex w-full items-center justify-between tracking-tight">
                          <p className="font-extralight">
                            {artistSiteData[0].artist_bio}
                          </p>
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
                    custom={index}
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
}
