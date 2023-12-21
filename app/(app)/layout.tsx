'use client';

import Paywall from '@/components/layout/Paywall';

import PlayerSheet from '@/components/audio/PlayerSheet';
import { PlayerProvider, usePlayer } from '@/context/PlayerContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <PlayerProvider>
      <div className="flex w-full">
        {/* <Sidebar /> */}
        {/* <div className="flex w-full flex-col lg:w-5/6"> */}
        <div className="flex w-full flex-col">
          <PlayerContainer />

          <div className="relative flex w-full px-4 py-8 lg:px-8">
            {/* Use the Paywall component */}
            {/* {!isUserLoggedIn && <Paywall />} */}
            {/* Render the content */}
            {children}
          </div>
        </div>
      </div>
    </PlayerProvider>
  );
}

function PlayerContainer() {
  const { isOpen, setIsOpen, track } = usePlayer();

  return (
    <PlayerSheet
      open={isOpen}
      setIsOpen={setIsOpen}
      onClose={() => setIsOpen(false)}
      track={track}
    />
  );
}
