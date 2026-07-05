/** Accent color slots — map to CSS custom properties --p1..--p4, themed per light/dark mode. */
export type AccentKey = 'p1' | 'p2' | 'p3' | 'p4';

export interface HeroStat {
  value: string;
  label: string;
}

export interface PlayerCardRow {
  label: string;
  value: string;
}

export interface ProfileData {
  name: { first: string; last: string };
  badge: string;
  role: string;
  experienceYears: number;
  tagline: string;
  marquee: string[];
  stats: HeroStat[];
  about: {
    paragraphs: string[];
    playerCard: PlayerCardRow[];
  };
  resumeUrl: string;
}

export type LevelStatus = 'active' | 'cleared';

export interface CareerLevel {
  id: string;
  levelNumber: number;
  period: string;
  role: string;
  company: string;
  location: string;
  status: LevelStatus;
  description: string;
  tenureMonths: number;
  stack: string[];
  accent: AccentKey;
}

export interface CareerData {
  heading: string;
  totalYears: number;
  levels: CareerLevel[];
}

export interface CoreStat {
  name: string;
  level: number; // 1-5 pips
  label: string; // MASTER / PRO / ADV
}

export interface SkillsData {
  coreStats: CoreStat[];
  inventory: string[];
}

export type ProjectIconKey = 'medkit' | 'gear' | 'transpiler' | 'puzzle' | 'tower';

export interface ProjectItem {
  id: string;
  featured: boolean;
  tag: string;
  name: string;
  description: string;
  stack: string[];
  icon: ProjectIconKey;
  accent: AccentKey;
}

export interface ProjectsData {
  projects: ProjectItem[];
}

export type ContactIconKey = 'email' | 'linkedin' | 'github' | 'download';

export interface ContactLink {
  label: string;
  href: string;
  icon: ContactIconKey;
  style: 'primary' | 'secondary';
  download?: boolean;
  external?: boolean;
}

export interface ContactData {
  eyebrow: string;
  heading: string;
  prompt: string;
  links: ContactLink[];
  footerNote: string;
  konamiHint: string;
}
