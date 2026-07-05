import { usePortfolio } from '@/context/PortfolioContext';
import { GamepadIcon, SunIcon, MoonIcon, SpeakerOnIcon, SpeakerOffIcon } from './icons/PixelIcons';

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#levels', label: 'Career' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

export function Nav() {
  const { theme, toggleTheme, muted, toggleMuted, openGame, hoverSfx } = usePortfolio();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-[8px] bg-[color-mix(in_srgb,var(--bg)_82%,transparent)] border-b-[3px] border-line">
      <div className="max-w-[1120px] mx-auto px-[22px] py-3 flex items-center justify-between gap-3.5">
        <div className="pix text-sm text-p1">
          K<b className="text-p2">▸</b>B
        </div>
        <div className="hidden min-[821px]:flex gap-5 items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="pix text-[9px] uppercase text-muted hover:text-p1 transition-colors"
              {...hoverSfx()}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex gap-2.5 items-center">
          {theme === 'dark' && (
            <button className="btn-icon pix" title="Insert coin — play" {...hoverSfx(() => openGame())}>
              <GamepadIcon className="w-5 h-5" />
            </button>
          )}
          <button className="btn-icon pix" title="Sound" {...hoverSfx(toggleMuted)}>
            {muted ? <SpeakerOffIcon className="w-5 h-5" /> : <SpeakerOnIcon className="w-5 h-5" />}
          </button>
          <button className="btn-icon pix" title="Theme" {...hoverSfx(toggleTheme)}>
            {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>
  );
}
