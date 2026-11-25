/**
 * Conteúdo institucional base — fonte: NODO/README.md §02 e §11.
 * Itens com `available: false` são rotas planejadas que ainda não existem:
 * não devem ser renderizados como links.
 */
export type NavItem = {
  label: string;
  href: string;
  available: boolean;
};

export const site = {
  name: 'NODO',
  category: 'Independent Technology Studio',
  tagline: 'Creativity meets engineering.',
  concept: 'Everything is connected.',
  description:
    'Criamos sites, sistemas, automações e soluções de inteligência artificial sob medida para transformar negócios.',
  locale: 'pt-BR',
  cta: {
    primary: { label: 'Iniciar um projeto', href: '/contact', available: false },
    secondary: { label: 'Explorar projetos', href: '/work', available: false },
  },
  nav: [
    { label: 'Projetos', href: '/work', available: false },
    { label: 'Serviços', href: '/expertise', available: false },
    { label: 'Estúdio', href: '/studio', available: false },
    { label: 'Contato', href: '/contact', available: false },
  ] satisfies NavItem[],
  /** Oferta comercial — DS §01. */
  services: [
    { index: '01', name: 'Web Experiences', description: 'Sites e experiências digitais' },
    { index: '02', name: 'Digital Products', description: 'Sistemas e produtos digitais' },
    { index: '03', name: 'Automation', description: 'Automação e integrações' },
    { index: '04', name: 'Artificial Intelligence', description: 'IA aplicada' },
  ],
  /** Contatos reais ainda não definidos — não inventar (DS §16). */
  contact: {
    email: null as string | null,
    socials: [] as { label: string; href: string }[],
  },
} as const;
