import type { Direction } from '@/games/types';

interface DPadProps {
  onDirection: (dir: Direction) => void;
}

const BTN_CLASS =
  'border-[3px] border-line bg-card text-ink rounded-[3px] text-sm shadow-[2px_2px_0_var(--line)] active:bg-p1 active:text-white active:translate-x-px active:translate-y-px active:shadow-none cursor-inherit';

export function DPad({ onDirection }: DPadProps) {
  return (
    <div className="mt-3.5 grid grid-cols-3 grid-rows-3 gap-1.5 justify-center [&>button]:w-12 [&>button]:h-12" style={{ justifyItems: 'center' }}>
      <button className={`${BTN_CLASS} col-start-2 row-start-1`} onClick={() => onDirection('up')} aria-label="Up">
        ▲
      </button>
      <button className={`${BTN_CLASS} col-start-1 row-start-2`} onClick={() => onDirection('left')} aria-label="Left">
        ◀
      </button>
      <button className={`${BTN_CLASS} col-start-3 row-start-2`} onClick={() => onDirection('right')} aria-label="Right">
        ▶
      </button>
      <button className={`${BTN_CLASS} col-start-2 row-start-3`} onClick={() => onDirection('down')} aria-label="Down">
        ▼
      </button>
    </div>
  );
}
