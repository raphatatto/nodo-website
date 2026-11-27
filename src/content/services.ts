import { site } from '@/config/site';

/**
 * Serviços — detalhe da oferta comercial (Expertise na Home e /expertise).
 * Nomes, índices e descrições curtas vêm de `site.services` (fonte única);
 * aqui entram entregáveis, necessidades e o objeto NODO associado.
 * Fonte: NODO/README.md §01 (oferta comercial; tabela "Público e necessidades") e §07 (objetos).
 * Sem promessas de economia, vendas ou desempenho (DS §01).
 */

export type ServiceName = (typeof site.services)[number]['name'];
export type ServiceObjectId = 'experience' | 'structure' | 'flow' | 'intelligence';

type ServiceDetail = {
  /** Identificador estável (data-service, âncoras, cena 3D). */
  id: 'web' | 'products' | 'automation' | 'ai';
  summary: string;
  deliverables: string[];
  /** DS §01 — necessidade do cliente e valor percebido. */
  need: string;
  value: string;
  object: { id: ServiceObjectId; code: string; name: string; material: string };
};

const details: Record<ServiceName, ServiceDetail> = {
  'Web Experiences': {
    id: 'web',
    summary:
      'Presença digital confiável: sites e experiências que comunicam com clareza o que o seu negócio faz.',
    deliverables: ['Sites institucionais', 'Landing pages', 'UX/UI', 'Experiências interativas'],
    need: 'Ter uma presença digital confiável',
    value: 'Credibilidade, oportunidades e clareza',
    object: { id: 'experience', code: 'O05', name: 'The Experience', material: 'Vidro · camadas' },
  },
  'Digital Products': {
    id: 'products',
    summary:
      'Sistemas sob medida para centralizar operações e dados, do MVP à plataforma em uso diário.',
    deliverables: ['Plataformas web', 'Aplicativos', 'Dashboards', 'CRM', 'MVPs'],
    need: 'Centralizar operações e dados',
    value: 'Controle e autonomia',
    object: {
      id: 'structure',
      code: 'O02',
      name: 'The Structure',
      material: 'Alumínio escovado · esmalte Navy',
    },
  },
  Automation: {
    id: 'automation',
    summary:
      'Identificamos e automatizamos os processos que fazem sentido, conectando as ferramentas que você já usa.',
    deliverables: [
      'APIs',
      'Workflows',
      'Processamento de documentos',
      'Integração entre ferramentas',
    ],
    need: 'Reduzir tarefas repetitivas',
    value: 'Eficiência e menos retrabalho',
    object: { id: 'flow', code: 'O04', name: 'The Flow', material: 'Metal · trajetórias' },
  },
  'Artificial Intelligence': {
    id: 'ai',
    summary:
      'IA aplicada quando existe uma necessidade real: assistentes, agentes e análise de dados para apoiar decisões.',
    deliverables: [
      'Assistentes',
      'Agentes',
      'Busca em bases de conhecimento',
      'Análise inteligente de dados',
    ],
    need: 'Aplicar IA a uma atividade',
    value: 'Apoio à decisão e produtividade',
    object: {
      id: 'intelligence',
      code: 'O03',
      name: 'The Intelligence',
      material: 'Rede de nodos · prata',
    },
  },
};

export const services = site.services.map((s) => ({ ...s, ...details[s.name] }));
export type Service = (typeof services)[number];

/** DS §11 — copy de partida "Serviços". */
export const expertiseIntro =
  'De uma presença digital a sistemas que conectam toda a operação, desenvolvemos soluções de acordo com o seu negócio.';
