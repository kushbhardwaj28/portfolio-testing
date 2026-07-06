import { usePortfolio } from '@/context/PortfolioContext';

export function CoinLayer() {
  const { coins } = usePortfolio();
  return (
    <div className="fixed inset-0 z-[130] pointer-events-none overflow-hidden">
      {coins.map((c) => (
        <div
          key={c.id}
          className="absolute coin-fall"
          style={{
            left: `${c.left}vw`,
            top: '-40px',
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        >
          <c.Icon className="w-[22px] h-[22px]" />
        </div>
      ))}
    </div>
  );
}
