'use client';

import * as React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import {
  Megaphone,
  Users2,
  ScrollText,
  Compass,
  Mic,
  Library,
  Blocks,
  Gavel,
  Info
} from 'lucide-react';

type ComponentItem = {
  title: string;
  href: string;
  description: string;
  icon: React.ElementType;
};

const components: ComponentItem[] = [
  {
    title: 'Outreach',
    href: '/outreach',
    description:
      'One click tool to message your elected officials about UAP. Find all points of contact for your rep.',
    icon: Megaphone
  },
  {
    title: 'Politicians',
    href: '/politicians',
    description:
      'Find all congressional politicians active on UAP. Browse by party, state, and position.',
    icon: Users2
  },
  {
    title: 'Statements',
    href: '/statements',
    description:
      'Hear directly from politicians on UAP. Investigate how the statements affect the Bipartisan Index.',
    icon: Mic
  },
  {
    title: 'Legislation',
    href: '/legislation',
    description:
      'Vote on all proposed and enacted UAP legislation, and track the status as debated in Congress.',
    icon: ScrollText
  },
  {
    title: 'Hearings',
    href: '/hearings',
    description:
      'Browse all congressional hearings related to UAP, including members, dates, and topics discussed.',
    icon: Gavel
  },
  {
    title: 'Newsroom',
    href: '/newsroom',
    description:
      'Read trending articles about UAP disclosure in Washington, from trusted & reliable sources.',
    icon: Compass
  }
];

export default function NavLinks() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">UAPoli</div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Propelling bipartisan UAP disclosure efforts in DC.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/learn" title="Learn" icon={Library}>
                Explore the history of Unidentified Aerial Phenomena (UAP), or
                UFOs.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="How to Use"
                icon={Blocks}
              >
                Quick tips to get you started and connected to your reps.
              </ListItem>
              <ListItem
                href="/docs/primitives/typography"
                title="About Us"
                icon={Info}
              >
                Uncover the story behind UAPoli, gain insight into our mission.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                  icon={component.icon}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/plans" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Plans
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'> & { icon: React.ElementType }
>(({ className, title, children, icon: Icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-1">
            {' '}
            <Icon size={16} />{' '}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>

          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
