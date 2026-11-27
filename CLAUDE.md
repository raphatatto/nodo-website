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
src/app/(site)/(home)/      Home — Header `overlay` sobre o Hero (SiteChrome header="overlay")
src/app/(site)/(pages)/     páginas internas — Header sólido com CTA: /work, /work/[slug], /expertise, /studio, /labs, /contact (briefing), /privacy (preliminar, noindex)
src/app/(internal)/         rotas internas — noindex, 404 em produção
  (chrome)/                 /design-system, /playground (índice) — com moldura do site
  (stage)/                  /playground/hero-a|b|c e work-a|b|c — sem moldura; cada proposta controla a 1ª dobra
src/components/ui/          primitivos: Button, IconButton, Heading, Text, SectionLabel, Tag, TextField, Logo
src/components/layout/      Container, Section, SiteChrome, Header, MobileMenu (client), NavItems, Footer, SkipLink
src/components/sections/    seções da Home (hero/, Introduction, SelectedWork, …) — versões de produção das propostas aprovadas
src/components/art/         arte procedural (KnotFigure, Metal, ConnectionFigure, objects/ O02–O05) — SVG calculado no servidor
src/experiments/            protótipos do /playground (ver README da pasta); shared/ = geometria procedural, KnotFigure, Metal, fichas
src/components/work/        ProjectCover (zoom p/ recortes), ProjectMeta, ProjectLink (prefetch por link), ProjectIndex (/work)
src/content/                projects (Selected Work, /work), services (Expertise), studio (posicionamento, manifesto, processo), labs — fonte única de conteúdo; conceitos marcados como tal
src/config/site.ts          copy institucional, navegação (flag `available`), CTA, legal, serviços, contatos
src/config/briefing.ts      opções do formulário (tipos, faixas de orçamento e prazos — proposta a confirmar)
src/lib/                    cn, internalRoutesEnabled, geometry (procedural), motion (preferência), briefing/ (validação pura + entrega)
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

## Ganchos de motion e cena (Etapas 5/6)

Seções continuam Server Components; o motion futuro se liga por atributos. Nomes definitivos:

| Atributo                         | Onde                                                                                                         | Efeito futuro                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| `data-motion-section="<id>"`     | raiz de cada seção (`hero`, `intro`, `work`, `expertise`, `process`, `labs`, `studio`, `contact`)            | escopo do GSAP; M10 tema       |
| `data-reveal-line`               | linha de headline dentro de wrapper `overflow-y-clip` (padding vertical + margem negativa preservam acentos) | M01 máscara (`yPercent ≥ 120`) |
| `data-reveal="up\|fade"`         | blocos de texto secundários                                                                                  | M01 variação                   |
| `data-media`                     | máscara da capa (`ProjectCover`)                                                                             | M02 expansão                   |
| `data-progress`                  | barra de progresso do Selected Work                                                                          | M05                            |
| `data-parallax="<fator>"`        | objeto e órbitas do Hero, figuras                                                                            | M07                            |
| `data-draw`                      | `<path pathLength="1">` de conexões                                                                          | M09                            |
| `data-cursor="<rótulo>"`         | mídia clicável                                                                                               | M06                            |
| `data-scene-anchor="<capítulo>"` | caixas onde o objeto 3D deve estar (`knot-hero`, `knot-intro`, …)                                            | M03                            |
| `data-scene-fallback`            | arte estática substituída quando o WebGL estiver pronto                                                      | M03                            |

Regras: estado inicial oculto só via JS e só para elementos fora da viewport (sem JS, tudo visível); o h1 do Hero nunca é escondido; tudo em `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`. Com `cacheComponents`, rotas visitadas ficam ocultas via `<Activity>` (Effects fazem cleanup ao esconder): motion e Canvas por escopo de seção/página, nunca singletons globais.

## Rotas dinâmicas e prefetch (Next 16)

- Com `cacheComponents`, **`dynamicParams` não existe** (quebra o build): `/work/[slug]` usa `generateStaticParams` e chama `notFound()` para slug desconhecido.
- `partialPrefetching`: o App Shell é compartilhado entre slugs — leitura de `params` fica dentro de `<Suspense>` (senão o dev aponta "URL data outside of Suspense"). Links para cases usam `prefetch` (per-link prefetching) para a navegação ser instantânea.

## Briefing e preferências

- `/contact`: Server Function (`actions.ts`) + `useActionState`; funciona sem JS. Validação no servidor em `src/lib/briefing/validate.ts` (pura, testável com Node). Entrega em `src/lib/briefing/deliver.ts` via `BRIEFING_WEBHOOK_URL` (n8n, CRM ou e-mail): **sem a variável, responde "recebimento indisponível" — nunca simular sucesso**. Antispam: honeypot + tempo mínimo (só com JS). Nada de dados pessoais em log.
- "Reduzir movimento" (Footer): `html[data-motion="reduced"]` pausa animações contínuas e zera durações; script inline no layout raiz reaplica antes da pintura. Motion futuro deve respeitar este atributo além de `prefers-reduced-motion`.

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
2. Art Direction — Hero ✅ aprovado: **B — Immersive Futurism / The Knot** (`/playground/hero-b`)
3. Selected Work ✅ aprovado: **B — Full Width Showcase** (`/playground/work-b`)
4. Website, Art Direction & Creative Architecture — Home, seções institucionais, conversão e páginas internas (implementado; em revisão)
5. Motion Design e transições
6. Objetos 3D e Creative Development
7. Performance, acessibilidade, SEO e publicação

## Decisões visuais aprovadas

Composições aprovadas são **preservadas**: não redesenhar nem reinterpretar. Motion, 3D e ajustes técnicos entram dentro delas.

- **Hero — B, Immersive Futurism / The Knot** (Etapa 2). Palco Carbon, objeto metálico protagonista com reflexo Navy, órbitas finas (The Flow), headline compacta embaixo à esquerda, CTAs à direita, legendas técnicas em mono. Uma rodada de refinamento foi rejeitada e revertida: não reaplicar. O render atual é de terceiro (Unsplash) e será substituído por The Knot original.
- **Selected Work — B, Full Width Showcase** (Etapa 3, decisão formal na Etapa 4). Um projeto por bloco em grande escala, imagem alternando de lado, coluna de informação sticky com índice gigante Navy, espaço negativo e progresso editorial. O que mais agradou: apresentação cinematográfica que valoriza cada trabalho individualmente. A e C ficam no playground como referência (o Creative Index pode inspirar `/work`, sem substituir B na Home).

## Ao concluir uma tarefa

Informar arquivos alterados, decisões, testes realmente executados, limitações e pendências. Não declarar como testado/publicado o que não foi (DS §19).
