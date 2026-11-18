# Como atualizar o portfólio

Guia rápido para alterar informações, textos e projetos do site **me.gaqtech.dev**.

## A ideia principal: cada informação fica em um lugar só

Não são 3 lugares. Cada informação é escrita **uma vez**, num único arquivo, com a versão em português (`pt`) e em inglês (`en`) lado a lado:

```ts
role: {
  pt: 'Estagiário de Análise de Sistemas',
  en: 'Systems Analyst Intern',
},
```

A partir desses arquivos, o build gera tudo sozinho:

| O que é gerado | Endereço |
|---|---|
| Site em português | `me.gaqtech.dev/` |
| Site em inglês | `me.gaqtech.dev/en/` |
| Texto para IA | `/portfolio.md`, `/en/portfolio.md`, `/llms.txt`, `/llms-full.txt` e a página `/ia/` |
| Sitemap, dados para o Google e páginas de projeto | automático |

Ou seja: **o texto para IA nunca é editado à mão**. Basta atualizar o português e o inglês no mesmo arquivo.

> Regra de estilo: não use o travessão "—" nos textos. Use vírgula, ponto ou dois-pontos. O traço curto "–" só aparece em períodos de datas (ex.: `Mar 2025 – Abr 2026`).

---

## Onde fica cada coisa

| Quero alterar... | Arquivo |
|---|---|
| E-mail, LinkedIn, GitHub, link do currículo, cidade | `src/data/profile.ts`, bloco `site` |
| Texto do "Sobre" e os cartões (formação, cidade, e-mail, nascimento) | `src/data/profile.ts`, bloco `about` |
| Interesses | `src/data/profile.ts`, bloco `interests` |
| Experiências profissionais | `src/data/profile.ts`, bloco `experience` |
| Faculdade, escola, semestre | `src/data/profile.ts`, bloco `education` |
| Certificações | `src/data/profile.ts`, bloco `certifications` |
| Habilidades e níveis (avançado, intermediário, básico) | `src/data/profile.ts`, bloco `skillGroups` |
| Metodologias e idiomas | `src/data/profile.ts`, blocos `methods` e `spokenLanguages` |
| Projetos | `src/content/projects/<nome-do-projeto>.yaml` (um arquivo por projeto) |
| Textos fixos da interface (menu, botões, frase do hero, selo "Aberto a oportunidades") | `src/i18n/ui.ts` |
| Foto de perfil | `src/assets/img/profile.jpg` |
| Imagem de compartilhamento (LinkedIn, WhatsApp) | `public/og.png` (1200x630) |
| Chave do formulário (Web3Forms) e ID do Google Analytics | `src/data/profile.ts`, bloco `site` |

---

## Tarefas comuns

### Mudar o semestre da faculdade

Em `src/data/profile.ts`, altere em dois lugares:

1. No bloco `education`, o campo `note`: `{ pt: '10º semestre', en: '10th semester' }`
2. No bloco `about`, no primeiro parágrafo (`pt` e `en`), onde aparece "(10º semestre, ...)"

### Adicionar uma experiência

Em `src/data/profile.ts`, dentro de `experience`, copie um bloco e cole **no topo** da lista (a primeira aparece primeiro no site):

```ts
{
  company: 'Nome da Empresa',
  url: 'https://site-da-empresa.com.br/', // opcional
  location: 'São Paulo, SP',               // opcional
  period: { pt: 'Jan 2027 – atual', en: 'Jan 2027 – present' },
  role: { pt: 'Cargo em português', en: 'Role in English' },
  summary: {
    pt: 'Resumo de uma linha do que você faz.',
    en: 'One line summary of what you do.',
  },
  groups: [
    {
      title: { pt: 'Principais atividades', en: 'Main activities' },
      items: {
        pt: ['Atividade 1.', 'Atividade 2.'],
        en: ['Activity 1.', 'Activity 2.'],
      },
    },
  ],
},
```

Se não quiser o botão "Ver detalhes", deixe `groups: []`.

Quando um emprego terminar, troque `atual`/`present` pelo mês de saída.

### Adicionar uma certificação

Em `certifications`, adicione uma linha:

```ts
{ name: { pt: 'Nome do curso', en: 'Course name' }, issuer: 'DIO', url: 'https://link-do-certificado', tone: 'ml' },
```

O campo `tone` define a cor da borda: `azure` (azul), `db` (laranja) ou `ml` (verde).

### Adicionar ou mudar o nível de uma habilidade

Em `skillGroups`, mova a habilidade entre `adv` (avançado), `int` (intermediário) e `bas` (básico), ou adicione uma nova:

```ts
{ name: 'Docker', icon: 'docker' },
```

O `icon` é o nome de um arquivo em `public/img/skills/` (sem o `.svg`). Para uma tecnologia nova, baixe o SVG em [devicon.dev](https://devicon.dev) e salve nessa pasta.

### Adicionar um projeto

1. Copie um arquivo de `src/content/projects/` (ex.: `gaq-tools.yaml`) e renomeie. **O nome do arquivo vira a URL**: `meu-projeto.yaml` vira `/projetos/meu-projeto/`.
2. Preencha os campos. Os principais:

| Campo | O que é |
|---|---|
| `title`, `summary`, `problem` | Título, resumo do card (1 ou 2 frases) e o problema que resolve, em `pt` e `en` |
| `features` | Lista do que o projeto faz, em `pt` e `en` |
| `results` | Resultados (opcional) |
| `metrics` | Números em destaque, como `~70%` (opcional) |
| `sections` | Seções extras, como "Arquitetura" (opcional) |
| `notes` | Observação no fim da página (opcional) |
| `category` | `app` (Aplicações) ou `tool` (Scripts & Ferramentas) |
| `status` | `production` (Em produção), `development` (Em desenvolvimento) ou `completed` (Finalizado) |
| `featured` | `true` para aparecer no carrossel de destaques |
| `private` | `true` para projetos com código privado (mostra o cadeado e não exibe link do repositório) |
| `order` | Posição na lista (menor aparece primeiro) |
| `icon` | Ícone da capa, do [Boxicons](https://boxicons.com) (ex.: `bx-car`, `bx-heart`) |
| `hue` | Cor da capa, de 0 a 360 (0 vermelho, 120 verde, 220 azul, 300 roxo) |
| `stack` | Tecnologias, ex.: `[Python, FastAPI, Docker]` |
| `links` | `repo` (GitHub), `demo` (site) e `store` (Chrome Web Store), todos opcionais |

3. **Prints (opcional):** crie a pasta `src/assets/projects/<nome-do-projeto>/`, coloque as imagens e liste no YAML:

```yaml
screenshots:
  - src: ../../assets/projects/meu-projeto/tela-1.png
    alt: { pt: Tela inicial, en: Home screen }
```

Para usar um print como capa no lugar do ícone: `cover: ../../assets/projects/meu-projeto/capa.png`.

**Cuidados com YAML:** respeite a indentação (2 espaços) e coloque entre aspas os textos que tenham `:` no meio, por exemplo: `- "Módulo X: faz tal coisa."`.

### Mudar a ordem ou a quantidade de projetos por página

Em `src/lib/projects.ts`:

- `CATALOG_PAGE_SIZE = 3`: quantos projetos aparecem por página em "Mais projetos"
- `CATALOG_INCLUDES_FEATURED = false`: troque para `true` se quiser que os destaques também apareçam na lista

### Trocar o link do currículo

Em `src/data/profile.ts`, no bloco `site`, altere `cv`. O link aparece no menu, no hero, no contato, no rodapé e no texto para IA.

### Trocar a foto de perfil

Substitua `src/assets/img/profile.jpg` mantendo o mesmo nome. Use uma foto em pé (retrato), de preferência com cerca de 1200 px de largura. O site gera as versões otimizadas sozinho.

---

## Ver as alterações antes de publicar

Na pasta do projeto (precisa do Node.js 22.12 ou mais novo):

```bash
npm install      # só na primeira vez
npm run dev      # abre em http://localhost:4321 e atualiza a cada alteração salva
npm run build    # confere se está tudo certo, do mesmo jeito que o GitHub vai conferir
```

Se o `npm run build` mostrar erro, a mensagem diz o arquivo e o campo com problema (ex.: campo obrigatório faltando num projeto).

## Publicar

Basta enviar para a branch `master`:

```bash
git add .
git commit -m "atualiza experiência"
git push origin master
```

O GitHub Actions gera e publica o site sozinho em cerca de 1 minuto. O andamento aparece na aba **Actions** do repositório.

Também dá para editar direto pelo site do GitHub: abra o arquivo, clique no lápis, altere e faça o commit na `master`. O deploy acontece do mesmo jeito.

## Se algo der errado

| Problema | Solução |
|---|---|
| Build falhou na aba Actions | Abra o log, veja o arquivo e a linha indicados e corrija. Geralmente é indentação de YAML ou campo faltando. |
| Site mostra "Site not found" | Em **Settings → Pages**, confira se a origem está em **GitHub Actions** e se o domínio `me.gaqtech.dev` está preenchido em **Custom domain**. |
| Texto apareceu só em um idioma | Faltou preencher o `pt` ou o `en` daquele campo. |
| Mudei e o site não atualizou | Espere o deploy terminar na aba Actions e recarregue a página com Ctrl + F5. |

## Adicionar espanhol ou francês (futuro)

Essa é uma mudança maior: cada campo passa a ter também `es` e/ou `fr`. O passo a passo técnico está no `CLAUDE.md`, na seção "Routing / i18n".
