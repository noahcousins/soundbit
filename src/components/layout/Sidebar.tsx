import SidebarContent from '@/components/layout/sidebar/SidebarContent';

import {
  Users2,
  ScrollText,
  Compass,
  Mic,
  Text,
  Settings,
  Gavel
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import UAPoliLogo from '../../public/uapoli-light.svg';

const topRoutes = [
  {
    label: 'Explore',
    icon: Compass,
    color: 'text-emerald-500',
    href: '/explore'
  }
];

const mainRoutes = [
  {
    label: 'Politicians',
    icon: Users2,
    href: '/politicians',
    color: 'text-sky-500'
  },
  {
    label: 'Statements',
    icon: Mic,
    href: '/statements',
    color: 'text-violet-500'
  },
  {
    label: 'Legislation',
    icon: ScrollText,
    color: 'text-pink-700',
    href: '/legislation'
  },
  {
    label: 'Hearings',
    icon: Gavel,
    color: 'text-orange-700',
    href: '/hearings'
  }
];

const bottomRoutes = [
  {
    label: 'About',
    icon: Text,
    color: 'text-emerald-500',
    href: '/about'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings'
  }
];

export default function Sidebar() {
  return (
    <div className="sticky top-0 z-30 hidden w-1/6 flex-col gap-4 bg-gradient-to-b from-white/5 to-transparent leading-none transition lg:flex">
      <div className="sticky top-0 flex flex-col justify-between">
        <Link className="cursor-pointer" href="/">
          <div className="z-50 cursor-pointer p-5">
            <Image
              priority
              alt="UAPoli logo"
              width={80}
              height={20.96}
              src={UAPoliLogo}
            />
          </div>
        </Link>
        <SidebarContent />
      </div>
    </div>
  );
}
