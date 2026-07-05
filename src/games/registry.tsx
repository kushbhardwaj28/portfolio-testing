import { lazy } from 'react';
import { SnakeGameIcon, BreakoutGameIcon } from '@/components/icons/PixelIcons';
import type { GameDefinition } from './types';

const SnakeGame = lazy(() => import('./snake/SnakeGame').then((m) => ({ default: m.SnakeGame })));
const BreakoutGame = lazy(() => import('./breakout/BreakoutGame').then((m) => ({ default: m.BreakoutGame })));

/**
 * The arcade's game list. To add a new game:
 *   1. Build a component implementing `GameProps` (see types.ts), forwarding a `GameControlHandle` ref.
 *   2. Add one entry below with a unique `id` and `highScoreKey`.
 * The nav gamepad button, Konami code, and GameModal picker all pick this list up automatically.
 */
export const GAMES: GameDefinition[] = [
  {
    id: 'snake',
    title: 'SNAKE.EXE',
    shortLabel: 'Snake',
    hint: 'Arrows / WASD / swipe · eat the ◆',
    highScoreKey: 'kbq_snake_hi',
    Icon: SnakeGameIcon,
    Component: SnakeGame,
  },
  {
    id: 'breakout',
    title: 'BREAKOUT.EXE',
    shortLabel: 'Breakout',
    hint: 'Arrows / WASD · ▲ or space to launch',
    highScoreKey: 'kbq_breakout_hi',
    Icon: BreakoutGameIcon,
    Component: BreakoutGame,
  },
];

export function getGame(id: string | null) {
  return GAMES.find((g) => g.id === id) ?? null;
}
