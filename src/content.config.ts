import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const text = z.object({ pt: z.string(), en: z.string() });
const list = z.object({ pt: z.array(z.string()), en: z.array(z.string()) });

/**
 * Cada projeto é um arquivo em src/content/projects/<slug>.yaml.
 * O nome do arquivo vira a URL: /projetos/<slug>/ e /en/projects/<slug>/.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: text,
      summary: text,
      problem: text,
      features: list,
      results: list.optional(),
      metrics: z.array(z.object({ value: z.string(), label: text })).optional(),
      sections: z.array(z.object({ title: text, items: list })).optional(),
      notes: text.optional(),
      category: z.enum(['app', 'tool']),
      status: z.enum(['production', 'development', 'completed']),
      featured: z.boolean().default(false),
      private: z.boolean().default(false),
      /** Ordem de exibição (menor aparece primeiro) */
      order: z.number(),
      /** Ícone do Boxicons usado na capa gerada (ex.: bx-car) */
      icon: z.string(),
      /** Matiz (0 a 360) do degradê da capa */
      hue: z.number().min(0).max(360),
      stack: z.array(z.string()).default([]),
      links: z
        .object({
          repo: z.url().optional(),
          demo: z.url().optional(),
          store: z.url().optional(),
        })
        .default({}),
      /** Imagem de capa opcional; sem ela, uma capa é gerada com ícone e cor */
      cover: image().optional(),
      screenshots: z.array(z.object({ src: image(), alt: text })).optional(),
    }),
});

export const collections = { projects };
