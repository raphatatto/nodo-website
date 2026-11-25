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
  /** Contatos reais ainda não definidos — não inventar (DS §16). */
  contact: {
    email: null as string | null,
    socials: [] as { label: string; href: string }[],
  },
} as const;
