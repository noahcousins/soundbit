import { ReactNode, createContext, useContext, useState } from 'react';

interface WaveSurferType {
  stop(): unknown;
  // Define properties and methods of your WaveSurfer instance
  load(url: string): void; // Example method: load
  play(): void; // Example method: play
  // ... other properties and methods
}

interface PlayerType {
  // Define properties and methods of your Player object
  name: string; // Example property: name
  play(): void; // Example method: play
  // ... other properties and methods
}

interface WaveSurferContextProps {
  activeWaveSurfer: WaveSurferType | null;
  activePlayer: PlayerType | null;
  setWaveSurfer: (waveSurferInstance: WaveSurferType | null) => void;
  setPlayer: (player: PlayerType | null) => void;
}

const WaveSurferContext = createContext<WaveSurferContextProps | null>(null);

export const useWaveSurfer = () => {
  const context = useContext(WaveSurferContext);
  if (!context) {
    throw new Error('useWaveSurfer must be used within a WaveSurferProvider');
  }
  return context;
};

export const WaveSurferProvider = ({ children }: { children: ReactNode }) => {
  const [activeWaveSurfer, setActiveWaveSurfer] =
    useState<WaveSurferType | null>(null);
  const [activePlayer, setActivePlayer] = useState<PlayerType | null>(null);

  const setWaveSurfer = (waveSurferInstance: WaveSurferType | null) => {
    setActiveWaveSurfer(waveSurferInstance);
  };

  const setPlayer = (player: PlayerType | null) => {
    setActivePlayer(player);
  };

  return (
    <WaveSurferContext.Provider
      value={{ activeWaveSurfer, setWaveSurfer, activePlayer, setPlayer }}
    >
      {children}
    </WaveSurferContext.Provider>
  );
};
