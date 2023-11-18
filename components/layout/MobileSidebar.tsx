import ModeToggle from '@/components/ModeToggle';
import NavLink from '@/components/layout/NavLink';
import SidebarAuthButtons from '@/components/layout/SidebarAuthButtons';
import SignOutButton from '@/components/layout/SignOutButton';
import SidebarContent from '@/components/layout/sidebar/SidebarContent';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
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

export default function MobileSidebar() {
  // console.log("Check for cookie", sessionUser);

  return (
    <Sheet>
      <SheetTrigger>
        <Menu size={24} />
      </SheetTrigger>
      <SheetContent className="w-[300px]" side={'left'}>
        <SheetHeader>
          <Link href="/">
            <Image
              priority
              alt="UAPoli logo"
              width={80}
              height={20.96}
              src={UAPoliLogo}
            />
          </Link>
          <SidebarContent />

          {/* <SheetTitle>Are you sure absolutely sure?</SheetTitle> */}
          {/* <SheetDescription>
          </SheetDescription> */}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
