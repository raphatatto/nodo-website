# Experiments

Código de protótipos exibidos em `/playground` (rota interna, 404 em produção sem `ENABLE_INTERNAL_ROUTES=true`).

## Convenção

```
src/experiments/<slug>/          # código do experimento (componentes, shaders, assets locais)
src/app/(internal)/playground/<slug>/page.tsx   # rota que monta o experimento
```

- `<slug>` em kebab-case com prefixo do tipo: `hero-a`, `motion-text-reveal`, `object-knot`.
- Código daqui **nunca** é importado por rotas públicas. Quando um experimento for aprovado, ele é refeito/promovido para `src/components/` seguindo os tokens e regras do Design System.
- Dependências pesadas (GSAP, Three.js, R3F, Lenis) só entram na etapa correspondente do roadmap e devem ser carregadas sob demanda (`next/dynamic` / import dinâmico dentro de Client Components).
- Todo experimento precisa de: versão com `prefers-reduced-motion`, fallback estático quando usar WebGL, e registro de assets externos em `docs/ASSETS.md`.
- Valores artísticos pontuais (posições, geometrias, curvas) são permitidos com justificativa; padrões que se repetirem viram propostas de token no Design System.
- Ao criar um experimento, atualize a lista `planned` em `src/app/(internal)/playground/page.tsx` (status e link).
