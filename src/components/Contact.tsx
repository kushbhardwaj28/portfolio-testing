import { contact } from '@/data';
import { usePortfolio } from '@/context/PortfolioContext';
import type { ContactIconKey } from '@/types/portfolio';

const GLYPH: Partial<Record<ContactIconKey, string>> = {
  email: '✉',
  github: '◈',
  download: '⤓',
};

export function Contact() {
  const { hoverSfx } = usePortfolio();

  return (
    <section className="py-[66px] relative" id="contact">
      <div className="text-center bg-p3 border-4 border-line rounded-[6px] px-6 py-[46px] shadow-[8px_8px_0_var(--line)]">
        <div className="pix text-p1 text-[8px] uppercase font-bold">{contact.eyebrow}</div>
        <h2 className="pix name-glow my-0 mb-2" style={{ fontSize: 'clamp(18px, 5vw, 34px)' }}>
          {contact.heading}
        </h2>
        <p className="pix text-[12px] text-ink uppercase font-bold blink-caret">{contact.prompt}</p>
        <div className="flex flex-wrap gap-4 justify-center mt-6.5">
          {contact.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              download={link.download}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className={`btn-pixel pix ${link.style === 'primary' ? 'bg-p1 text-white' : 'bg-card text-ink'}`}
              {...hoverSfx()}
            >
              {GLYPH[link.icon] ? `${GLYPH[link.icon]} ` : ''}
              {link.label}
            </a>
          ))}
        </div>
      </div>
      <div className="pix text-center pt-[34px] pb-12 text-[10px] text-muted">
        {contact.footerNote}
        <div className="mt-2.5 text-[9px] opacity-80">{contact.konamiHint}</div>
      </div>
    </section>
  );
}
