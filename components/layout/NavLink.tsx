"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: any;
}) {
  let segment = useSelectedLayoutSegment();
  let active = href === `/${segment}`;
  return (
    <Link className={active ? "font-medium" : "font-light"} href={href}>
      {children}
    </Link>
  );
}
