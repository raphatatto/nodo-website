import type { site } from '@/config/site';

/**
 * Projetos — fonte única para Selected Work, /work e /work/[slug] (futuras).
 *
 * Todos os itens atuais são CONCEITOS (estudos da NODO): não há clientes,
 * métricas, resultados ou depoimentos. Ao adicionar um projeto real, usar
 * `status: 'client' | 'own'` e informar apenas fatos autorizados (DS §12).
 *
 * Futuro: `/work/[slug]` usa `generateStaticParams = () => projects.map(p => ({ slug: p.slug }))`
 * e `getProject(slug)`; ao publicar a rota, mudar `available` para true.
 */
export type ProjectService = (typeof site.services)[number]['name'];

export type ProjectCoverImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
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
    available: false,
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
    available: false,
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
    available: false,
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
    available: false,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const statusLabel: Record<Project['status'], string> = {
  concept: 'Conceito',
  client: 'Cliente',
  own: 'Projeto próprio',
};
