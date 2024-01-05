'use client';

import PlayerSheet from '@/src/components/audio/PlayerSheet';
import { WaveSurferProvider } from '@/src/context/WaveSurferContext';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <WaveSurferProvider>
      <div className="flex w-full bg-[#0d0d0d] tracking-tighter">
        <div className="flex w-full flex-col">
          {/* <PlayerContainer /> */}
          <div className="relative flex w-full px-4 py-8 lg:px-8">
            {children}
          </div>
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
