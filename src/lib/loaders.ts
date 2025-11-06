import yaml from 'js-yaml';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

export function parseYaml<T>(raw: string): T {
  return yaml.load(raw) as T;
}

export function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export async function readYamlFromContent<T>(filename: string): Promise<T> {
  const here = dirname(fileURLToPath(import.meta.url));
  const root = resolve(here, '../../');
  const file = resolve(root, `content/${filename}`);
  const raw = await readFile(file, 'utf8');
  return parseYaml<T>(raw);
}

export function deriveOrgTag(name: string, role: string): 'Leadership' | 'Community' | 'Professional' {
  const r = role.toLowerCase();
  if (/(lead|chair|president|captain|head)/.test(r)) return 'Leadership';
  if (/(community|open source|meetup|ngo|nonprofit|volunteer)/.test(r) || /(community|foundation|open)/.test(name.toLowerCase())) return 'Community';
  return 'Professional';
}
