# NODO — Website

@AGENTS.md

NODO é um **Independent Technology Studio**: sites, sistemas, automações e IA sob medida para negócios. Direção criativa **Editorial Futurism** — revista contemporânea de design e tecnologia que ganhou vida. Assinatura: _Creativity meets engineering._

## Fonte canônica

- **`NODO/README.md`** — Design System v1.1 (Dark Blue Edition). Ler antes de qualquer mudança de UI, copy ou motion. Seções essenciais: §02 voz, §03 direção, §05 cores, §06 tipografia, §07 objetos, §08 grid, §09 componentes, §10 motion, §16 qualidade, §19 instruções para agentes.
- `NODO/tokens.css` / `NODO/tokens.json` — tokens (importados diretamente por `src/app/globals.css`).
- `NODO/visual-research.md` + `docs/ASSETS.md` — pesquisa e registro de recursos visuais.
- **Nunca editar `NODO/`** sem pedido explícito. Mudanças de token começam no Design System e só depois chegam ao código.

## Comandos

```bash
npm run dev          # http://localhost:3000 (rotas internas habilitadas)
npm run build        # build de produção (Turbopack)
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier (+ ordenação de classes Tailwind)
npm run check        # lint + typecheck + format:check
```

Node: Vercel usa 24.x (`engines` `>=22 <25`, `.nvmrc`). Gerenciador: **npm** — manter `package-lock.json` versionado.

## Stack

Next.js 16 (App Router, `src/`, Turbopack, `cacheComponents`) · React 19 · TypeScript strict · Tailwind CSS v4 (config CSS-first em `globals.css`) · ESLint · Prettier · `lucide-react` · `clsx` + `tailwind-merge` (`cn`).

Next 16 tem APIs diferentes das versões anteriores: consultar `node_modules/next/dist/docs/` antes de usar recursos do framework.

## Estrutura

```
src/app/                    rotas; layout.tsx (fontes, Header, Footer, SkipLink); globals.css (tokens → Tailwind)
src/app/(site)/             rotas públicas (layout com Header/Footer via SiteChrome)
src/app/(internal)/         rotas internas — noindex, 404 em produção
  (chrome)/                 /design-system, /playground (índice) — com moldura do site
  (stage)/                  /playground/hero-a|b|c — sem moldura; cada proposta controla a 1ª dobra
src/components/ui/          primitivos: Button, IconButton, Heading, Text, SectionLabel, Tag, TextField, Logo
src/components/layout/      Container, Section, SiteChrome, Header, MobileMenu (client), NavItems, Footer, SkipLink
src/components/sections/    seções de página (hoje só HeroPlaceholder, provisório)
src/experiments/            protótipos do /playground (ver README da pasta); shared/ = geometria procedural, KnotFigure, Metal, fichas
src/config/site.ts          copy institucional, navegação (flag `available`), contatos
src/lib/                    cn, internalRoutesEnabled
public/{brand,images,projects,models,textures,videos}/
docs/ASSETS.md              origem e licença de todo recurso de terceiros
```

Criar novas pastas (`components/motion/`, `components/three/`, `content/`) apenas quando a etapa correspondente começar.

## Tokens e estilo

- Usar utilitários mapeados dos tokens: cores `bg, surface, fg, muted, line, control, accent, on-accent, accent-hover, accent-detail, accent-border, focus, error, success` (semânticas, reagem ao tema) e `carbon, graphite, steel, silver, paper, white, navy, navy-hover, blue-deep, blue-light, ink-muted, border-light` (marca).
- Tipografia: `text-hero | h1 | h2 | h3 | body-lg | body | small | label` (fluidas, com entrelinha/tracking) + `font-display | font-body | font-mono`. **Não** usar as classes `.display/.h1/.body/.small` de `NODO/tokens.css` (px fixos).
- Layout: `px-gutter`, `py-section`, `gap-grid`, `max-w-layout`, `min-h-control`, `grid-editorial` (4/8/12 colunas). Escala do DS no Tailwind: 4→`1`, 8→`2`, 12→`3`, 16→`4`, 24→`6`, 32→`8`, 48→`12`, 64→`16`, 96→`24`, 128→`32`.
- Motion: `duration-fast | standard | reveal | scene`, `ease-out` (curva principal do DS), `ease-in-out`.
- A paleta padrão do Tailwind foi removida: só existem as cores da Dark Blue Edition. Nada de verde/neon decorativo; `error`/`success` apenas como feedback.
- Hex/valores soltos: não para cor, tipografia ou espaçamento recorrentes. Valores artísticos pontuais (posição, geometria, curvas de uma cena) são permitidos com justificativa em comentário; se um valor se repetir, propor como token no DS.
- `--color-accent-border` (contorno do CTA no tema Dark) é uma extensão proposta definida em `globals.css`, candidata a entrar no DS.

## Temas

Por seção: `<Section theme="light | dark | signal">` (ou `data-theme`). Alternar Light → Dark → Light → Signal como páginas de revista; azul é sinal, não fundo de todas as seções. Header padrão Dark.

## Componentes e React

- **Server Components por padrão.** `'use client'` só com interatividade real (hoje: `MobileMenu`). Passar conteúdo server como `children` para componentes client.
- Não criar abstrações, hooks ou wrappers sem necessidade concreta e repetida.
- `Heading`: `as` (semântica) separado de `size` (visual). `SectionLabel` nunca substitui heading.
- Links só para rotas que existem. Rotas planejadas ficam em `site.nav` com `available: false` (exibidas como "em breve", sem link).

## Acessibilidade e motion

- WCAG 2.2 AA: foco visível (global), alvo ≥ 44px (`min-h-control`/`size-control`), labels persistentes, `aria-invalid`/`aria-describedby` em erros, headings semânticos, `lang="pt-BR"`, skip link.
- Conteúdo e navegação utilizáveis sem JS de animação e sem WebGL. Respeitar `prefers-reduced-motion` (tokens já vão a 0 ms; JS/WebGL também devem respeitar).
- Sem splash/loader bloqueante, sem scroll hijacking, sem cursor obrigatório.

## Dependências

Não adicionar bibliotecas sem motivo claro (DS §13/§17). Planejado por etapa:

- GSAP + ScrollTrigger — Etapa 5 (Motion). Lenis só se comprovadamente melhorar a experiência.
- Three.js + React Three Fiber + Drei — Etapa 6, com fallback estático, DPR limitado, render pausado fora da viewport, import dinâmico.
- Motion (motion.dev) não deve duplicar responsabilidades do GSAP.

## Rotas internas

`/design-system` (validação visual de tokens, temas, componentes, estados) e `/playground` (experimentos). Em produção retornam 404, salvo `ENABLE_INTERNAL_ROUTES=true`; sempre `noindex` e `Disallow` no robots. Nunca linkar a partir de rotas públicas em produção.

## Conteúdo

- Copy em pt-BR; inglês como recurso editorial (headlines, índices). Fonte: `NODO/README.md` §02/§11.
- Não inventar clientes, cases, métricas, depoimentos ou contatos. Marcar conceitos e placeholders.
- Registrar todo recurso visual externo em `docs/ASSETS.md` antes de usar.

## Git

Não fazer commit nem push sem autorização explícita.

## Roadmap

1. Foundation ✅ (esta base)
2. Art Direction — três propostas visuais para o Hero (`/playground/hero-a|b|c`) — em revisão
3. Selected Work e apresentação de projetos
4. Demais seções e páginas
5. Motion Design e transições
6. Objetos 3D e Creative Development
7. Performance, acessibilidade, SEO e publicação

## Ao concluir uma tarefa

Informar arquivos alterados, decisões, testes realmente executados, limitações e pendências. Não declarar como testado/publicado o que não foi (DS §19).
