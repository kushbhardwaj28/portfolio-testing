import { skills } from '@/data';
import { SectionHeading } from './SectionHeading';

const MAX_PIPS = 5;

export function Skills() {

  return (
    <section className="py-[66px] relative" id="skills">
      <SectionHeading number="03" title="Power-Ups" />
      <div className="grid grid-cols-1 min-[821px]:grid-cols-2 gap-[22px]">
        <div className="pixel-panel p-5">
          <h4 className="pix text-[10px] text-p1 uppercase mb-3.5">▸ Core Stats</h4>
          {skills.coreStats.map((stat) => (
            <div key={stat.name} className="mb-3.5 last:mb-0">
              <div className="pix flex justify-between text-[10px] uppercase mb-1.5 text-ink">
                <span>{stat.name}</span>
                <span className="text-p1">{stat.label}</span>
              </div>
              <div className="flex gap-1.5">
                {Array.from({ length: MAX_PIPS }, (_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-4 rounded-sm border-2 border-line ${i < stat.level ? 'bg-p4' : 'bg-bg'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pixel-panel p-5">
          <h4 className="pix text-[10px] text-p1 uppercase mb-3.5">▸ Inventory</h4>
          <div className="flex flex-wrap gap-2.5">
            {skills.inventory.map((item) => (
              <span key={item} className="chip-pixel pix">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
