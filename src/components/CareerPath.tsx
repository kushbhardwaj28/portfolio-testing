import type { CSSProperties } from 'react';
import { career } from '@/data';
import { tenurePercent, tenureLabel } from '@/lib/tenure';
import { SectionHeading } from './SectionHeading';

function accentVar(accent: string): CSSProperties {
  return { '--acc': `var(--${accent})` } as CSSProperties;
}

export function CareerPath() {
  const { totalYears, levels, heading } = career;

  return (
    <section className="py-[66px] relative" id="levels">
      <SectionHeading number="02" title={heading} />

      <div className="mb-9">
        <div className="pix flex justify-between text-[9px] text-muted uppercase mb-2">
          <span>Career Timeline</span>
          <span>{totalYears} Years XP</span>
        </div>
        <div className="grow-x flex h-6 border-[3px] border-line rounded-[4px] overflow-hidden shadow-[4px_4px_0_var(--line)]">
          {levels.map((level) => (
            <div
              key={level.id}
              className="h-full border-l-2 border-line first:border-l-0"
              style={{ flex: tenurePercent(level.tenureMonths, totalYears), background: `var(--${level.accent})` }}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mt-3.5">
          {levels.map((level) => (
            <span key={level.id} className="pix inline-flex items-center gap-1.5 text-[9px] text-ink uppercase">
              <i className="w-3 h-3 border-2 border-line rounded-sm inline-block" style={{ background: `var(--${level.accent})` }} />
              {level.company} · {tenurePercent(level.tenureMonths, totalYears)}%
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {levels.map((level) => {
          const percent = tenurePercent(level.tenureMonths, totalYears);
          return (
            <div
              key={level.id}
              className="pixel-panel level-card p-5 px-[22px] relative transition-transform"
              style={accentVar(level.accent)}
            >
              <div className="flex justify-between items-start gap-3.5 flex-wrap">
                <div>
                  <div className="pix text-[9px] text-muted uppercase">
                    Level {String(level.levelNumber).padStart(2, '0')} · {level.period}
                  </div>
                  <div className="text-[17px] font-extrabold text-ink mt-1 mb-0.5">{level.role}</div>
                  <div className="pix level-company text-[13px] font-semibold">
                    {level.company} · {level.location}
                  </div>
                </div>
                <span className="pix text-[8px] text-[#06210f] bg-p4 border-[3px] border-line px-2.5 py-1.5 rounded-[3px] uppercase whitespace-nowrap shadow-[3px_3px_0_var(--line)]">
                  {level.status === 'active' ? '◉ Active' : '✓ Cleared'}
                </span>
              </div>
              <p className="text-sm text-muted my-3">{level.description}</p>
              <div className="my-1 mb-3.5">
                <div className="h-3.5 bg-bg rounded-[3px] overflow-hidden border-[3px] border-line">
                  <div className="grow-x level-tenure-fill h-full" style={{ width: `${percent}%` }} />
                </div>
                <div className="pix flex justify-between text-[9px] text-muted mt-1.5 uppercase">
                  <span>Tenure</span>
                  <span>
                    {tenureLabel(level.tenureMonths)} · {percent}%
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {level.stack.map((tech) => (
                  <span key={tech} className="text-[9px] text-ink border-2 border-line px-1.5 py-1 rounded-sm uppercase bg-p3">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
