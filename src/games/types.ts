import type { ComponentType, ForwardRefExoticComponent, LazyExoticComponent, RefAttributes } from 'react';
import type { PlayBlip } from '@/hooks/useSound';
import type { Theme } from '@/hooks/useTheme';

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface GameStats {
  score: number;
  hi: number;
}

/** Imperative handle so the shared d-pad/keyboard in GameModal can drive any game. */
export interface GameControlHandle {
  handleDirection: (dir: Direction) => void;
}

export interface GameProps {
  theme: Theme;
  muted: boolean;
  playBlip: PlayBlip;
  /** True while this game's screen is the one showing in the modal — games should pause their loop when false. */
  active: boolean;
  /** localStorage key for this game's high score, sourced from its GameDefinition. */
  highScoreKey: string;
  onStatsChange: (stats: GameStats) => void;
  showToast: (msg: string) => void;
}

/**
 * Everything the arcade registry needs to list + launch a game.
 * To add a new game: build a component implementing GameProps (forwardRef<GameControlHandle>)
 * and append one entry to `src/games/registry.tsx`. Nothing else needs to change.
 */
export interface GameDefinition {
  id: string;
  title: string;
  shortLabel: string;
  hint: string;
  highScoreKey: string;
  Icon: ComponentType<{ className?: string }>;
  /** Lazy-loaded so p5 (and any other game deps) only download once the arcade is opened. */
  Component: LazyExoticComponent<ForwardRefExoticComponent<GameProps & RefAttributes<GameControlHandle>>>;
}
