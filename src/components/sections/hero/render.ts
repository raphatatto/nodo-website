/**
 * Slot do objeto do Hero (produção). Cópia promovida de `src/experiments/hero-b/render.ts`.
 *
 * Atual: "Dark Fusion" — Luke Hales, Unsplash License (registrado em docs/ASSETS.md),
 * provisório e creditado na legenda do Hero. Antes do lançamento: substituir por
 * render próprio de The Knot (DS §07; especificação em docs/ASSETS.md).
 * `null` usa o pseudo-render procedural (KnotFigure). Na Etapa 6 este arquivo vira
 * o poster da cena WebGL (`data-scene-fallback`).
 *
 * Prompt sugerido para render original (DS §07):
 * "Original sculptural object for NODO, an independent technology studio. A continuous
 * interlocking tubular knot, precise geometry, polished silver chrome and brushed aluminum,
 * subtle deep navy #17346E reflections, matte carbon-black #101010 studio background,
 * controlled softbox lighting, elegant industrial design, editorial minimalism, strong
 * negative space, premium photorealistic 3D render, no text, no logo, no robots,
 * no neon green, no cyberpunk clutter. Wide 16:9 composition with space on the left
 * for a headline."
 */
export type HeroRender = {
  src: string;
  width: number;
  height: number;
  credit: { author: string; source: string; license: string };
};

export const heroRender: HeroRender | null = {
  src: '/images/hero-b/knot-render.jpg',
  width: 2400,
  height: 1560,
  credit: {
    author: 'Luke Hales',
    source: 'https://unsplash.com/photos/vmvlYqgURY4',
    license: 'Unsplash License',
  },
};
