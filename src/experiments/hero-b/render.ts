/**
 * Slot de substituição do render estático da proposta B.
 *
 * Atual: "Dark Fusion" — Luke Hales, Unsplash License (registrado em docs/ASSETS.md).
 * Antes do lançamento: substituir por render próprio de The Knot (DS §07) e
 * atualizar este objeto. Definir como `null` usa o pseudo-render procedural.
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

export const heroBRender: HeroRender | null = {
  src: '/images/hero-b/knot-render.jpg',
  width: 2400,
  height: 1560,
  credit: {
    author: 'Luke Hales',
    source: 'https://unsplash.com/photos/vmvlYqgURY4',
    license: 'Unsplash License',
  },
};
