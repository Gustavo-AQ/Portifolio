import type { APIRoute } from 'astro';
import { buildPortfolioMarkdown } from '../lib/markdown';

export const GET: APIRoute = async () => {
  const [en, pt] = await Promise.all([buildPortfolioMarkdown('en'), buildPortfolioMarkdown('pt')]);
  return new Response(`${en}\n\n${pt}`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
