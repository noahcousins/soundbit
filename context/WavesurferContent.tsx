'use client';

import { createContext, useContext, useState } from 'react';

const WaveSurferContext = createContext();

export const WaveSurferProvider = ({ children }: { children: any }) => {
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const value = { currentPlayer, setCurrentPlayer };

  return (
    <WaveSurferContext.Provider value={value}>
      {children}
    </WaveSurferContext.Provider>
  );
};

export const useWaveSurfer = () => useContext(WaveSurferContext);
