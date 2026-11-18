import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const cache = new Map<string, string>();

/**
 * Lê um ícone do Boxicons em tempo de build e devolve o SVG inline.
 * Nomes: "bx-car" (regular), "bxs-car" (solid), "bxl-github" (logos).
 */
export function getIcon(name: string): string {
  const cached = cache.get(name);
  if (cached) return cached;
  const folder = name.startsWith('bxl-') ? 'logos' : name.startsWith('bxs-') ? 'solid' : 'regular';
  const file = require.resolve(`boxicons/svg/${folder}/${name}.svg`);
  const svg = readFileSync(file, 'utf8')
    .replace(/\s(width|height)="[^"]*"/g, '')
    .replace('<svg', '<svg fill="currentColor" aria-hidden="true" focusable="false"');
  cache.set(name, svg);
  return svg;
}
