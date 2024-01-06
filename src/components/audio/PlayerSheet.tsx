'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';

export default function PlayerSheet({
  open,
  onClose,
  track,
  setIsOpen,
  setCurrentPlayer,
  currentPlayer
}: {
  open: boolean;
  onClose: any;
  track: any;
  setIsOpen: any;
  setCurrentPlayer: any;
  currentPlayer: any;
}) {
  return (
    <Sheet modal={false} open={open} onOpenChange={setIsOpen}>
      <SheetTrigger>
        {/* <Menu className="text-white" size={24} /> Here */}
      </SheetTrigger>
      <SheetContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className=""
        side={'bottom'}
      >
        <SheetHeader>
          <Link href="/">
            <Image
              priority
              alt="UAPoli logo"
              width={80}
              height={20.96}
              src={track.image}
            />
          </Link>
        </SheetHeader>

        <SheetTitle>{track.name}</SheetTitle>
        <SheetDescription>
          {currentPlayer && <div className="h-full w-full items-center"></div>}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
