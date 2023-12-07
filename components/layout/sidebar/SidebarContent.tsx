import ModeToggle from '@/components/ModeToggle';
import NavLink from '@/components/layout/NavLink';
import SidebarAuthButtons from '@/components/layout/SidebarAuthButtons';
import SignOutButton from '@/components/layout/SignOutButton';
import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Megaphone,
  Users2,
  ScrollText,
  Compass,
  Mic,
  Library,
  Blocks,
  Gavel,
  Info,
  Text,
  Settings
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const topMiddleRoutes = [
  {
    label: 'Outreach',
    icon: Megaphone,
    color: 'text-emerald-500',
    href: '/outreach'
  }
];

const topRoutes = [
  {
    label: 'Learn',
    icon: Library,
    color: 'text-emerald-500',
    href: '/learn'
  },
  {
    label: 'How to Use',
    icon: Blocks,
    color: 'text-emerald-500',
    href: '/how-to-use'
  },
  {
    label: 'About',
    icon: Info,
    color: 'text-emerald-500',
    href: '/about'
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
    label: 'Account',
    icon: Text,
    color: 'text-emerald-500',
    href: '/account'
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings'
  }
];

export default function SidebarContent() {
  return (
    <div className="flex flex-col justify-between p-0 lg:p-5">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Discover</AccordionTrigger>
          <AccordionContent>
            <div className="w-fit space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
              {topMiddleRoutes.map((route) => (
                <NavLink key={route.href} href={route.href}>
                  <div className="group flex w-36 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-[#9333ea]/10">
                    <route.icon stroke="#9333ea" size={20} className="mr-3" />
                    {route.label}
                  </div>
                </NavLink>
              ))}
            </div>
            <div className="w-fit space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
              {mainRoutes.map((route) => (
                <NavLink key={route.href} href={route.href}>
                  <div className="group flex w-36 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10">
                    <route.icon size={20} className="mr-3" />
                    {route.label}
                  </div>
                </NavLink>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>How it works</AccordionTrigger>
          <AccordionContent>
            <div className="w-fit space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
              {topRoutes.map((route) => (
                <NavLink key={route.href} href={route.href}>
                  <div className="group flex w-36 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10 hover:text-primary">
                    <route.icon size={20} className="mr-3" />
                    {route.label}
                  </div>
                </NavLink>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Account & Profile</AccordionTrigger>
          <AccordionContent>
            <div className="w-fit space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
              {bottomRoutes.map((route) => (
                <NavLink key={route.href} href={route.href}>
                  <div className="group flex w-36 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10 hover:text-white">
                    <route.icon size={20} className="mr-3" />
                    {route.label}
                  </div>
                </NavLink>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
