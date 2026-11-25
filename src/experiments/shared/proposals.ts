/**
 * Fonte única das três direções de Hero (Etapa 2 — Art Direction).
 * Alimenta a ficha de cada proposta e o índice /playground.
 */
export type ProposalSlug = 'hero-a' | 'hero-b' | 'hero-c';

export type Proposal = {
  slug: ProposalSlug;
  code: 'A' | 'B' | 'C';
  direction: string;
  name: string;
  theme: string;
  summary: string;
  objects: string[];
  notes: { label: string; value: string }[];
};

export const proposals: Proposal[] = [
  {
    slug: 'hero-a',
    code: 'A',
    direction: 'Editorial Minimalism',
    name: 'Signal Line',
    theme: 'Light · Paper',
    summary:
      'Uma página de revista: a tipografia é o objeto, e uma única faixa Navy atravessa a manchete como sinal.',
    objects: ['O05 The Experience', 'O01 The Knot (traço)'],
    notes: [
      {
        label: 'Conceito',
        value:
          'Precisão editorial. A marca se apresenta pela tipografia e pela pontuação: um único gesto de cor (a faixa Navy) organiza a página, como numa capa de revista.',
      },
      {
        label: 'Referências',
        value:
          'DS · a-editorial-minimalism.png (faixa de cor cruzando a manchete), 2-editorial-design.png (sumário e numeração de revista). Lusion como contenção e ritmo.',
      },
      {
        label: 'Composição',
        value:
          'Moldura de 1px enquadra a página; header dentro da moldura; manchete em três linhas alinhada à esquerda; sumário de serviços 01–04 como índice de revista; figura técnica em traço no rodapé.',
      },
      {
        label: 'Tipografia',
        value:
          'Display oversized (até 144px) como protagonista absoluto. Mono para índices e legendas; Geist no sumário. Hierarquia por escala, não por cor.',
      },
      {
        label: 'Paleta',
        value:
          '≈ 80% Paper · 12% Carbon · 8% Navy. O texto sob a faixa inverte para Paper (cópia recortada, sem blend).',
      },
      {
        label: 'Objetos',
        value:
          'The Experience: planos translúcidos sobrepostos dão profundidade sutil ao papel. The Knot aparece só como estudo em traço (FIG. 001), com cruzamentos por cima e por baixo.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'A faixa desce e "corta" a manchete; as linhas da manchete revelam por máscara; o sumário entra em sequência. Hoje: só a entrada da faixa em CSS.',
      },
      {
        label: '3D (Etapa 6)',
        value: 'Nenhum obrigatório. Direção mais leve e mais rápida de carregar.',
      },
      {
        label: 'Mobile',
        value:
          'Moldura reduzida; a faixa estreita continua cruzando a manchete; o sumário vira uma lista empilhada; os CTAs ficam acima da dobra.',
      },
      {
        label: 'Riscos',
        value:
          'Pode parecer contida demais para um estúdio de tecnologia; depende de copy e tipografia impecáveis. Menor impacto "wow" que B.',
      },
    ],
  },
  {
    slug: 'hero-b',
    code: 'B',
    direction: 'Immersive Futurism',
    name: 'The Knot',
    theme: 'Dark · Carbon',
    summary:
      'Um palco escuro: o objeto metálico é o protagonista, com órbitas finas e reflexos Navy. A manchete cede espaço à matéria.',
    objects: ['O01 The Knot', 'O04 The Flow'],
    notes: [
      {
        label: 'Conceito',
        value:
          'Conexão como matéria. Um objeto chrome entrelaçado, iluminado como peça de estúdio, cercado por trajetórias (The Flow) que sugerem sistemas em movimento.',
      },
      {
        label: 'Referências',
        value:
          'Lusion (palco, profundidade, objeto como narrativa), DS · b-immersive-futurism.png, 1-nodo-art-direction.png; referências enviadas: nó chrome e metal líquido.',
      },
      {
        label: 'Composição',
        value:
          'Objeto em tela cheia, deslocado à direita e cortado pela borda; manchete compacta ancorada no canto inferior esquerdo; descrição e CTAs no canto inferior direito; legendas técnicas nas órbitas.',
      },
      {
        label: 'Tipografia',
        value:
          'Manchete em escala H1, submissa ao objeto. Mono para legendas de figura e material. Muito espaço escuro ao redor do texto.',
      },
      {
        label: 'Paleta',
        value:
          '≈ 75% Carbon · 15% prata/metal · 7% Navy (reflexos, profundidade) · 3% Paper. Blue Light só em detalhes funcionais.',
      },
      {
        label: 'Objetos',
        value:
          'Render estático "Dark Fusion" (Luke Hales, Unsplash License) com reflexo Navy aplicado por blend. Fallback: pseudo-render procedural do nó em tubo chrome. The Flow em SVG: órbitas de 1px com nodos.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'Órbita lenta da câmera em torno do objeto; as trajetórias desenham-se; parallax mínimo do texto. Hoje: flutuação lenta do objeto e rotação muito lenta das órbitas (CSS).',
      },
      {
        label: '3D (Etapa 6)',
        value:
          'Substituir o render por The Knot original em R3F (GLB próprio, chrome + esmalte Navy), com este render/SVG como fallback e poster.',
      },
      {
        label: 'Mobile',
        value:
          'O objeto ocupa a metade superior, cortado nas laterais; o texto vem abaixo, sem sobreposição; as órbitas ficam simplificadas.',
      },
      {
        label: 'Riscos',
        value:
          'É a mais cara em performance quando virar 3D. O render atual é de terceiros (substituir por objeto próprio antes do lançamento). Os serviços ficam menos explícitos na primeira dobra.',
      },
    ],
  },
  {
    slug: 'hero-c',
    code: 'C',
    direction: 'Editorial Futurism',
    name: 'Connected Index',
    theme: 'Signal · Navy + Paper',
    summary:
      'A manchete ocupa a página inteira; uma esfera de nodos e módulos metálicos atravessa as letras e conecta os quatro serviços.',
    objects: ['O03 The Intelligence', 'O02 The Structure'],
    notes: [
      {
        label: 'Conceito',
        value:
          'Tudo está conectado. A tipografia oversized é a estrutura; a inteligência (nodos) e a engenharia (módulos) atravessam as letras e ligam a marca às quatro ofertas.',
      },
      {
        label: 'Referências',
        value:
          'DS · c-editorial-futurism.png (objeto atravessando a palavra), Lusion (camadas e profundidade); referências enviadas: esfera de pontos e cubos chrome.',
      },
      {
        label: 'Composição',
        value:
          'Três palavras em largura total, com alinhamento alternado; o objeto fica entre camadas (partes atrás e partes à frente do texto); faixa Paper inferior com descrição e CTAs, como virada de página.',
      },
      {
        label: 'Tipografia',
        value:
          'Escala acima do Display (≈ 15vw), valor artístico justificado: a palavra vira arquitetura. Mono nos rótulos dos nodos.',
      },
      {
        label: 'Paleta',
        value:
          '≈ 70% Navy · 20% Paper · 7% prata · 3% Blue Light (linhas de conexão). Uma das exceções de impacto previstas no DS para o azul.',
      },
      {
        label: 'Objetos',
        value:
          'The Intelligence: esfera de Fibonacci com pontos dimensionados pela profundidade. The Structure: módulos metálicos isométricos. Linhas de 1px ligam a esfera aos serviços.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'Conexões desenham-se até cada serviço (M09); a esfera gira e os módulos se alinham; as palavras revelam por máscara. Hoje: pulso discreto dos nodos de serviço.',
      },
      {
        label: '3D (Etapa 6)',
        value:
          'Esfera de partículas em R3F (instancing) e módulos GLB; o SVG atual vira o fallback.',
      },
      {
        label: 'Mobile',
        value:
          'As palavras continuam em largura total; a esfera fica menor atrás de "meets"; os serviços passam para uma lista 2×2 na faixa Paper.',
      },
      {
        label: 'Riscos',
        value:
          'O fundo Navy em tela cheia reduz o contraste das camadas e pede disciplina para o azul não virar fundo padrão. É a direção mais densa: exige ajuste fino de sobreposição e legibilidade.',
      },
    ],
  },
];

export function getProposal(slug: ProposalSlug): Proposal {
  return proposals.find((p) => p.slug === slug)!;
}
