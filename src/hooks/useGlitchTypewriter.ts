import { useEffect, useState } from 'react';

const GLYPHS = '!<>-_/[]{}=+*^?#01';
const RESTART_DELAY = 4200;
const CHAR_DELAY_BASE = 110;
const CHAR_DELAY_JITTER = 60;
const NOISE_LEN = 3;

export interface GlitchLine {
  solid: string;
  noise: string;
}

/** Steady, in-sync scramble-to-solid decode for N lines of text (used for the hero name reveal). Each line resolves character-by-character with a trailing glyph-noise cursor, all lines starting and looping together. */
export function useGlitchTypewriter(lines: string[]): GlitchLine[] {
  const [state, setState] = useState<GlitchLine[]>(() => lines.map(() => ({ solid: '', noise: '' })));

  // lines is expected to be a stable/memoized array from the caller
  useEffect(() => {
    let cancelled = false;
    let finishedCount = 0;
    const timeouts: (ReturnType<typeof setTimeout> | undefined)[] = [];
    let restartTimeout: ReturnType<typeof setTimeout> | undefined;

    const runLine = (index: number) => {
      const text = lines[index];
      let i = 0;
      const step = () => {
        if (cancelled) return;
        if (i > text.length) {
          setState((prev) => {
            const next = [...prev];
            next[index] = { solid: text, noise: '' };
            return next;
          });
          finishedCount++;
          if (finishedCount === lines.length) {
            restartTimeout = setTimeout(() => {
              finishedCount = 0;
              lines.forEach((_, idx) => runLine(idx));
            }, RESTART_DELAY);
          }
          return;
        }
        const solid = text.slice(0, i);
        let noise = '';
        for (let k = 0; k < Math.min(NOISE_LEN, text.length - i); k++) {
          noise += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setState((prev) => {
          const next = [...prev];
          next[index] = { solid, noise };
          return next;
        });
        i++;
        timeouts[index] = setTimeout(step, CHAR_DELAY_BASE + Math.random() * CHAR_DELAY_JITTER);
      };
      step();
    };

    lines.forEach((_, idx) => runLine(idx));

    return () => {
      cancelled = true;
      timeouts.forEach((t) => t && clearTimeout(t));
      if (restartTimeout) clearTimeout(restartTimeout);
    };
  }, [lines]);

  return state;
}
