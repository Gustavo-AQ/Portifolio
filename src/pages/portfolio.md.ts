import type { APIRoute } from 'astro';
import { buildPortfolioMarkdown } from '../lib/markdown';

export const GET: APIRoute = async () =>
  new Response(await buildPortfolioMarkdown('pt'), { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
