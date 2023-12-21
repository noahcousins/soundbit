import { motion } from 'framer-motion';
import { AiFillInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { TiSocialFacebook } from 'react-icons/ti';
import { SiWikipedia } from 'react-icons/si';
import Link from 'next/link';

export default function SocialLinks({
  artistInstagram,
  artistFacebook,
  artistTwitter,
  artistWikipedia
}: {
  artistInstagram: string;
  artistFacebook: string;
  artistTwitter: string;
  artistWikipedia: string;
}) {
  // Animation variants for each icon link
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1
      }
    }),
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      className="mx-auto flex gap-2"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      {artistInstagram && (
        <motion.div variants={itemVariants} custom={0}>
          <Link
            href={artistInstagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram
              className="scale-100 cursor-pointer opacity-100 transition-all duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-60"
              size={24}
            />
          </Link>
        </motion.div>
      )}

      {artistFacebook && (
        <motion.div variants={itemVariants} custom={1}>
          <Link href={artistFacebook} target="_blank" rel="noopener noreferrer">
            <TiSocialFacebook
              className="scale-100 cursor-pointer opacity-100 transition-all duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-60"
              size={24}
            />
          </Link>
        </motion.div>
      )}

      {artistTwitter && (
        <motion.div variants={itemVariants} custom={2}>
          <Link href={artistTwitter} target="_blank" rel="noopener noreferrer">
            <AiOutlineTwitter
              className="scale-100 cursor-pointer opacity-100 transition-all duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-60"
              size={24}
            />
          </Link>
        </motion.div>
      )}

      {artistWikipedia && (
        <motion.div variants={itemVariants} custom={3}>
          <Link
            href={artistWikipedia}
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiWikipedia
              className="scale-100 cursor-pointer opacity-100 transition-all duration-100 ease-in-out hover:scale-105 hover:opacity-90 active:opacity-60"
              size={24}
            />
          </Link>
        </motion.div>
      )}
    </motion.div>
  );
}
