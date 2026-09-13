import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import type p5 from 'p5';
import { useP5Canvas } from '../useP5Canvas';
import { cssVar } from '../cssVar';
import type { Direction, GameControlHandle, GameProps } from '../types';

const CANVAS_SIZE = 240;
const PADDLE_WIDTH = 52;
const PADDLE_HEIGHT = 8;
const PADDLE_Y = CANVAS_SIZE - 18;
const PADDLE_STEP = 20;
const BALL_RADIUS = 4;
const BALL_SPEED = 2.4;
const ROWS = 4;
const COLS = 8;
const BRICK_GAP = 3;
const BRICK_W = (CANVAS_SIZE - BRICK_GAP * (COLS + 1)) / COLS;
const BRICK_H = 12;
const BRICK_TOP = 24;
const START_LIVES = 3;
const ACCENTS = ['--p1', '--p2', '--p3', '--p4'];

interface Brick {
  x: number;
  y: number;
  alive: boolean;
  accent: string;
}

interface BreakoutState {
  paddleX: number;
  ball: { x: number; y: number; vx: number; vy: number };
  bricks: Brick[];
  score: number;
  lives: number;
  launched: boolean;
}

function freshBricks(): Brick[] {
  const bricks: Brick[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      bricks.push({
        x: BRICK_GAP + col * (BRICK_W + BRICK_GAP),
        y: BRICK_TOP + row * (BRICK_H + BRICK_GAP),
        alive: true,
        accent: ACCENTS[row % ACCENTS.length],
      });
    }
  }
  return bricks;
}

function freshBall(): BreakoutState['ball'] {
  return { x: CANVAS_SIZE / 2, y: PADDLE_Y - BALL_RADIUS - 1, vx: 0, vy: 0 };
}

function freshState(): BreakoutState {
  return {
    paddleX: CANVAS_SIZE / 2 - PADDLE_WIDTH / 2,
    ball: freshBall(),
    bricks: freshBricks(),
    score: 0,
    lives: START_LIVES,
    launched: false,
  };
}

/** Brick-breaker — clear the board, don't drop the ball. Second registry entry, proves the arcade pattern scales past Snake. */
export const BreakoutGame = forwardRef<GameControlHandle, GameProps>(function BreakoutGame(
  { theme, active, highScoreKey, playBlip, onStatsChange, showToast },
  ref,
) {
  const gameRef = useRef<BreakoutState>(freshState());
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
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    try {
      hiRef.current = parseInt(localStorage.getItem(highScoreKey) || '0', 10) || 0;
    } catch {
      hiRef.current = 0;
    }
    onStatsChangeRef.current({ score: 0, hi: hiRef.current });
    return () => clearTimeout(resetTimeoutRef.current);
  }, [highScoreKey]);

  const launch = useCallback(() => {
    const g = gameRef.current;
    if (g.launched) return;
    g.launched = true;
    const angle = (Math.random() * 0.6 - 0.3) * Math.PI - Math.PI / 2; // upward-ish
    g.ball.vx = Math.cos(angle) * BALL_SPEED;
    g.ball.vy = Math.sin(angle) * BALL_SPEED;
  }, []);

  const movePaddle = useCallback((dir: Direction) => {
    const g = gameRef.current;
    if (dir === 'left') g.paddleX = Math.max(0, g.paddleX - PADDLE_STEP);
    else if (dir === 'right') g.paddleX = Math.min(CANVAS_SIZE - PADDLE_WIDTH, g.paddleX + PADDLE_STEP);
    else launch();
  }, [launch]);

  useImperativeHandle(
    ref,
    () => ({
      handleDirection(dir: Direction) {
        movePaddle(dir);
      },
    }),
    [movePaddle],
  );

  const containerRef = useP5Canvas((p: p5) => {
    p.setup = () => {
      const cnv = p.createCanvas(CANVAS_SIZE, CANVAS_SIZE);
      cnv.elt.style.width = '100%';
      cnv.elt.style.height = '100%';
      cnv.elt.style.imageRendering = 'pixelated';
      cnv.elt.style.display = 'block';
      p.noStroke();
    };

    const resetAfterLifeLost = () => {
      const g = gameRef.current;
      g.ball = freshBall();
      g.launched = false;
    };

    const loseLife = () => {
      const g = gameRef.current;
      g.lives--;
      playBlipRef.current(160, 0.25, 'sawtooth');
      if (g.lives <= 0) {
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
        resetTimeoutRef.current = setTimeout(() => {
          if (activeRef.current) {
            gameRef.current = freshState();
            onStatsChangeRef.current({ score: 0, hi: hiRef.current });
          }
        }, 1400);
      } else {
        resetAfterLifeLost();
        onStatsChangeRef.current({ score: g.score, hi: hiRef.current });
      }
    };

    const update = () => {
      const g = gameRef.current;
      if (g.lives <= 0) return;
      if (!g.launched) return;
      const b = g.ball;
      b.x += b.vx;
      b.y += b.vy;

      if (b.x - BALL_RADIUS <= 0 || b.x + BALL_RADIUS >= CANVAS_SIZE) {
        b.vx *= -1;
        playBlipRef.current(300, 0.03);
      }
      if (b.y - BALL_RADIUS <= 0) {
        b.vy *= -1;
        playBlipRef.current(300, 0.03);
      }
      if (b.y - BALL_RADIUS > CANVAS_SIZE) {
        loseLife();
        return;
      }

      if (
        b.y + BALL_RADIUS >= PADDLE_Y &&
        b.y + BALL_RADIUS <= PADDLE_Y + PADDLE_HEIGHT + 4 &&
        b.x >= g.paddleX &&
        b.x <= g.paddleX + PADDLE_WIDTH &&
        b.vy > 0
      ) {
        const hitPos = (b.x - (g.paddleX + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
        b.vx = hitPos * BALL_SPEED * 1.3;
        b.vy = -Math.abs(b.vy);
        playBlipRef.current(440, 0.05);
      }

      for (const brick of g.bricks) {
        if (!brick.alive) continue;
        if (b.x + BALL_RADIUS > brick.x && b.x - BALL_RADIUS < brick.x + BRICK_W && b.y + BALL_RADIUS > brick.y && b.y - BALL_RADIUS < brick.y + BRICK_H) {
          brick.alive = false;
          b.vy *= -1;
          g.score += 10;
          playBlipRef.current(880, 0.05);
          onStatsChangeRef.current({ score: g.score, hi: hiRef.current });
          break;
        }
      }

      if (g.bricks.every((br) => !br.alive)) {
        showToastRef.current('★ BOARD CLEARED ★');
        g.bricks = freshBricks();
        g.ball = freshBall();
        g.launched = false;
      }
    };

    const paint = () => {
      const g = gameRef.current;
      p.background(themeRef.current === 'dark' ? '#120e26' : '#f4ead3');
      g.bricks.forEach((brick) => {
        if (!brick.alive) return;
        p.fill(cssVar(brick.accent));
        p.rect(brick.x, brick.y, BRICK_W, BRICK_H);
      });
      p.fill(cssVar('--ink'));
      p.rect(g.paddleX, PADDLE_Y, PADDLE_WIDTH, PADDLE_HEIGHT);
      p.fill(cssVar('--p1'));
      p.circle(g.ball.x, g.ball.y, BALL_RADIUS * 2);

      p.fill(cssVar('--muted'));
      p.textSize(9);
      p.textFont('monospace');
      for (let i = 0; i < g.lives; i++) p.rect(6 + i * 10, CANVAS_SIZE - 8, 6, 4);
      if (!g.launched && g.lives > 0) {
        p.textAlign(p.CENTER);
        p.text('TAP UP/ACTION TO LAUNCH', CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);
      }
    };

    p.draw = () => {
      if (!activeRef.current) return;
      update();
      paint();
    };
  });

  useEffect(() => {
    if (!active) return;
    const keyMap: Record<string, Direction> = {
      ArrowLeft: 'left',
      ArrowRight: 'right',
      ArrowUp: 'up',
      a: 'left',
      d: 'right',
      w: 'up',
      ' ': 'up',
    };
    const handler = (e: KeyboardEvent) => {
      const dir = keyMap[e.key] ?? keyMap[e.key.toLowerCase()];
      if (!dir) return;
      e.preventDefault();
      movePaddle(dir);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active, movePaddle]);

  return <div ref={containerRef} className="block leading-none" />;
});
