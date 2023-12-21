import { useState, createContext, useContext } from 'react';

const PlayerContext = createContext();

const PlayerProvider = ({ children }: { children: any }) => {
  const [track, setTrack] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState();

  return (
    <PlayerContext.Provider
      value={{
        track,
        setTrack,
        isOpen,
        setIsOpen,
        currentPlayer,
        setCurrentPlayer
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

function usePlayer() {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
}

export { PlayerProvider, usePlayer };
