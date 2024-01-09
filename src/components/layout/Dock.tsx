'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import {
  MotionValue,
  motion,
  useMotionValue,
  AnimatePresence,
  useSpring,
  useTransform
} from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  GalleryVerticalEnd,
  Send,
  User,
  Share,
  Pencil,
  Copy
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

type Route = {
  label: string;
  icon: React.ComponentType<any>; // Adjust this based on the type of the icons
  href: string;
};

const mainRoutes = [
  {
    label: 'Share',
    icon: Share,
    href: '/about'
  },
  {
    label: 'Customize',
    icon: Pencil,
    href: '/customize'
  },
  {
    label: 'Account',
    icon: User,
    href: '/account'
  }
];

export default function Dock({ handle }: { handle: string }) {
  const initialY = 125; // Initial Y position for swipe-up animation
  const animationDelay = 1; // Delay in seconds for the animation to start

  const mouseX = useMotionValue(Infinity);

  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  // const share = useRouter();
  const base = `http://soundbit.io/${handle}`;

  const links = base;
  const copylink = (e: any) => {
    navigator.clipboard.writeText(links);
    toast('Link copied!', {
      description: 'Add to your socials and send to your fans.'
    });
  };

  return (
    <AnimatePresence>
      <motion.div className="mx-auto flex h-16 items-end gap-4 rounded-2xl border-[1px] border-white/5 bg-black/95 px-4 pb-3 drop-shadow-2xl backdrop-blur-sm hover:border-white/25">
        <Dialog>
          <DialogTrigger>
            {' '}
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <motion.div
                    ref={ref}
                    style={{ width }}
                    className="flex aspect-square w-10 items-center justify-center rounded-full border-[1px] border-white/5 bg-white/5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/100 hover:bg-black/95" // Apply flex properties for centering
                  >
                    <Share style={{ width: '50%', height: '50%' }} />
                  </motion.div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="rounded-3xl">
            <DialogHeader>
              {/* <DialogTitle>Share with the world</DialogTitle> */}
              <DialogDescription>
                <div className="mx-auto flex w-fit select-none items-center gap-2 rounded-3xl bg-white/5 px-6 py-4 text-center">
                  <p className="flex w-full items-center text-center text-2xl font-medium">
                    soundbit.io/<span className="text-white">{handle}</span>
                  </p>
                  <Copy
                    onClick={copylink}
                    size={20}
                    className="opacity-100 hover:opacity-60 active:opacity-80"
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/customize">
                <motion.div
                  ref={ref}
                  style={{ width }}
                  className="flex aspect-square w-10 items-center justify-center rounded-full border-[1px] border-white/5 bg-white/5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/100 hover:bg-black/95" // Apply flex properties for centering
                >
                  <Pencil style={{ width: '50%', height: '50%' }} />
                </motion.div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Customize</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/account">
                <motion.div
                  ref={ref}
                  style={{ width }}
                  className="flex aspect-square w-10 items-center justify-center rounded-full border-[1px] border-white/5 bg-white/5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/100 hover:bg-black/95" // Apply flex properties for centering
                >
                  <User style={{ width: '50%', height: '50%' }} />
                </motion.div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.div>
    </AnimatePresence>
  );
}

function AppIcon({ mouseX, route }: { mouseX: MotionValue; route: Route }) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthSync = useTransform(distance, [-150, 0, 150], [40, 100, 40]);
  let width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const IconComponent = route.icon;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger>
          <Link href={route.href}>
            <motion.div
              ref={ref}
              style={{ width }}
              className="flex aspect-square w-10 items-center justify-center rounded-full border-[1px] border-white/5 bg-white/5 text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/100 hover:bg-black/95" // Apply flex properties for centering
            >
              <IconComponent style={{ width: '50%', height: '50%' }} />
            </motion.div>
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{route.label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
