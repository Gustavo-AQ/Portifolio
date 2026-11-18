import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/** Todos os projetos, ordenados pelo campo `order`. */
export async function getProjects(): Promise<Project[]> {
  const items = await getCollection('projects');
  return items.sort((a, b) => a.data.order - b.data.order);
}

export async function getFeatured(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

/**
 * O catálogo abaixo dos destaques mostra os demais projetos, sem repetir os destaques.
 * Mude para `true` se preferir que o catálogo liste todos os projetos.
 */
export const CATALOG_INCLUDES_FEATURED = false;

/** Quantidade de projetos por página no catálogo. */
export const CATALOG_PAGE_SIZE = 3;

export async function getCatalog(): Promise<Project[]> {
  const all = await getProjects();
  return CATALOG_INCLUDES_FEATURED ? all : all.filter((p) => !p.data.featured);
}
