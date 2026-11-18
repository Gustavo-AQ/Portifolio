import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

export function useTranslations(lang: Lang) {
  return function t<K extends UIKey>(key: K): (typeof ui)['pt'][K] {
    return (ui[lang][key] ?? ui[defaultLang][key]) as (typeof ui)['pt'][K];
  };
}

/** Prefixo de URL do idioma ('' para o idioma padrão). */
export function langPrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

export function homeUrl(lang: Lang): string {
  return `${langPrefix(lang)}/`;
}

const projectSegment: Record<Lang, string> = { pt: 'projetos', en: 'projects' };
const aiSegment: Record<Lang, string> = { pt: 'ia', en: 'ai' };

export function projectUrl(lang: Lang, slug: string): string {
  return `${langPrefix(lang)}/${projectSegment[lang]}/${slug}/`;
}

export function aiPageUrl(lang: Lang): string {
  return `${langPrefix(lang)}/${aiSegment[lang]}/`;
}

export function markdownUrl(lang: Lang): string {
  return `${langPrefix(lang)}/portfolio.md`;
}

export const allLangs = Object.keys(languages) as Lang[];

/** Mapa idioma -> URL equivalente, usado no seletor de idioma e nas tags hreflang. */
export type Alternates = Partial<Record<Lang, string>>;
