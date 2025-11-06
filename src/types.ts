export type Site = {
  name: string;
  handle: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resume: string;
  socials: { label: string; url: string }[];
  accent: 'green' | 'cyan' | 'purple';
  toggles: { scanlines: boolean; reducedMotion: boolean };
};

export type Skill = { name: string; level: number; category: string };

export type Experience = { title: string; company: string; start: string; end: string; bullets: string[] };

export type Education = { degree: string; school: string; start: string; end: string; details: string[] };

export type Certification = { title: string; org: string; year: string; blurb: string };

export type Project = { title: string; stack: string[]; summary: string; repo?: string; demo?: string; featured?: boolean };

export type Organization = { name: string; role: string; start: string; end: string; highlights: string[]; link?: string };
