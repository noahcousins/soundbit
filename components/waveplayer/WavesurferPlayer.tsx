import { useEffect, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { useWaveSurfer } from '@/context/WaveSurferContext'; // Update the path based on your project structure

export default function WavePlayer({
  url,
  paused
}: {
  url: string;
  paused: any;
}) {
  const wavesurferRef = useRef<WaveSurfer | null>(null);
  const { activeWaveSurfer, setWaveSurfer } = useWaveSurfer();

  const id = url.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '');

  const getPlayerParams = () => {
    if (!wavesurferRef.current) return null;

    return {
      media: wavesurferRef.current.getMediaElement(),
      peaks: wavesurferRef.current.exportPeaks()
    };
  };

  useEffect(() => {
    async function loadWaveSurfer() {
      if (url && !wavesurferRef.current) {
        const WaveSurfer = (await import('wavesurfer.js')).default;
        if (url && !wavesurferRef.current) {
          wavesurferRef.current = WaveSurfer.create({
            container: `#${id}`,
            normalize: true,
            hideScrollbar: true,
            barGap: 0,
            height: 24,
            barHeight: 3,
            barWidth: 0,
            cursorWidth: 0,
            waveColor: '#FF2E01',
            progressColor: '#ffffff',
            barRadius: 1
          });

          wavesurferRef.current.load(url);
        }
      }
    }

    loadWaveSurfer();

    return () => {
      if (wavesurferRef.current) {
        wavesurferRef.current.destroy();
        wavesurferRef.current = null;
      }
    };
  }, [url]);

  useEffect(() => {
    if (!wavesurferRef.current) return;

    if (paused) {
      wavesurferRef.current.pause();
    } else {
      if (activeWaveSurfer && activeWaveSurfer !== wavesurferRef.current) {
        activeWaveSurfer.stop();
      }
      wavesurferRef.current.play();
      setWaveSurfer(wavesurferRef.current);
      // Accessing media and peaks here:
      const newParams = getPlayerParams();
      console.log(newParams, 'medisiaiaiai'); // Use these values as needed
    }
  }, [paused]);

  return (
    <div className="relative h-full w-full">
      <div id={id} className="h-full w-full"></div>
    </div>
  );
}
