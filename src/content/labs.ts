/**
 * NODO Labs — experimentos (DS §12).
 * Regra: listar somente o que existe (com demo neste site) ou o que está claramente
 * marcado como pesquisa. "Não criar uma área vazia só para aparentar inovação."
 * Os três primeiros são os estudos procedurais construídos para este site (Etapa 2):
 * geometria calculada em TypeScript e renderizada como SVG no servidor.
 */

export type LabStatus = 'experiment' | 'prototype' | 'released' | 'research';

export type LabEntry = {
  id: string;
  title: string;
  /** Objeto NODO relacionado (DS §07). */
  object: string;
  status: LabStatus;
  year: string;
  summary: string;
  tech: string[];
  /** Como é feito — descrição técnica real do experimento. */
  method: string;
  /** Demo existente neste site. */
  demo: 'knot' | 'intelligence' | 'structure' | null;
};

export const labStatusLabel: Record<LabStatus, string> = {
  experiment: 'Experimento',
  prototype: 'Protótipo',
  released: 'Publicado',
  research: 'Em pesquisa',
};

export const labs: LabEntry[] = [
  {
    id: 'L-01',
    title: 'The Knot — geometria procedural',
    object: 'O01 The Knot',
    status: 'experiment',
    year: '2026',
    summary:
      'Nó toroidal (3,4) calculado, projetado em perspectiva e desenhado em SVG no servidor — nenhum JavaScript no navegador.',
    tech: ['TypeScript', 'SVG', 'Server Components'],
    method:
      'A curva do nó é amostrada em 480 pontos, girada e projetada em perspectiva; os segmentos são ordenados por profundidade para desenhar os cruzamentos por cima e por baixo.',
    demo: 'knot',
  },
  {
    id: 'L-02',
    title: 'The Intelligence — esfera de Fibonacci',
    object: 'O03 The Intelligence',
    status: 'experiment',
    year: '2026',
    summary:
      'Pontos distribuídos pela espiral de Fibonacci, separados por profundidade e ligados ao vizinho mais próximo.',
    tech: ['TypeScript', 'SVG', 'Server Components'],
    method:
      '220 pontos na espiral de Fibonacci: o hemisfério posterior vira rede (cada ponto liga-se ao vizinho mais próximo) e o anterior, pontos com opacidade pela profundidade.',
    demo: 'intelligence',
  },
  {
    id: 'L-03',
    title: 'The Structure — módulos isométricos',
    object: 'O02 The Structure',
    status: 'experiment',
    year: '2026',
    summary:
      'Módulos encaixáveis em projeção isométrica, com materiais metálicos feitos só com os tokens da marca.',
    tech: ['TypeScript', 'SVG', 'Design tokens'],
    method:
      'Cubos em projeção isométrica pintados de trás para frente; as faces usam gradientes feitos só com os tokens Silver, Steel, Carbon e Navy.',
    demo: 'structure',
  },
  {
    id: 'L-04',
    title: 'The Knot em tempo real',
    object: 'O01 The Knot',
    status: 'research',
    year: '2026',
    summary:
      'Versão tridimensional do nó com material metálico real (Three.js), prevista para a próxima fase deste site.',
    tech: ['Three.js', 'React Three Fiber', 'GLSL'],
    method:
      'Próximo passo: o mesmo nó como malha 3D com material metálico físico, carregado sob demanda e com fallback estático.',
    demo: null,
  },
];
