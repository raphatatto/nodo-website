/**
 * Fonte única das três direções de Hero (Etapa 2 — Art Direction).
 * Alimenta a ficha de cada proposta e o índice /playground.
 */
export type ProposalGroup = 'hero' | 'work';
export type ProposalSlug = 'hero-a' | 'hero-b' | 'hero-c' | 'work-a' | 'work-b' | 'work-c';

export type Proposal = {
  slug: ProposalSlug;
  group: ProposalGroup;
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
    group: 'hero',
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
    group: 'hero',
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
    group: 'hero',
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

/** Etapa 3 — três composições para Selected Work. */
export const workProposals: Proposal[] = [
  {
    slug: 'work-a',
    group: 'work',
    code: 'A',
    direction: 'Editorial Gallery',
    name: 'Editorial Gallery',
    theme: 'Paper · galeria',
    summary:
      'Um projeto protagonista em grande escala, seguido de satélites com proporções diferentes numa grade assimétrica.',
    objects: ['16:9 destaque', '4:5', '3:2', '21:9'],
    notes: [
      {
        label: 'Conceito',
        value:
          'Galeria digital com hierarquia clara: o primeiro projeto abre a seção como capa de revista; os demais orbitam em escalas menores, com espaço negativo entre eles.',
      },
      {
        label: 'Referências',
        value:
          'Basement Studio (projeto protagonista, capas grandes), Bakken & Bæck (contenção editorial). DS §08: composições assimétricas alinhadas à malha.',
      },
      {
        label: 'Composição',
        value:
          'Cabeçalho com manchete oversized à esquerda e introdução à direita. Destaque 16:9 na largura do container. Satélites: 4:5 nas colunas 1–5 (deslocado para baixo), 3:2 nas colunas 7–12 e 21:9 nas colunas 3–12.',
      },
      {
        label: 'Tipografia',
        value:
          'Manchete até 152px; títulos de projeto em H2 (destaque) e H3 (satélites); meta em IBM Plex Mono com selo "Conceito" em Navy.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'Reveal das capas por máscara (M01) e expansão do destaque ao entrar na tela (M02). Hoje: zoom sutil da imagem no hover, em CSS.',
      },
      {
        label: 'Mobile',
        value: 'Coluna única preservando as proporções diferentes de cada capa.',
      },
      {
        label: 'Riscos',
        value:
          'Depende de um projeto forte para o destaque; com muitos projetos, a grade precisa de regras de rotação para não virar um mosaico aleatório.',
      },
    ],
  },
  {
    slug: 'work-b',
    group: 'work',
    code: 'B',
    direction: 'Full Width Showcase',
    name: 'Full Width Showcase',
    theme: 'Paper · cinematográfico',
    summary:
      'Um projeto por tela: imagem em grande escala alternando o lado e índice gigante numa coluna sticky.',
    objects: ['16:10', '4:5', 'sticky', 'progresso'],
    notes: [
      {
        label: 'Conceito',
        value:
          'Ritmo cinematográfico: cada projeto ocupa quase uma tela inteira, com tempo para ser visto. A rolagem conduz a narrativa sem sequestrá-la.',
      },
      {
        label: 'Referências',
        value: 'Lusion (um assunto por cena), Work & Co (apresentação objetiva de soluções).',
      },
      {
        label: 'Composição',
        value:
          'Imagem em ~2/3 da largura (16:10) alternando esquerda e direita; retrato em 4:5. A coluna de texto (índice em Navy, título, resumo, meta, disciplinas, progresso 01—04) fica sticky enquanto a imagem rola.',
      },
      {
        label: 'Tipografia',
        value: 'Manchete até 208px; numerais de 72–176px em Navy; títulos em H2.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'Expansão da imagem vinculada à rolagem (M02, ScrollTrigger) e barra de progresso animada. Hoje: sticky em CSS e zoom sutil no hover.',
      },
      {
        label: 'Mobile',
        value: 'Imagem em cima, texto embaixo, sem sticky.',
      },
      {
        label: 'Riscos',
        value:
          'Seção longa (≈ 4 telas) na Home; talvez seja melhor limitar a 3 projetos e levar o restante para /work.',
      },
    ],
  },
  {
    slug: 'work-c',
    group: 'work',
    code: 'C',
    direction: 'Creative Index',
    name: 'Creative Index',
    theme: 'Paper · revista',
    summary:
      'Sumário tipográfico de revista que revela as capas no hover, seguido de spreads com imagem e ficha técnica.',
    objects: ['sumário', 'hover', 'spreads', 'ficha técnica'],
    notes: [
      {
        label: 'Conceito',
        value:
          'O portfólio como edição: primeiro o índice (o leitor vê tudo de uma vez), depois as matérias. A tipografia é a protagonista; as imagens aparecem quando chamadas.',
      },
      {
        label: 'Referências',
        value:
          'DS · 2-editorial-design.png (sumário e numeração), Phenomenon (apresentação de produto com fichas), revistas de design.',
      },
      {
        label: 'Composição',
        value:
          'Masthead (N° 01 · Selected Work · Índice), manchete em duas linhas e sumário com colunas N°/Projeto/Serviço/Ano/Status. Spreads alternados: imagem (4:3 ou 4:5) + ficha técnica em mono, com numeral gigante em Border Light ao fundo.',
      },
      {
        label: 'Tipografia',
        value:
          'Títulos do sumário até 72px; numerais de fundo até 352px em tom de papel; fichas técnicas em IBM Plex Mono.',
      },
      {
        label: 'Motion (Etapa 5)',
        value:
          'Capa que segue o cursor sobre o sumário (M06) e troca suave entre capas. Hoje: capa revelada no hover em CSS (desktop) e deslocamento do título.',
      },
      {
        label: 'Mobile',
        value: 'Sumário com miniatura inline; spreads empilhados.',
      },
      {
        label: 'Riscos',
        value:
          'O hover não existe no touch (por isso há miniaturas no mobile). É a mais densa, então exige rigor tipográfico para não parecer uma tabela.',
      },
    ],
  },
];

export const allProposals: Proposal[] = [...proposals, ...workProposals];

export function getProposal(slug: ProposalSlug): Proposal {
  return allProposals.find((p) => p.slug === slug)!;
}
