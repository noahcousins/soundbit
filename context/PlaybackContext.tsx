// PlaybackContext.js

import React, { createContext, useContext, useState } from 'react';

const PlaybackContext = createContext({
  playingTrack: null,
  setPlayingTrack: () => {}
});

export const usePlayback = () => useContext(PlaybackContext);

export const PlaybackProvider = ({ children }) => {
  const [playingTrack, setPlayingTrack] = useState(null);

  return (
    <PlaybackContext.Provider value={{ playingTrack, setPlayingTrack }}>
      {children}
    </PlaybackContext.Provider>
  );
};
