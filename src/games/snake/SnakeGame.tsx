import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import type p5 from 'p5';
import { useP5Canvas } from '../useP5Canvas';
import { cssVar } from '../cssVar';
import type { Direction, GameControlHandle, GameProps } from '../types';

const GRID = 12;
const CANVAS_SIZE = 240;
const CELL = CANVAS_SIZE / GRID;
const TICK_MS = 130;
const RESTART_DELAY_MS = 1400;
const OPPOSITE: Record<Direction, Direction> = { up: 'down', down: 'up', left: 'right', right: 'left' };
const KEY_TO_DIR: Record<string, Direction> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  w: 'up',
  s: 'down',
  a: 'left',
  d: 'right',
};

interface Point {
  x: number;
  y: number;
}
interface SnakeState {
  dir: Direction;
  next: Direction;
  snake: Point[];
  food: Point;
  score: number;
  dead: boolean;
}

function freshState(): SnakeState {
  return {
    dir: 'right',
    next: 'right',
    snake: [
      { x: 5, y: 6 },
      { x: 4, y: 6 },
      { x: 3, y: 6 },
    ],
    food: { x: 8, y: 6 },
    score: 0,
    dead: false,
  };
}

function placeFood(state: SnakeState) {
  let food: Point;
  do {
    food = { x: Math.floor(Math.random() * GRID), y: Math.floor(Math.random() * GRID) };
  } while (state.snake.some((s) => s.x === food.x && s.y === food.y));
  state.food = food;
}

/** Classic Snake — eat the diamond, wrap the walls, don't hit yourself. Drawn with p5 in instance mode so it can live inside the arcade's shared modal. */
export const SnakeGame = forwardRef<GameControlHandle, GameProps>(function SnakeGame(
  { theme, active, highScoreKey, playBlip, onStatsChange, showToast },
  ref,
) {
  const gameRef = useRef<SnakeState>(freshState());
  const hiRef = useRef(0);
  const themeRef = useRef(theme);
  themeRef.current = theme;
  const activeRef = useRef(active);
  activeRef.current = active;
  const playBlipRef = useRef(playBlip);
  playBlipRef.current = playBlip;
  const onStatsChangeRef = useRef(onStatsChange);
  onStatsChangeRef.current = onStatsChange;
  const showToastRef = useRef(showToast);
  showToastRef.current = showToast;
  const restartTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      hiRef.current = parseInt(localStorage.getItem(highScoreKey) || '0', 10) || 0;
    } catch {
      hiRef.current = 0;
    }
    onStatsChangeRef.current({ score: 0, hi: hiRef.current });
    return () => clearTimeout(restartTimeoutRef.current);
  }, [highScoreKey]);

  const restart = useCallback(() => {
    gameRef.current = freshState();
    onStatsChangeRef.current({ score: 0, hi: hiRef.current });
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      handleDirection(dir: Direction) {
        const g = gameRef.current;
        if (dir !== OPPOSITE[g.dir]) g.next = dir;
      },
    }),
    [],
  );

  const containerRef = useP5Canvas((p: p5) => {
    let lastTick = 0;

    p.setup = () => {
      const cnv = p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      cnv.elt.style.width = '100%';
      cnv.elt.style.height = '100%';
      cnv.elt.style.imageRendering = 'pixelated';
      cnv.elt.style.display = 'block';
      p.noStroke();
    };

    const paintScene = () => {
      const g = gameRef.current;
      p.background(themeRef.current === 'dark' ? '#120e26' : '#f4ead3');
      p.stroke(themeRef.current === 'dark' ? 'rgba(120,90,255,0.14)' : 'rgba(27,22,16,0.10)');
      p.strokeWeight(1);
      for (let i = 1; i < GRID; i++) {
        p.line(i * CELL, 0, i * CELL, CANVAS_SIZE);
        p.line(0, i * CELL, CANVAS_SIZE, i * CELL);
      }
      p.noStroke();
      p.fill(cssVar('--p3'));
      p.rect(g.food.x * CELL + 3, g.food.y * CELL + 3, CELL - 6, CELL - 6);
      g.snake.forEach((s, i) => {
        p.fill(cssVar(i === 0 ? '--p1' : '--p2'));
        p.rect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2);
      });
    };

    const tick = () => {
      const g = gameRef.current;
      if (g.dead) return;
      g.dir = g.next;
      const head = { ...g.snake[0] };
      if (g.dir === 'up') head.y--;
      else if (g.dir === 'down') head.y++;
      else if (g.dir === 'left') head.x--;
      else head.x++;
      head.x = (head.x + GRID) % GRID;
      head.y = (head.y + GRID) % GRID;

      if (g.snake.some((s) => s.x === head.x && s.y === head.y)) {
        g.dead = true;
        playBlipRef.current(160, 0.3, 'sawtooth');
        if (g.score > hiRef.current) {
          hiRef.current = g.score;
          try {
            localStorage.setItem(highScoreKey, String(hiRef.current));
          } catch {
            // ignore persistence failures
          }
          showToastRef.current(`★ NEW HIGH SCORE: ${hiRef.current} ★`);
        } else {
          showToastRef.current(`GAME OVER · SCORE ${g.score}`);
        }
        onStatsChangeRef.current({ score: g.score, hi: hiRef.current });
        p.fill('rgba(224,64,43,0.22)');
        p.rect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        restartTimeoutRef.current = setTimeout(() => {
          if (activeRef.current) restart();
        }, RESTART_DELAY_MS);
        return;
      }

      g.snake.unshift(head);
      if (head.x === g.food.x && head.y === g.food.y) {
        g.score += 10;
        onStatsChangeRef.current({ score: g.score, hi: hiRef.current });
        playBlipRef.current(880, 0.06);
        placeFood(g);
      } else {
        g.snake.pop();
      }
    };

    p.draw = () => {
      if (!activeRef.current) return;
      const now = p.millis();
      if (now - lastTick >= TICK_MS) {
        lastTick = now;
        tick();
      }
      // Freeze on the flash frame painted inside tick() while dead; resumes once restart() clears it.
      if (!gameRef.current.dead) paintScene();
    };
  });

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      const dir = KEY_TO_DIR[e.key] ?? KEY_TO_DIR[e.key.toLowerCase()];
      if (!dir) return;
      e.preventDefault();
      const g = gameRef.current;
      if (dir !== OPPOSITE[g.dir]) g.next = dir;
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active]);

  return <div ref={containerRef} className="block leading-none" />;
});
