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
  icon: React.ElementType; // Adding the icon property
};

const components: ComponentItem[] = [
  {
    title: 'Outreach',
    href: '/outreach',
    description:
      'A modal dialog that interrupts the user with important content and expects a response.',
    icon: Megaphone // Icon for Outreach
  },
  {
    title: 'Politicians',
    href: '/politicians',
    description:
      'For sighted users to preview content available behind a link.',
    icon: Users2 // Icon for Politicians
  },
  {
    title: 'Statements',
    href: '/statements',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    icon: Mic // Icon for Statements
  },
  {
    title: 'Legislation',
    href: '/legislation',
    description: 'Visually or semantically separates content.',
    icon: ScrollText // Icon for Legislation
  },
  {
    title: 'Hearings',
    href: '/hearings',
    description:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    icon: Gavel // Icon for Hearings
  },
  {
    title: 'Newsroom',
    href: '/newsroom',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    icon: Compass // Icon for Newsroom
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
              <ListItem href="/docs" title="Learn" icon={Library}>
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
