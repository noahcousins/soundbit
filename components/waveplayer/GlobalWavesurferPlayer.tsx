//@ts-nocheck
import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';

interface WaveformProps {
  media: HTMLMediaElement;
  peaks: number[];
}

const Waveform: React.FC<WaveformProps> = ({ media, peaks }) => {
  const waveformRef = useRef<WaveSurfer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    waveformRef.current = WaveSurfer.create({
      container: containerRef.current!,
      backend: 'MediaElement',
      height: 100,
      barWidth: 1,
      barRadius: 2,
      cursorWidth: 0,
      normalize: true,
      waveColor: '#ccc',
      progressColor: '#000',
      cursorColor: 'transparent'
    });

    waveformRef.current.load(media, peaks);

    return () => {
      if (waveformRef.current) {
        waveformRef.current.destroy();
      }
    };
  }, [media, peaks]);

  return <div ref={containerRef} style={{ width: '100%', height: '100px' }} />;
};

export default Waveform;
