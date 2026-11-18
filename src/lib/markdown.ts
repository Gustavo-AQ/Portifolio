import type { Lang } from '../i18n/ui';
import { useTranslations, projectUrl, homeUrl, markdownUrl } from '../i18n/utils';
import { site, about, experience, education, certifications, skillGroups, methods, spokenLanguages, skillName } from '../data/profile';
import { getProjects } from './projects';

const abs = (path: string) => new URL(path, site.url).href;

/**
 * Gera o portfólio completo em Markdown, a partir dos mesmos dados do site.
 * Usado em /portfolio.md, /en/portfolio.md, /llms-full.txt e na página "Versão para IA".
 */
export async function buildPortfolioMarkdown(lang: Lang): Promise<string> {
  const t = useTranslations(lang);
  const projects = await getProjects();
  const L = (pt: string, en: string) => (lang === 'pt' ? pt : en);
  const out: string[] = [];

  out.push(`# ${site.name}`);
  out.push('');
  out.push(`> ${t('meta.description')}`);
  out.push('');
  out.push(`- ${L('Site', 'Website')}: ${abs(homeUrl(lang))}`);
  out.push(`- ${L('E-mail', 'Email')}: ${site.email}`);
  out.push(`- LinkedIn: ${site.linkedin}`);
  out.push(`- GitHub: ${site.github}`);
  out.push(`- ${t('nav.cv')}: ${site.cv}`);
  out.push(`- ${L('Localização', 'Location')}: ${site.location[lang]}`);
  out.push(`- ${L('Status', 'Status')}: ${t('hero.badge')}`);
  out.push('');

  out.push(`## ${t('about.title')}`);
  out.push('');
  about.paragraphs[lang].forEach((p) => out.push(p, ''));

  out.push(`## ${t('experience.title')}`);
  out.push('');
  for (const job of experience) {
    out.push(`### ${job.role[lang]} | ${job.company}`);
    out.push([job.period[lang], job.location, job.url].filter(Boolean).join(' · '));
    out.push('');
    out.push(job.summary[lang]);
    out.push('');
    for (const g of job.groups) {
      out.push(`**${g.title[lang]}**`);
      g.items[lang].forEach((i) => out.push(`- ${i}`));
      out.push('');
    }
  }

  out.push(`## ${t('projects.title')}`);
  out.push('');
  for (const p of projects) {
    const d = p.data;
    const tags = [
      t(`projects.status.${d.status}`),
      t(`projects.category.${d.category}`),
      d.private ? t('projects.private') : null,
      d.featured ? t('projects.featured') : null,
    ].filter(Boolean);
    out.push(`### ${d.title[lang]}`);
    out.push(`${tags.join(' · ')}`);
    out.push('');
    out.push(d.summary[lang]);
    out.push('');
    out.push(`- ${t('project.problem')}: ${d.problem[lang]}`);
    if (d.stack.length) out.push(`- ${t('project.stack')}: ${d.stack.join(', ')}`);
    if (d.metrics) out.push(`- ${L('Números', 'Numbers')}: ${d.metrics.map((m) => `${m.value} ${m.label[lang]}`).join('; ')}`);
    if (d.results) out.push(`- ${t('project.results')}: ${d.results[lang].join(' ')}`);
    out.push(`- ${t('project.features')}: ${d.features[lang].join(' ')}`);
    if (d.links.demo) out.push(`- ${t('project.demo')}: ${d.links.demo}`);
    if (d.links.store) out.push(`- ${t('project.store')}: ${d.links.store}`);
    if (d.links.repo) out.push(`- GitHub: ${d.links.repo}`);
    out.push(`- ${L('Detalhes', 'Details')}: ${abs(projectUrl(lang, p.id))}`);
    out.push('');
  }

  out.push(`## ${t('skills.title')}`);
  out.push('');
  for (const g of skillGroups) {
    const parts = (['adv', 'int', 'bas'] as const)
      .filter((tier) => g.tiers[tier])
      .map((tier) => `${t(`skills.${tier}`)}: ${g.tiers[tier]!.map((s) => skillName(s, lang)).join(', ')}`);
    out.push(`- **${g.title[lang]}**: ${parts.join(' | ')}`);
  }
  out.push(`- **${t('skills.methods')}**: ${methods.join(', ')}`);
  out.push(`- **${t('skills.languages')}**: ${spokenLanguages.map((l) => `${l.name[lang]} (${l.level[lang]})`).join(', ')}`);
  out.push('');

  out.push(`## ${t('education.title')}`);
  out.push('');
  for (const e of education) {
    out.push(`- ${e.degree[lang]}, ${e.institution} (${e.period[lang]}${e.note ? `, ${e.note[lang]}` : ''})`);
  }
  out.push('');
  out.push(`### ${t('education.certs')}`);
  certifications.forEach((c) =>
    out.push(`- ${c.name[lang]} (${[c.issuer, c.date?.[lang], c.hours ? `${c.hours}h` : null].filter(Boolean).join(', ')})${c.url ? `: ${c.url}` : ''}`),
  );
  out.push('');

  out.push('---');
  out.push(
    L(
      `Versão em inglês: ${abs(markdownUrl('en'))}`,
      `Portuguese version: ${abs(markdownUrl('pt'))}`,
    ),
  );
  out.push('');
  return out.join('\n');
}

/** Índice no formato llms.txt (https://llmstxt.org). */
export async function buildLlmsTxt(): Promise<string> {
  const projects = await getProjects();
  const featured = projects.filter((p) => p.data.featured);
  return [
    `# ${site.name}`,
    '',
    `> Python Developer and Computer Engineering student from São Paulo, Brazil, focused on generative AI, agents, integrations and automation. Portfolio available in Portuguese and English.`,
    '',
    'This site is a personal portfolio. The files below contain the full content in Markdown, generated from the same data as the website.',
    '',
    '## Machine-readable portfolio',
    '',
    `- [Portfolio in English (Markdown)](${abs(markdownUrl('en'))}): about, experience, all projects, skills and education`,
    `- [Portfólio em português (Markdown)](${abs(markdownUrl('pt'))}): sobre, experiência, todos os projetos, habilidades e formação`,
    `- [Full content, both languages](${abs('/llms-full.txt')})`,
    '',
    '## Featured projects',
    '',
    ...featured.map((p) => `- [${p.data.title.en}](${abs(projectUrl('en', p.id))}): ${p.data.summary.en}`),
    '',
    '## Pages',
    '',
    `- [Home (pt-BR)](${abs(homeUrl('pt'))})`,
    `- [Home (en)](${abs(homeUrl('en'))})`,
    '',
    '## Contact',
    '',
    `- Email: ${site.email}`,
    `- LinkedIn: ${site.linkedin}`,
    `- GitHub: ${site.github}`,
    '',
  ].join('\n');
}
