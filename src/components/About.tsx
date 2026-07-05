import { profile } from '@/data';
import { renderHighlighted } from '@/lib/highlight';
import { SectionHeading } from './SectionHeading';

export function About() {
  return (
    <section className="py-[66px] relative" id="about">
      <SectionHeading number="01" title="About" />
      <div className="grid grid-cols-1 min-[821px]:grid-cols-[1.4fr_1fr] gap-[34px] items-start">
        <div>
          {profile.about.paragraphs.map((p, i) => (
            <p key={i} className="text-base text-muted mb-4 last:mb-0">
              {renderHighlighted(p, 'text-ink font-bold')}
            </p>
          ))}
        </div>
        <div className="pixel-panel p-5">
          <h4 className="pix text-[10px] text-p1 uppercase mb-3.5">▸ Player Card</h4>
          {profile.about.playerCard.map((row) => (
            <div key={row.label} className="flex justify-between py-2.5 border-b-2 border-dashed border-line last:border-b-0 text-sm">
              <span className="text-muted">{row.label}</span>
              <b className="text-ink">{row.value}</b>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
