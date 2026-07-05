import { useMemo } from 'react';
import { profile } from '@/data';
import { usePortfolio } from '@/context/PortfolioContext';
import { useGlitchTypewriter } from '@/hooks/useGlitchTypewriter';
import { renderHighlighted } from '@/lib/highlight';

export function Hero() {
  const { theme, hoverSfx } = usePortfolio();
  const nameLines = useMemo(() => [profile.name.first, profile.name.last], []);
  const [firstLine, lastLine] = useGlitchTypewriter(nameLines);
  const marqueeItems = [...profile.marquee, ...profile.marquee];

  return (
    <section className="min-h-[92vh] flex flex-col justify-center py-[70px] pb-[50px] relative" id="home">
      {theme === 'dark' ? (
        <div
          className="absolute top-20 right-[4%] w-[88px] h-[88px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, #fff, #c9b8ff 60%, #7a5cff)',
            boxShadow: '0 0 50px rgba(120,90,255,.7)',
          }}
        />
      ) : (
        <div className="absolute top-20 right-[2%] w-[104px] h-[104px] rounded-[3px] bg-p3 border-4 border-line shadow-[8px_8px_0_var(--line)]" />
      )}

      <div className="pix inline-flex items-center gap-2 text-[10px] text-ink border-[3px] border-line bg-p3 px-3.5 py-2 rounded-[3px] w-max uppercase shadow-[3px_3px_0_var(--line)]">
        <span className="w-[9px] h-[9px] bg-p4 border-2 border-line blink-caret" />
        {profile.badge}
      </div>

      <h1 className="pix mt-5 mb-1.5 name-glow" style={{ fontSize: 'clamp(30px, 8.5vw, 86px)' }}>
        <span>
          {firstLine.solid}
          <span className="text-p2 blink-caret" style={{ textShadow: 'none' }}>
            {firstLine.noise}_
          </span>
        </span>
        <br />
        <span>
          {lastLine.solid}
          <span className="text-p2 blink-caret" style={{ textShadow: 'none' }}>
            {lastLine.noise}_
          </span>
        </span>
      </h1>

      <p className="text-muted max-w-[640px]" style={{ fontSize: 'clamp(14px, 2.6vw, 20px)' }}>
        {renderHighlighted(profile.tagline, 'text-p1 font-bold')}
      </p>

      <div className="mt-6.5 overflow-hidden border-y-[3px] border-line py-2.5 bg-p2">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="pix text-[10px] text-white uppercase">
              <b className="text-p3">▸</b> {item}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-[30px]">
        <a href="#projects" className="btn-pixel pix bg-p1 text-white" {...hoverSfx()}>
          ▸ View Projects
        </a>
        <a href={profile.resumeUrl} download className="btn-pixel pix bg-card text-ink" {...hoverSfx()}>
          ⤓ Download Resume
        </a>
      </div>

      <div className="flex gap-4 flex-wrap mt-[34px]">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 border-[3px] border-line bg-card px-4 py-3 rounded-[3px] shadow-[3px_3px_0_var(--line)]">
            <div className="pix text-[22px] text-p1">{stat.value}</div>
            <div className="text-[8px] text-muted uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
