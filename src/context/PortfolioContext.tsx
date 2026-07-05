import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';
import { useTheme, type Theme } from '@/hooks/useTheme';
import { useSound, type PlayBlip } from '@/hooks/useSound';
import { useKonami } from '@/hooks/useKonami';
import { KONAMI_ICONS } from '@/components/icons/PixelIcons';

interface Coin {
  id: number;
  Icon: (typeof KONAMI_ICONS)[number];
  left: number;
  duration: number;
  delay: number;
}

interface PortfolioContextValue {
  theme: Theme;
  toggleTheme: () => void;
  muted: boolean;
  toggleMuted: () => void;
  playBlip: PlayBlip;
  hoverSfx: (onClick?: () => void) => { onMouseEnter: () => void; onClick: () => void };
  toastMessage: string | null;
  showToast: (msg: string) => void;
  coins: Coin[];
  isGameOpen: boolean;
  activeGameId: string | null;
  openGame: (gameId?: string) => void;
  closeGame: () => void;
  selectGame: (gameId: string | null) => void;
}

const PortfolioContext = createContext<PortfolioContextValue | null>(null);

let coinSeq = 0;
const COIN_LIFETIME_MS = 3600;
const TOAST_LIFETIME_MS = 2600;

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme: rawToggleTheme } = useTheme();
  const { muted, toggleMuted, playBlip, hoverSfx } = useSound();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimeout = useRef<ReturnType<typeof setTimeout>>();
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastMessage(null), TOAST_LIFETIME_MS);
  }, []);

  const [coins, setCoins] = useState<Coin[]>([]);
  const rainCoins = useCallback((n: number) => {
    const next: Coin[] = Array.from({ length: n }, () => ({
      id: coinSeq++,
      Icon: KONAMI_ICONS[Math.floor(Math.random() * KONAMI_ICONS.length)],
      left: Math.random() * 100,
      duration: 1.4 + Math.random() * 1.8,
      delay: Math.random() * 0.8,
    }));
    setCoins((prev) => [...prev, ...next]);
    const ids = new Set(next.map((c) => c.id));
    setTimeout(() => {
      setCoins((prev) => prev.filter((c) => !ids.has(c.id)));
    }, COIN_LIFETIME_MS);
  }, []);

  const [isGameOpen, setGameOpen] = useState(false);
  const [activeGameId, setActiveGameId] = useState<string | null>(null);
  const openGame = useCallback((gameId?: string) => {
    setGameOpen(true);
    setActiveGameId(gameId ?? null);
  }, []);
  const closeGame = useCallback(() => {
    setGameOpen(false);
    setActiveGameId(null);
  }, []);
  const selectGame = useCallback((gameId: string | null) => setActiveGameId(gameId), []);

  const toggleTheme = useCallback(() => {
    rawToggleTheme();
    playBlip(theme === 'dark' ? 520 : 320);
  }, [rawToggleTheme, playBlip, theme]);

  const unlockSecret = useCallback(() => {
    playBlip(1046, 0.12, 'sawtooth');
    setTimeout(() => playBlip(1318, 0.14, 'sawtooth'), 120);
    rainCoins(40);
    showToast('★ CHEAT UNLOCKED · GODMODE ★');
    document.documentElement.style.setProperty('--glow', '0 0 26px');
    setTimeout(() => openGame(), 700);
  }, [playBlip, rainCoins, showToast, openGame]);
  useKonami(unlockSecret);

  const value = useMemo<PortfolioContextValue>(
    () => ({
      theme,
      toggleTheme,
      muted,
      toggleMuted,
      playBlip,
      hoverSfx,
      toastMessage,
      showToast,
      coins,
      isGameOpen,
      activeGameId,
      openGame,
      closeGame,
      selectGame,
    }),
    [theme, toggleTheme, muted, toggleMuted, playBlip, hoverSfx, toastMessage, showToast, coins, isGameOpen, activeGameId, openGame, closeGame, selectGame],
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within a PortfolioProvider');
  return ctx;
}
