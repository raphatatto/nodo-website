/**
 * Estúdio — posicionamento, pilares, manifesto e método.
 * Fonte: NODO/README.md §01 (estratégia), §02 (manifesto, banco de frases) e §11 (processo).
 * Não inventar equipe, escritórios, anos de experiência, números ou clientes (DS §16).
 */

/** Introduction (Home) e /studio. DS §11 — copy de partida "Estúdio". */
export const positioning = {
  /** Duas frases, cada uma em duas linhas (composição editorial da Introduction). */
  headline: [
    ['Pensamos como', 'criativos.'],
    ['Construímos como', 'engenheiros.'],
  ],
  summary:
    'Somos um estúdio independente que conecta design, desenvolvimento e inteligência para resolver desafios reais.',
} as const;

/** DS §01 — Três pilares. */
export const pillars = [
  { index: '01', name: 'Design', text: 'Tornar soluções claras, úteis e memoráveis.' },
  {
    index: '02',
    name: 'Engineering',
    text: 'Construir sistemas confiáveis, integrações e produtos que funcionam.',
  },
  {
    index: '03',
    name: 'Intelligence',
    text: 'Aplicar automação, dados e IA quando existe uma necessidade real.',
  },
] as const;

/** DS §02 — Manifesto (trechos usados na seção Studio; texto completo em /studio). */
export const manifesto = {
  headline: ['Independent by nature.', 'Connected by design.'],
  lines: [
    'Acreditamos que tudo começa com uma conexão.',
    'Entre uma ideia e uma possibilidade. Entre criatividade e engenharia. Entre pessoas e tecnologia.',
    'Questionamos o convencional. Exploramos novas possibilidades. Construímos com propósito.',
  ],
} as const;

/** DS §01 — Diferencial da plataforma de marca. */
export const differentiators = [
  'Contato direto com quem constrói',
  'Solução personalizada',
  'Estética e funcionalidade juntas',
] as const;

/** Process — etapas definidas na Etapa 4; detalhe de DS §11 (Processo de trabalho). */
export const process = {
  headline: 'From idea to impact.',
  subline: 'Da ideia ao impacto.',
  steps: [
    {
      index: '01',
      name: 'Discover',
      text: 'Entender o negócio e seus desafios.',
      detail: 'Desafio, usuários, restrições e critérios de sucesso.',
    },
    {
      index: '02',
      name: 'Design',
      text: 'Transformar necessidades em estratégia e experiência.',
      detail: 'Desenhar o fluxo e validar a proposta antes de construir.',
    },
    {
      index: '03',
      name: 'Build',
      text: 'Desenvolver, integrar e validar a solução.',
      detail: 'Implementar, testar e demonstrar.',
    },
    {
      index: '04',
      name: 'Evolve',
      text: 'Acompanhar a entrega e identificar melhorias.',
      detail: 'Documentação entregue; suporte e evolução acordados em escopo.',
    },
  ],
} as const;

/** /studio — posicionamento (definido na Etapa 4) e DS §01 ("Por que estúdio, não agência?"). */
export const studioPositioning = {
  isNot: [
    'Não somos uma agência de marketing digital tradicional.',
    'Não somos uma software house convencional.',
    'Não somos uma empresa SaaS.',
  ],
  is: 'Somos um estúdio independente que conecta criatividade, design, engenharia de software, automação e inteligência artificial para construir soluções digitais sob medida.',
  blend:
    'A identidade de um estúdio criativo, a capacidade técnica de uma software house e a objetividade comercial de uma consultoria de tecnologia.',
} as const;

/** DS §01 — Valores da plataforma de marca. */
export const values = [
  'Clareza',
  'Curiosidade',
  'Responsabilidade',
  'Qualidade',
  'Colaboração',
  'Evolução contínua',
] as const;

/** DS §02 — Manifesto completo (texto oficial). */
export const manifestoFull = [
  'Acreditamos que tudo começa com uma conexão.',
  'Entre uma ideia e uma possibilidade. Entre criatividade e engenharia. Entre pessoas e tecnologia.',
  'Somos a NODO, um estúdio independente que explora, projeta e constrói soluções digitais. Criamos experiências que impressionam, sistemas que funcionam e tecnologias que fazem sentido para pessoas e negócios.',
  'Questionamos o convencional. Exploramos novas possibilidades. Construímos com propósito.',
  'Porque o futuro não acontece sozinho. Ele é construído.',
] as const;
