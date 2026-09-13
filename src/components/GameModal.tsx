import { Suspense, useEffect, useRef, useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import { GAMES, getGame } from '@/games/registry';
import type { GameControlHandle, GameStats, Direction } from '@/games/types';
import { DPad } from './DPad';

export function GameModal() {
  const { isGameOpen, activeGameId, closeGame, selectGame, theme, muted, playBlip, showToast } = usePortfolio();
  const [stats, setStats] = useState<GameStats>({ score: 0, hi: 0 });
  const gameHandleRef = useRef<GameControlHandle>(null);
  const game = getGame(activeGameId);

  useEffect(() => {
    setStats({ score: 0, hi: 0 });
  }, [activeGameId]);

  useEffect(() => {
    if (!isGameOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeGame();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isGameOpen, closeGame]);

  if (!isGameOpen) return null;

  const handleDirection = (dir: Direction) => gameHandleRef.current?.handleDirection(dir);

  return (
    <div className="fixed inset-0 z-[120] grid place-items-center bg-[rgba(18,14,38,0.82)] backdrop-blur-sm p-4" onClick={closeGame}>
      <div
        className="pixel-panel w-full max-w-[380px] p-5 shadow-[8px_8px_0_var(--p1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-3">
          <span className="pix text-[11px] text-p1">{game ? game.title : '◈ ARCADE'}</span>
          <div className="flex gap-2">
            {game && GAMES.length > 1 && (
              <button
                className="btn-icon pix !w-[34px] !h-[34px] text-xs"
                title="Back to arcade"
                onClick={() => selectGame(null)}
              >
                ‹
              </button>
            )}
            <button className="btn-icon pix !w-[34px] !h-[34px] text-xs" title="Close" onClick={closeGame}>
              ✕
            </button>
          </div>
        </div>

        {game ? (
          <>
            <div className="flex justify-between text-[11px] text-muted mb-2.5 uppercase pix">
              <span>
                SCORE <b className="text-p1">{stats.score}</b>
              </span>
              <span>
                HI <b className="text-p1">{stats.hi}</b>
              </span>
            </div>
            <div className="border-[3px] border-line rounded-[3px] overflow-hidden bg-bg aspect-square">
              <Suspense fallback={<div className="pix grid place-items-center h-full text-[10px] text-muted uppercase">Loading…</div>}>
                <game.Component
                  key={game.id}
                  ref={gameHandleRef}
                  theme={theme}
                  muted={muted}
                  playBlip={playBlip}
                  active={isGameOpen}
                  highScoreKey={game.highScoreKey}
                  onStatsChange={setStats}
                  showToast={showToast}
                />
              </Suspense>
            </div>
            <p className="pix text-[11px] text-muted text-center mt-2.5 uppercase">{game.hint}</p>
            <DPad onDirection={handleDirection} />
          </>
        ) : (
          <div className="grid grid-cols-2 gap-3 py-2">
            {GAMES.map((g) => (
              <button
                key={g.id}
                className="pixel-panel flex flex-col items-center gap-2 p-4 hover:-translate-x-0.5 hover:-translate-y-0.5 transition-transform cursor-inherit"
                onClick={() => {
                  playBlip(660, 0.08);
                  selectGame(g.id);
                }}
              >
                <g.Icon className="w-10 h-10 text-p2" />
                <span className="pix text-[10px] uppercase text-ink">{g.shortLabel}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
