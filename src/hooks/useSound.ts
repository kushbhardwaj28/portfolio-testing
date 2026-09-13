import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'kbq_muted';

function readStoredMuted(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export type PlayBlip = (freq?: number, dur?: number, type?: OscillatorType) => void;

/** Mutable retro square-wave blips via WebAudio — no audio assets needed. */
export function useSound() {
  const [muted, setMutedState] = useState<boolean>(() => readStoredMuted());
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const acRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {
      // ignore persistence failures
    }
  }, [muted]);

  useEffect(() => {
    return () => {
      acRef.current?.close().catch(() => {});
    };
  }, []);

  const getContext = useCallback(() => {
    if (mutedRef.current) return null;
    try {
      if (!acRef.current) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        acRef.current = new AC();
      }
      if (acRef.current.state === 'suspended') void acRef.current.resume();
      return acRef.current;
    } catch {
      return null;
    }
  }, []);

  const playBlip = useCallback<PlayBlip>(
    (freq = 440, dur = 0.09, type = 'square') => {
      const ac = getContext();
      if (!ac) return;
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.0001, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.09, ac.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.start();
      osc.stop(ac.currentTime + dur);
    },
    [getContext],
  );

  const toggleMuted = useCallback(() => {
    setMutedState((prev) => {
      const next = !prev;
      if (!next) playBlip(660);
      return next;
    });
  }, [playBlip]);

  const hoverSfx = useCallback(
    (onClick?: () => void) => ({
      onClick: () => {
        playBlip(520, 0.06, 'square');
        onClick?.();
      },
      onMouseEnter: () => {}
    }),
    [playBlip],
  );

  return { muted, toggleMuted, playBlip, hoverSfx };
}
