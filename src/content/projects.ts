import type { site } from '@/config/site';
import type { CoverRatio } from '@/components/work/ProjectCover';

/**
 * Projetos — fonte única para Selected Work, /work e /work/[slug] (futuras).
 *
 * Todos os itens atuais são CONCEITOS (estudos da NODO): não há clientes,
 * métricas, resultados ou depoimentos. Ao adicionar um projeto real, usar
 * `status: 'client' | 'own'` e informar apenas fatos autorizados (DS §12).
 *
 * `/work/[slug]` usa `generateStaticParams` + `getProject(slug)`; `available` liga o link.
 *
 * Cases conceituais: cenário, desafio e solução são HIPÓTESES de projeto descritas a partir
 * do que a imagem conceitual mostra. "Recursos visuais" são recortes da MESMA imagem —
 * nenhuma tela adicional é inventada. Sem tecnologias confirmadas (`technologies: null`).
 */
export type ProjectService = (typeof site.services)[number]['name'];

export type ProjectCoverImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type CaseFigure = {
  /** Enquadramento do detalhe (object-position + origem do zoom). */
  position: string;
  zoom: number;
  ratio: CoverRatio;
  caption: string;
};

export type CaseStudy = {
  context: string;
  challenge: string;
  solution: string;
  figures: CaseFigure[];
  /** null = estudo visual, sem implementação técnica a declarar. */
  technologies: string[] | null;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  service: ProjectService;
  status: 'concept' | 'client' | 'own';
  /** Ano do estudo — não é data de entrega a cliente. */
  year: string;
  summary: string;
  disciplines: string[];
  cover: ProjectCoverImage;
  /** Atmosfera da capa (DS §07: cada case pode ter paleta própria). */
  tone: 'dark' | 'light';
  /** A página do case existe? Enquanto false, nada linka para /work/[slug]. */
  available: boolean;
  caseStudy: CaseStudy;
};

export const projects: Project[] = [
  {
    slug: 'energy-intelligence',
    index: '01',
    title: 'Energy Intelligence',
    service: 'Digital Products',
    status: 'concept',
    year: '2026',
    summary:
      'Painel de monitoramento de carga, consumo, distribuição e alarmes para operações de energia.',
    disciplines: ['Produto digital', 'Dashboard', 'Visualização de dados'],
    cover: {
      src: '/projects/energy-intelligence/cover.jpg',
      width: 1400,
      height: 900,
      alt: 'Conceito de dashboard de energia em um monitor, com curva de carga, consumo, diagrama de distribuição e resumo de alarmes.',
    },
    tone: 'dark',
    available: true,
    caseStudy: {
      context:
        'Operações de energia acompanham carga, consumo, equipamentos e alarmes — muitas vezes em telas e sistemas separados.',
      challenge:
        'Reunir em um único painel o que a equipe precisa ver primeiro, sem perder a leitura técnica dos dados.',
      solution:
        'Um painel de monitoramento com curva de carga, consumo por período, diagrama de distribuição, status de equipamentos e resumo de alarmes, organizado por prioridade de leitura.',
      figures: [
        { position: '42% 24%', zoom: 2, ratio: '4/3', caption: 'Curva de carga' },
        { position: '47% 54%', zoom: 2, ratio: '4/5', caption: 'Diagrama de distribuição' },
        { position: '73% 48%', zoom: 1.8, ratio: '16/9', caption: 'Resumo de alarmes' },
      ],
      technologies: null,
    },
  },
  {
    slug: 'intelligent-assistant',
    index: '02',
    title: 'Intelligent Assistant',
    service: 'Artificial Intelligence',
    status: 'concept',
    year: '2026',
    summary:
      'Assistente conversacional para consultar, resumir e gerar conteúdo a partir do conhecimento do negócio.',
    disciplines: ['IA aplicada', 'Interface conversacional', 'UX/UI'],
    cover: {
      src: '/projects/intelligent-assistant/cover.jpg',
      width: 2400,
      height: 1971,
      alt: 'Conceito de assistente de IA aberto em um notebook, com histórico de conversas e respostas geradas.',
    },
    tone: 'dark',
    available: true,
    caseStudy: {
      context:
        'O conhecimento de um negócio costuma estar espalhado em documentos, conversas e sistemas diferentes.',
      challenge:
        'Permitir consultar, resumir e gerar conteúdo a partir desse conhecimento em linguagem natural, com contexto e histórico.',
      solution:
        'Uma interface conversacional com histórico organizado por categorias, respostas estruturadas e o campo de pergunta sempre à mão.',
      figures: [
        { position: '36% 26%', zoom: 2.6, ratio: '4/5', caption: 'Histórico de conversas' },
        { position: '60% 27%', zoom: 2.5, ratio: '4/3', caption: 'Respostas geradas' },
      ],
      technologies: null,
    },
  },
  {
    slug: 'digital-experience',
    index: '03',
    title: 'Digital Experience',
    service: 'Web Experiences',
    status: 'concept',
    year: '2026',
    summary:
      'Site editorial com tipografia expressiva, fotografia de arquitetura e navegação essencial.',
    disciplines: ['Web experience', 'Direção de arte', 'Front-end'],
    cover: {
      src: '/projects/digital-experience/cover.jpg',
      width: 1800,
      height: 2250,
      alt: 'Conceito de página editorial em tons de azul, com fotografias de luz e sombra e o título “The color that builds”.',
    },
    tone: 'light',
    available: true,
    caseStudy: {
      context:
        'Marcas de arquitetura e design dependem da imagem e da tipografia para comunicar o que fazem.',
      challenge:
        'Criar uma presença editorial em que tipografia e fotografia tenham protagonismo sem comprometer a navegação.',
      solution:
        'Um site editorial em tons de azul, com tipografia expressiva, fotografia de luz e sombra e navegação essencial — índice, sobre, blog e contato.',
      figures: [
        { position: '50% 72%', zoom: 1.9, ratio: '16/9', caption: 'Tipografia expressiva' },
        { position: '42% 27%', zoom: 1.7, ratio: '4/3', caption: 'Fotografia de luz e sombra' },
        { position: '84% 21%', zoom: 3, ratio: '4/5', caption: 'Navegação essencial' },
      ],
      technologies: null,
    },
  },
  {
    slug: 'connected-operations',
    index: '04',
    title: 'Connected Operations',
    service: 'Automation',
    status: 'concept',
    year: '2026',
    summary:
      'Orquestração visual de fluxos que conectam dados, IA, aprovações e notificações entre ferramentas.',
    disciplines: ['Automação', 'Integrações', 'Workflows'],
    cover: {
      src: '/projects/connected-operations/cover.jpg',
      width: 1448,
      height: 1086,
      alt: 'Conceito de painel de automação com fluxo de nodos conectados, integrações e atividade recente.',
    },
    tone: 'dark',
    available: true,
    caseStudy: {
      context:
        'Aprovações, notificações e transferências de dados entre ferramentas ainda são feitas à mão em muitas operações.',
      challenge:
        'Tornar esses fluxos visíveis e automatizáveis, conectando dados, IA, aprovações e notificações em um só lugar.',
      solution:
        'Um editor visual de fluxos com nodos conectados, painel de integrações (CRM, ERP, planilhas e e-mail) e registro de atividade recente.',
      figures: [
        { position: '57% 38%', zoom: 1.6, ratio: '16/9', caption: 'Fluxo de nodos conectados' },
        { position: '88% 66%', zoom: 2.8, ratio: '4/5', caption: 'Integrações' },
        { position: '88% 40%', zoom: 2, ratio: '4/3', caption: 'Atividade recente' },
      ],
      technologies: null,
    },
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Próximo projeto (circular) — navegação ao fim do case. */
export function getNextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length]!;
}

export const statusLabel: Record<Project['status'], string> = {
  concept: 'Conceito',
  client: 'Cliente',
  own: 'Projeto próprio',
};
