import type { Lang } from '../i18n/ui';

type L<T = string> = Record<Lang, T>;

export const site = {
  url: 'https://me.gaqtech.dev',
  name: 'Gustavo Quinup',
  shortName: 'GQ',
  email: 'gustavoaquinup@gmail.com',
  linkedin: 'https://www.linkedin.com/in/gustavoaquinup2005/',
  github: 'https://github.com/Gustavo-AQ',
  cv: 'https://drive.google.com/file/d/1g14usUos8zd0Ma1ZNJJjPpqKmOqmipvI/view?usp=sharing',
  /** Google Analytics 4 */
  gaId: 'G-PG7DWB3S52',
  /**
   * Chave pública do Web3Forms (https://web3forms.com).
   * Ela foi feita para ficar no HTML; não é um segredo.
   * Enquanto estiver vazia, o formulário mostra o e-mail como alternativa.
   */
  web3formsKey: '',
  location: { pt: 'Zona Norte, São Paulo, SP, Brasil', en: 'São Paulo, Brazil' } as L,
};

export const about: { paragraphs: L<string[]>; facts: { key: 'degree' | 'city' | 'email' | 'born'; value: L }[] } = {
  paragraphs: {
    pt: [
      'Estudante de Engenharia da Computação (9º semestre, conclusão em 2026) com experiência prática em Legal Tech, automação de processos e Inteligência Artificial.',
      'Como Estagiário de Análise de Sistemas na Caique Castro Advocacia, desenvolvi sistemas em produção com Python, FastAPI e OpenAI, incluindo uma plataforma desktop com 6 módulos ativos usada diariamente pelo escritório e um módulo de IA que reduziu em cerca de 70% o tempo de elaboração de petições iniciais, gerando de 50 a 100 documentos por ciclo.',
      'Hoje construo produtos próprios com React, Python, n8n e Docker, hospedados no meu servidor ARM com Coolify.',
    ],
    en: [
      'Computer Engineering student (9th semester, graduating in 2026) with hands-on experience in Legal Tech, process automation and Artificial Intelligence.',
      'As a Systems Analyst Intern at Caique Castro Advocacia, I built production systems with Python, FastAPI and OpenAI, including a desktop platform with 6 active modules used daily by the firm and an AI module that cut the time to draft initial legal petitions by about 70%, generating 50 to 100 documents per cycle.',
      'Today I build my own products with React, Python, n8n and Docker, hosted on my ARM server with Coolify.',
    ],
  },
  facts: [
    { key: 'degree', value: { pt: 'Engenharia da Computação', en: 'Computer Engineering' } },
    { key: 'city', value: { pt: 'São Paulo, Brasil', en: 'São Paulo, Brazil' } },
    { key: 'email', value: { pt: site.email, en: site.email } },
    { key: 'born', value: { pt: '2003', en: '2003' } },
  ],
};

export const interests: { icon: string; label: L }[] = [
  { icon: 'bx-code-alt', label: { pt: 'Desenvolvimento de Software', en: 'Software Development' } },
  { icon: 'bx-brain', label: { pt: 'Machine Learning', en: 'Machine Learning' } },
  { icon: 'bx-camera', label: { pt: 'Visão Computacional', en: 'Computer Vision' } },
  { icon: 'bx-message-square-dots', label: { pt: 'Processamento de Linguagem Natural', en: 'Natural Language Processing' } },
  { icon: 'bx-cloud', label: { pt: 'Computação em Nuvem', en: 'Cloud Computing' } },
  { icon: 'bx-bar-chart-alt-2', label: { pt: 'Análise de Dados', en: 'Data Analysis' } },
  { icon: 'bx-shield-quarter', label: { pt: 'Segurança da Informação', en: 'Information Security' } },
  { icon: 'bx-bot', label: { pt: 'Automações', en: 'Automation' } },
  { icon: 'bx-pie-chart-alt-2', label: { pt: 'Business Intelligence', en: 'Business Intelligence' } },
];

export interface ExperienceGroup {
  title: L;
  items: L<string[]>;
}
export interface Experience {
  company: string;
  url: string;
  period: L;
  role: L;
  summary: L;
  groups: ExperienceGroup[];
}

export const experience: Experience[] = [
  {
    company: 'Caique Castro, Sociedade de Advocacia',
    url: 'https://www.caiquecastro.adv.br/',
    period: { pt: 'Mar 2025 – Abr 2026', en: 'Mar 2025 – Apr 2026' },
    role: {
      pt: 'Estagiário de Análise de Sistemas | Legal Ops Tech',
      en: 'Systems Analyst Intern | Legal Ops Tech',
    },
    summary: {
      pt: 'Governança de dados, administração de sistemas e desenvolvimento de automações com IA para a operação jurídica.',
      en: 'Data governance, systems administration and AI-powered automation for legal operations.',
    },
    groups: [
      {
        title: { pt: 'Administração de BD & Sistema CPJ-3C', en: 'Database administration & CPJ-3C system' },
        items: {
          pt: [
            'Administração do banco MariaDB/MySQL em ambiente AWS, com views, procedures, triggers e events que validam, formatam e corrigem dados na inserção, eliminando inconsistências e retrabalho.',
            'Trigger que bloqueia a exclusão de fichas por usuários sem permissão ADM: qualquer remoção exige chamado com justificativa e análise jurídica prévia.',
            'Views especializadas para a equipe de Power BI, com regras de negócio jurídicas para análise gerencial.',
            'Gestão de níveis de acesso e configurações do CPJ-3C para todo o escritório, atuando como referência técnica do sistema.',
          ],
          en: [
            'Administered the MariaDB/MySQL database on AWS, with views, procedures, triggers and events that validate, format and fix data on insert, removing inconsistencies and rework.',
            'Built a trigger that blocks record deletion by non-admin users: any removal requires a ticket with justification and prior legal review.',
            'Created specialized views for the Power BI team, encoding legal business rules for management reporting.',
            'Managed access levels and CPJ-3C settings for the whole firm, acting as the technical reference for the system.',
          ],
        },
      },
      {
        title: { pt: 'Desenvolvimento de Projetos & Automações', en: 'Projects & automation' },
        items: {
          pt: [
            'Legal-HUB (Nov 2025 a Mar 2026): plataforma desktop de automações jurídicas com PyWebView e Python, 6 módulos ativos (análise de laudos por IA, geração de petições, conversão PDF para Excel, relatórios de conformidade) e autenticação LDAP. Responsável por cerca de 70% do desenvolvimento.',
            'Módulo IA_PET_INICIAL: analisa até 6 PDFs e gera petições iniciais completas em DOCX via OpenAI, com redução de cerca de 70% no tempo de elaboração e 50 a 100 documentos por ciclo.',
            'Calculadora de Benefícios Previdenciários: aplicação web full stack (Python, FastAPI, REST API) com correção monetária INPC, juros de mora configuráveis e PDF profissional; deploy em produção com Nginx e Systemd no Linux.',
          ],
          en: [
            'Legal-HUB (Nov 2025 to Mar 2026): desktop platform for legal automation built with PyWebView and Python, 6 active modules (AI report analysis, petition generation, PDF to Excel conversion, compliance reports) and LDAP authentication. Responsible for about 70% of the development.',
            'IA_PET_INICIAL module: analyzes up to 6 PDFs and generates complete initial petitions in DOCX via OpenAI, cutting drafting time by about 70% and producing 50 to 100 documents per cycle.',
            'Social Security Benefits Calculator: full stack web app (Python, FastAPI, REST API) with INPC monetary correction, configurable interest and professional PDF output; deployed to production with Nginx and Systemd on Linux.',
          ],
        },
      },
    ],
  },
  {
    company: 'Digital Innovation One (DIO)',
    url: 'https://www.dio.me/',
    period: { pt: 'Ago 2024 – Set 2024', en: 'Aug 2024 – Sep 2024' },
    role: { pt: 'Embaixador DIO Campus Expert', en: 'DIO Campus Expert Ambassador' },
    summary: {
      pt: 'Representante da plataforma na universidade, promovendo tecnologia e liderança estudantil.',
      en: 'Represented the platform at my university, promoting technology and student leadership.',
    },
    groups: [
      {
        title: { pt: 'Atividades', en: 'Activities' },
        items: {
          pt: [
            'Selecionado para representar a plataforma na universidade, promovendo tecnologia, liderança e participando de mentorias com profissionais do mercado.',
            'Desafios de liderança, resolução de problemas tecnológicos e desenvolvimento de protagonismo no mercado de trabalho.',
            'Referência para outros estudantes interessados em se destacar na área de tecnologia.',
          ],
          en: [
            'Selected to represent the platform at my university, promoting technology and leadership and joining mentoring sessions with industry professionals.',
            'Took on leadership challenges, technical problem solving and career development activities.',
            'Served as a reference for other students looking to stand out in tech.',
          ],
        },
      },
    ],
  },
];

export interface Education {
  institution: string;
  logo: 'anhanguera' | 'dominante';
  degree: L;
  period: L;
  note?: L;
  courses?: L<string[]>;
}

export const education: Education[] = [
  {
    institution: 'Universidade Anhanguera',
    logo: 'anhanguera',
    degree: { pt: 'Bacharelado em Engenharia da Computação', en: "Bachelor's in Computer Engineering" },
    period: { pt: 'Jan 2022 – Previsão 2026', en: 'Jan 2022 – Expected 2026' },
    note: { pt: '9º semestre', en: '9th semester' },
    courses: {
      pt: ['Banco de Dados Distribuídos', 'Computação em Nuvem', 'Fundamentos de Algoritmos', 'Hardware e IoT', 'Segurança da Informação'],
      en: ['Distributed Databases', 'Cloud Computing', 'Algorithm Fundamentals', 'Hardware & IoT', 'Information Security'],
    },
  },
  {
    institution: 'Colégio Dominante',
    logo: 'dominante',
    degree: { pt: 'Ensino Médio Completo', en: 'High School Diploma' },
    period: { pt: 'Jan 2019 – Dez 2021', en: 'Jan 2019 – Dec 2021' },
  },
];

export const certifications: { name: L; issuer: string; url: string; tone: 'azure' | 'db' | 'ml' }[] = [
  { name: { pt: 'Azure AI', en: 'Azure AI' }, issuer: 'DIO', url: 'https://www.dio.me/certificate/0WKHA92I/share', tone: 'azure' },
  { name: { pt: 'Banco de Dados', en: 'Databases' }, issuer: 'DIO', url: 'https://www.dio.me/certificate/WE7ZH8DS/share', tone: 'db' },
  {
    name: { pt: 'Machine Learning com Python', en: 'Machine Learning with Python' },
    issuer: 'DIO',
    url: 'https://www.dio.me/certificate/721AJ79L/share',
    tone: 'ml',
  },
];

export type Tier = 'adv' | 'int' | 'bas';
export interface Skill {
  name: string;
  /** Arquivo em /public/img/skills ou caminho absoluto */
  icon: string;
}

export const skillGroups: { title: L; tiers: Partial<Record<Tier, Skill[]>> }[] = [
  {
    title: { pt: 'Linguagens & Dados', en: 'Languages & Data' },
    tiers: {
      adv: [
        { name: 'Python', icon: 'python' },
        { name: 'MySQL / MariaDB', icon: 'mysql' },
      ],
      int: [
        { name: 'JavaScript', icon: 'javascript' },
        { name: 'TypeScript', icon: 'typescript' },
        { name: 'HTML5', icon: 'html5' },
        { name: 'CSS3', icon: 'css3' },
        { name: 'PostgreSQL', icon: 'postgresql' },
      ],
      bas: [
        { name: 'MongoDB', icon: 'mongodb' },
        { name: 'C# / .NET', icon: 'dotnetcore' },
      ],
    },
  },
  {
    title: { pt: 'Tecnologias & Ferramentas', en: 'Technologies & Tools' },
    tiers: {
      adv: [
        { name: 'Git', icon: 'git' },
        { name: 'OpenAI', icon: '/img/logos/openai.svg' },
        { name: 'AWS', icon: 'amazonwebservices' },
        { name: 'Linux', icon: 'linux' },
      ],
      int: [
        { name: 'Docker', icon: 'docker' },
        { name: 'n8n', icon: 'n8n' },
        { name: 'Azure', icon: 'azure' },
        { name: 'Jupyter', icon: 'jupyter' },
      ],
      bas: [{ name: 'Google Cloud', icon: 'googlecloud' }],
    },
  },
  {
    title: { pt: 'Frameworks & Bibliotecas', en: 'Frameworks & Libraries' },
    tiers: {
      adv: [{ name: 'FastAPI', icon: 'fastapi' }],
      int: [
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Django', icon: 'django' },
        { name: 'Scikit-learn', icon: 'scikitlearn' },
        { name: 'Tailwind CSS', icon: 'tailwindcss' },
        { name: 'Bootstrap', icon: 'bootstrap' },
      ],
      bas: [{ name: 'Node.js', icon: 'nodejs' }],
    },
  },
];

export const methods = ['Scrum / Kanban', 'Notion', 'Trello', 'n8n', 'Make'];

export const spokenLanguages: { name: L; level: L }[] = [
  { name: { pt: 'Português', en: 'Portuguese' }, level: { pt: 'Nativo', en: 'Native' } },
  { name: { pt: 'Inglês', en: 'English' }, level: { pt: 'Intermediário', en: 'Intermediate' } },
  { name: { pt: 'Espanhol', en: 'Spanish' }, level: { pt: 'Básico', en: 'Basic' } },
  { name: { pt: 'Francês', en: 'French' }, level: { pt: 'Básico', en: 'Basic' } },
];
