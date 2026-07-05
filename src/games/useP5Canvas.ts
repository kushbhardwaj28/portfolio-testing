import p5 from 'p5';
import { useEffect, useRef } from 'react';

/**
 * Mounts a p5 instance-mode sketch into a container div once, and tears it down on unmount.
 * The sketch closure should read mutable inputs (theme, callbacks, control state) from refs
 * rather than from the `sketch` argument itself, since it is only invoked once at construction.
 */
export function useP5Canvas(sketch: (p: p5) => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sketchRef = useRef(sketch);
  sketchRef.current = sketch;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const instance = new p5((p: p5) => sketchRef.current(p), container);
    return () => instance.remove();
  }, []);

  return containerRef;
}
