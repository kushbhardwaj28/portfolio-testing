import { projects } from '@/data';
import { PROJECT_ICONS } from './icons/PixelIcons';
import { SectionHeading } from './SectionHeading';

export function Projects() {
  const featured = projects.projects.filter((p) => p.featured);
  const rest = projects.projects.filter((p) => !p.featured);

  return (
    <section className="py-[66px] relative" id="projects">
      <SectionHeading number="04" title="Projects" />
      <div className="grid grid-cols-1 min-[821px]:grid-cols-2 gap-[22px]">
        {featured.map((project) => {
          const Icon = PROJECT_ICONS[project.icon];
          return (
            <div
              key={project.id}
              className="pixel-panel p-[22px] relative overflow-hidden transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--p2)] col-span-full grid grid-cols-1 min-[821px]:grid-cols-2 gap-[22px] items-center"
            >
              <div>
                <div className="pix text-[8px] text-p1 uppercase font-bold">{project.tag}</div>
                <div className="text-base font-extrabold my-1.5 mb-2 text-ink">{project.name}</div>
                <p className="text-sm text-muted mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span key={tech} className="text-[9px] text-ink border-2 border-line px-1.5 py-1 rounded-sm uppercase bg-p3">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div
                className="aspect-square rounded-[4px] border-4 border-line grid place-items-center shadow-[6px_6px_0_var(--line)] max-w-[180px] mx-auto min-[821px]:max-w-none"
                style={{ background: `var(--${project.accent})` }}
              >
                <Icon className="w-[92px] h-[92px] text-white" />
              </div>
            </div>
          );
        })}
        {rest.map((project) => {
          const Icon = PROJECT_ICONS[project.icon];
          return (
            <div
              key={project.id}
              className="pixel-panel p-[22px] relative overflow-hidden transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--p2)]"
            >
              <div className="mb-3 leading-none">
                <Icon className="w-[42px] h-[42px] inline-block" style={{ color: `var(--${project.accent})` }} />
              </div>
              <div className="pix text-[8px] text-p1 uppercase font-bold">{project.tag}</div>
              <div className="text-base font-extrabold my-1.5 mb-2 text-ink">{project.name}</div>
              <p className="text-sm text-muted mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
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
