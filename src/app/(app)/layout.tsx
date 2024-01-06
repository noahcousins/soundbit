'use client';

import PlayerSheet from '@/components/audio/PlayerSheet';
import { WaveSurferProvider } from '@/context/WaveSurferContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WaveSurferProvider>
      <div className="flex w-full tracking-tighter">
        <div className="flex w-full flex-col">
          {/* <PlayerContainer /> */}
          <div className="relative flex w-full">{children}</div>
        </div>
      </div>
    </WaveSurferProvider>
  );
}

// function PlayerContainer() {

//   return (
//     <PlayerSheet
//       open={isOpen}
//       setIsOpen={setIsOpen}
//       onClose={() => setIsOpen(false)}
//       track={track}
//     />
//   );
// }
