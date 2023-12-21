'use client';

import { useState, createContext, useContext } from 'react';

interface SoundPlayerContextProps {
  currentPlayer: any;
  setCurrentPlayer: any;
}

const SoundPlayerContext = createContext<SoundPlayerContextProps | null>(null);

const SoundPlayerProvider = ({ children }: { children: any }) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);
  return (
    <SoundPlayerContext.Provider value={{ currentPlayer, setCurrentPlayer }}>
      {children}
    </SoundPlayerContext.Provider>
  );
};

function useSoundPlayer() {
  const context = useContext(SoundPlayerContext);
  if (context === undefined) {
    return null;
  }
  return context;
}

export { SoundPlayerProvider, useSoundPlayer };
