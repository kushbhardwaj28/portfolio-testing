import { usePortfolio } from '@/context/PortfolioContext';

export function Toast() {
  const { toastMessage } = usePortfolio();
  return (
    <div
      className={`pix fixed left-1/2 bottom-[26px] z-[140] bg-p4 text-[#06210f] px-5 py-3.5 border-[3px] border-line rounded-[4px] text-[10px] text-center shadow-[5px_5px_0_var(--line)] transition-all duration-300 ${
        toastMessage ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      style={{ transform: toastMessage ? 'translate(-50%, 0)' : 'translate(-50%, 30px)' }}
    >
      {toastMessage}
    </div>
  );
}
