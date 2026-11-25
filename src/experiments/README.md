# Experiments

Código de protótipos exibidos em `/playground` (rota interna, 404 em produção sem `ENABLE_INTERNAL_ROUTES=true`).

## Convenção

```
src/experiments/<slug>/                               # código do experimento
src/experiments/shared/                               # geometria procedural, KnotFigure, Metal, fichas, switcher, experiments.css
src/app/(internal)/(stage)/playground/<slug>/page.tsx # rota em tela cheia (sem Header/Footer do site)
```

## Etapa 2 — propostas de Hero

| Rota                 | Código                                 | Objetos                                                                        |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------------ |
| `/playground/hero-a` | `hero-a/HeroA.tsx`                     | The Experience (planos) + The Knot em traço                                    |
| `/playground/hero-b` | `hero-b/HeroB.tsx`, `hero-b/render.ts` | Render estático (slot substituível) + The Flow; fallback: pseudo-render chrome |
| `/playground/hero-c` | `hero-c/HeroC.tsx`                     | The Intelligence (esfera de nodos) + The Structure (módulos)                   |

Metadados e fichas: `shared/proposals.ts`. Toda geometria é calculada no servidor (SVG estático, zero JS de cena).

- `<slug>` em kebab-case com prefixo do tipo: `hero-a`, `motion-text-reveal`, `object-knot`.
- Código daqui **nunca** é importado por rotas públicas. Quando um experimento for aprovado, ele é refeito/promovido para `src/components/` seguindo os tokens e regras do Design System.
- Dependências pesadas (GSAP, Three.js, R3F, Lenis) só entram na etapa correspondente do roadmap e devem ser carregadas sob demanda (`next/dynamic` / import dinâmico dentro de Client Components).
- Todo experimento precisa de: versão com `prefers-reduced-motion`, fallback estático quando usar WebGL, e registro de assets externos em `docs/ASSETS.md`.
- Valores artísticos pontuais (posições, geometrias, curvas) são permitidos com justificativa; padrões que se repetirem viram propostas de token no Design System.
- Ao criar um experimento, atualize `shared/proposals.ts` (propostas) ou a lista `planned` em `src/app/(internal)/(chrome)/playground/page.tsx`.
