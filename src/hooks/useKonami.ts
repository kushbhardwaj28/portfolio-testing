import { useEffect } from 'react';

const CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/** Classic Konami code (↑↑↓↓←→←→ B A) — the hidden-secrets easter egg. `onUnlock` should be stable (wrap in useCallback). */
export function useKonami(onUnlock: () => void) {
  useEffect(() => {
    let idx = 0;
    const handler = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (k === CODE[idx]) {
        idx++;
        if (idx === CODE.length) {
          idx = 0;
          onUnlock();
        }
      } else {
        idx = k === CODE[0] ? 1 : 0;
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onUnlock]);
}
