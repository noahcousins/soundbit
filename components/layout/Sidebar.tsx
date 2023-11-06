import SignOutButton from "@/components/layout/SignOutButton";
import NavLink from "@/components/layout/NavLink";
import ModeToggle from "@/components/ModeToggle";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";
import Image from "next/image";
import {
  Users2,
  ScrollText,
  Compass,
  Mic,
  Text,
  Settings,
  Gavel,
} from "lucide-react";
import SidebarAuthButtons from "@/components/layout/SidebarAuthButtons";

const topRoutes = [
  {
    label: "Explore",
    icon: Compass,
    color: "text-emerald-500",
    href: "/explore",
  },
];

const mainRoutes = [
  {
    label: "Politicians",
    icon: Users2,
    href: "/politicians",
    color: "text-sky-500",
  },
  {
    label: "Statements",
    icon: Mic,
    href: "/statements",
    color: "text-violet-500",
  },
  {
    label: "Legislation",
    icon: ScrollText,
    color: "text-pink-700",
    href: "/legislation",
  },
  {
    label: "Hearings",
    icon: Gavel,
    color: "text-orange-700",
    href: "/hearings",
  },
];

const bottomRoutes = [
  {
    label: "About",
    icon: Text,
    color: "text-emerald-500",
    href: "/about",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export default function Sidebar() {
  // console.log("Check for cookie", sessionUser);

  return (
    <div className="sticky w-1/6 bg-white/5 top-0 z-30 flex flex-col gap-4 leading-none transition">
      <div className="flex sticky top-0 flex-col justify-between">
        {/* <Link href="/" className="mb-14 flex items-center pl-3">
          <div className="relative mr-4 hidden h-8 w-8">
            <Image fill alt="Logo" src="/logo.png" />
          </div>
          <Link href="/">
            <Image width={80} height={20.96} src="/uapoli_logo_nav.png" />
          </Link>{" "}
        </Link> */}
        {/* {sessionUser && (
          <div className="flex items-center justify-end space-x-4 md:hidden">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-primary/60">
                Hello, {sessionUser.user.email}
              </p>
            </div>
          </div>
        )} */}
        <Link href="/">
          <div className="p-5">
            <Image
              width={80}
              height={20.96}
              alt="UAPoli logo"
              src="/uapoli_logo_nav.png"
            />
          </div>
        </Link>{" "}
        <div className="flex flex-col justify-between">
          <div className="space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
            {topRoutes.map((route) => (
              <NavLink key={route.href} href={route.href}>
                <div className="group flex w-44 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10 hover:text-primary">
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </div>
              </NavLink>
            ))}
          </div>
          {/* <Separator /> */}
          <div className="space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
            {mainRoutes.map((route) => (
              <NavLink key={route.href} href={route.href}>
                <div className="group flex w-44 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10">
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </div>
              </NavLink>
            ))}
          </div>
          {/* <Separator /> */}

          <div className="space-y-1 rounded-2xl bg-transparent p-2 transition-colors hover:bg-background/40">
            {bottomRoutes.map((route) => (
              <NavLink key={route.href} href={route.href}>
                <div className="group flex w-44 flex-1 cursor-pointer items-center justify-start rounded-lg p-3 text-sm transition hover:bg-white/10 hover:text-white">
                  <route.icon className="mr-3 h-5 w-5" />
                  {route.label}
                </div>
              </NavLink>
            ))}
          </div>

          <div className="space-y-1">
            {/* {sessionUser && (
              <div className="mx-auto flex w-full flex-col items-center gap-4 px-3">
                <div className="flex items-center space-x-4">
                  <h2 className="whitespace-nowrap text-xs text-primary/60">
                    Logged in as {sessionUser.user.email}
                  </h2>
                </div>
                <div className="mx-auto flex w-full gap-4">
                  <SignOutButton />
                </div>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
