import type { SVGProps } from 'react';

/** Hand-built pixel-art SVG icons (crisp-edged, theme-aware via currentColor). */

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 16 16',
  shapeRendering: 'crispEdges' as const,
  fill: 'currentColor',
};

export function SunIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="6" width="4" height="4" />
      <rect x="7" y="1" width="2" height="2" />
      <rect x="7" y="13" width="2" height="2" />
      <rect x="1" y="7" width="2" height="2" />
      <rect x="13" y="7" width="2" height="2" />
      <rect x="2" y="2" width="2" height="2" />
      <rect x="12" y="2" width="2" height="2" />
      <rect x="2" y="12" width="2" height="2" />
      <rect x="12" y="12" width="2" height="2" />
    </svg>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="5" y="2" width="5" height="2" />
      <rect x="3" y="4" width="3" height="2" />
      <rect x="2" y="6" width="2" height="4" />
      <rect x="3" y="10" width="3" height="2" />
      <rect x="5" y="12" width="5" height="2" />
      <rect x="7" y="4" width="2" height="1" />
      <rect x="9" y="5" width="2" height="1" />
    </svg>
  );
}

export function SpeakerOnIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="3" height="4" />
      <rect x="5" y="5" width="1" height="6" />
      <rect x="6" y="4" width="1" height="8" />
      <rect x="9" y="6" width="1" height="4" />
      <rect x="11" y="4" width="1" height="8" />
    </svg>
  );
}

export function SpeakerOffIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="3" height="4" />
      <rect x="5" y="5" width="1" height="6" />
      <rect x="6" y="4" width="1" height="8" />
      <rect x="9" y="5" width="1" height="1" />
      <rect x="10" y="6" width="1" height="1" />
      <rect x="11" y="7" width="2" height="1" />
      <rect x="10" y="8" width="1" height="1" />
      <rect x="9" y="9" width="1" height="1" />
      <rect x="12" y="5" width="1" height="1" />
      <rect x="9" y="6" width="1" height="1" />
    </svg>
  );
}

export function GamepadIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="5" width="12" height="7" />
      <rect x="0" y="7" width="2" height="4" />
      <rect x="14" y="7" width="2" height="4" />
      <g fill="rgba(0,0,0,.55)">
        <rect x="3" y="8" width="4" height="1" />
        <rect x="4" y="7" width="2" height="3" />
        <rect x="9" y="6" width="1" height="1" />
        <rect x="11" y="6" width="1" height="1" />
        <rect x="10" y="8" width="1" height="1" />
        <rect x="12" y="8" width="1" height="1" />
      </g>
    </svg>
  );
}

export function CoinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" {...props}>
      <rect x="4" y="2" width="8" height="12" fill="#f5b301" />
      <rect x="2" y="4" width="12" height="8" fill="#f5b301" />
      <rect x="5" y="3" width="6" height="10" fill="#ffcf4d" />
      <rect x="6" y="5" width="1" height="6" fill="#fff7d6" />
    </svg>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="#ffd23f" {...props}>
      <rect x="7" y="1" width="2" height="4" />
      <rect x="6" y="5" width="4" height="2" />
      <rect x="1" y="6" width="14" height="2" />
      <rect x="3" y="8" width="10" height="2" />
      <rect x="4" y="10" width="3" height="3" />
      <rect x="9" y="10" width="3" height="3" />
    </svg>
  );
}

export function GemIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="#4dc3ff" {...props}>
      <rect x="6" y="2" width="4" height="2" />
      <rect x="4" y="4" width="8" height="2" />
      <rect x="2" y="6" width="12" height="2" />
      <rect x="4" y="8" width="8" height="2" />
      <rect x="6" y="10" width="4" height="2" />
      <rect x="7" y="12" width="2" height="1" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" fill="#ff5d7a" {...props}>
      <rect x="3" y="3" width="4" height="2" />
      <rect x="9" y="3" width="4" height="2" />
      <rect x="2" y="5" width="12" height="3" />
      <rect x="4" y="8" width="8" height="2" />
      <rect x="6" y="10" width="4" height="2" />
      <rect x="7" y="12" width="2" height="1" />
    </svg>
  );
}

export const KONAMI_ICONS = [CoinIcon, StarIcon, GemIcon, HeartIcon];

/* ---------- project icons ---------- */

export function MedkitIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="2" width="4" height="2" />
      <rect x="2" y="4" width="12" height="9" />
      <g fill="#e0402b">
        <rect x="7" y="6" width="2" height="5" />
        <rect x="5" y="7" width="6" height="2" />
      </g>
    </svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="6" y="1" width="4" height="2" />
      <rect x="6" y="13" width="4" height="2" />
      <rect x="1" y="6" width="2" height="4" />
      <rect x="13" y="6" width="2" height="4" />
      <rect x="3" y="3" width="2" height="2" />
      <rect x="11" y="3" width="2" height="2" />
      <rect x="3" y="11" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
      <rect x="5" y="4" width="6" height="8" />
      <rect x="4" y="5" width="8" height="6" />
      <rect x="6" y="6" width="4" height="4" fill="var(--card)" />
    </svg>
  );
}

export function TranspilerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="4" width="9" height="2" />
      <rect x="10" y="2" width="1" height="1" />
      <rect x="11" y="3" width="1" height="1" />
      <rect x="12" y="4" width="1" height="2" />
      <rect x="11" y="6" width="1" height="1" />
      <rect x="10" y="7" width="1" height="1" />
      <rect x="5" y="10" width="9" height="2" />
      <rect x="5" y="8" width="1" height="1" />
      <rect x="4" y="9" width="1" height="1" />
      <rect x="3" y="10" width="1" height="2" />
      <rect x="4" y="12" width="1" height="1" />
      <rect x="5" y="13" width="1" height="1" />
    </svg>
  );
}

export function PuzzleIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3" width="5" height="5" />
      <rect x="7" y="4" width="2" height="3" />
      <rect x="9" y="3" width="5" height="5" />
      <rect x="2" y="8" width="5" height="6" />
      <rect x="9" y="8" width="5" height="6" />
      <rect x="7" y="10" width="2" height="2" fill="var(--card)" />
    </svg>
  );
}

export function TowerIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3" width="7" height="11" />
      <rect x="9" y="7" width="5" height="7" />
      <g fill="var(--card)">
        <rect x="3" y="5" width="2" height="2" />
        <rect x="6" y="5" width="2" height="2" />
        <rect x="3" y="9" width="2" height="2" />
        <rect x="6" y="9" width="2" height="2" />
        <rect x="10" y="9" width="2" height="2" />
        <rect x="10" y="12" width="2" height="2" />
      </g>
    </svg>
  );
}

/* ---------- arcade game picker icons ---------- */

export function SnakeGameIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="6" width="2" height="2" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="6" y="6" width="2" height="2" />
      <rect x="6" y="4" width="2" height="2" />
      <rect x="6" y="2" width="2" height="2" />
      <rect x="8" y="2" width="2" height="2" />
      <rect x="10" y="8" width="2" height="2" fill="#e0402b" />
    </svg>
  );
}

export function BreakoutGameIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="2" width="3" height="2" />
      <rect x="6" y="2" width="3" height="2" />
      <rect x="10" y="2" width="3" height="2" />
      <rect x="2" y="5" width="3" height="2" />
      <rect x="6" y="5" width="3" height="2" />
      <rect x="10" y="5" width="3" height="2" />
      <rect x="7" y="9" width="2" height="2" fill="#e0402b" />
      <rect x="4" y="13" width="8" height="2" />
    </svg>
  );
}

export const PROJECT_ICONS = {
  medkit: MedkitIcon,
  gear: GearIcon,
  transpiler: TranspilerIcon,
  puzzle: PuzzleIcon,
  tower: TowerIcon,
} as const;
