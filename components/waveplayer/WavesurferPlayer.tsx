'use client';

import { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export default function WavePlayer({
  url,
  paused,
  filename = '',
  barHeight = 1,
  onLoad,
  onFinish,
  onCreate,
  onPlay,
  media,
  onReady,
  resetOnPause = false,
  waveColor = '#737373',
  progressColor = '#fafafa',
  autoplay = false
}: {
  url: string;
  paused: any;
  filename: any;
  barHeight: number;
  onLoad: any;
  onFinish: any;
  onPlay: any;
  onCreate: any;
  onReady: any;
  media: any;
  resetOnPause: boolean;
  waveColor: string;
  progressColor: string;
  autoplay: boolean;
}) {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const wavesurferRef = useRef<null | WaveSurfer>(null);

  const id =
    url.replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '') +
    filename
      .replace(/\s/g, '')
      .replace(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g, '')
      .replaceAll('.', '');

  useEffect(() => {
    if (wavesurferRef.current) {
      wavesurferRef.current.destroy();
    }
    if (!url) return;

    let height = 54 * barHeight;
    if (window.screen.width < 800) {
      height = 30 * barHeight;
    }

    async function loadWavesurfer() {
      setLoading(true);
      const WaveSurfer = (await import('wavesurfer.js')).default;
      //Below if statement fixes double wave render issue
      if (url && !wavesurferRef.current) {
        wavesurferRef.current = WaveSurfer.create({
          container: '#' + id,
          normalize: true,
          hideScrollbar: true,
          barGap: 2,
          barHeight: 3,
          barWidth: 4,
          height,
          cursorWidth: 0,
          waveColor: '#8C43FF',
          progressColor: '#ffffff',
          barRadius: 8
        });
        if (onCreate) onCreate(wavesurferRef.current);
        wavesurferRef.current.load(url);
        wavesurferRef.current.on('ready', () => {
          setLoading(false);
          if (autoplay) wavesurferRef.current?.play();
          onLoad({ duration: wavesurferRef.current?.getDuration() });
        });
        wavesurferRef.current.on('finish', () => {
          if (onFinish) onFinish();
        });
      }
    }

    loadWavesurfer();

    if (wavesurferRef.current) {
      const getPlayerParams = () => ({
        media: wavesurferRef.current?.getMediaElement(),
        peaks: wavesurferRef.current?.exportPeaks()
      });

      const subscriptions = [
        wavesurferRef.current.on('ready', () => {
          if (onReady) onReady(getPlayerParams());
          setIsPlaying(!!wavesurferRef.current?.isPlaying());
        }),
        wavesurferRef.current.on('play', () => {
          if (onPlay) {
            onPlay((prev: any) => {
              const newParams = getPlayerParams();
              if (!prev || prev.media !== newParams.media) {
                if (prev) {
                  prev.media.pause();
                  prev.media.currentTime = 0;
                }
                return newParams;
              }
              return prev;
            });
          }
          setIsPlaying(true);
        }),
        wavesurferRef.current.on('pause', () => setIsPlaying(false))
      ];

      return () => {
        subscriptions.forEach((unsub) => unsub());
      };
    }
  }, [url, barHeight, waveColor, progressColor, onReady, onPlay]);

  useEffect(() => {
    if (!wavesurferRef.current) return;
    if (paused) {
      if (resetOnPause) {
        wavesurferRef.current.stop();
      } else {
        wavesurferRef.current.pause();
      }
    } else {
      wavesurferRef.current.play();
    }
  }, [paused, resetOnPause]);

  return (
    <div className="relative h-full w-full">
      <div id={id} className="h-full w-full"></div>
    </div>
  );
}
