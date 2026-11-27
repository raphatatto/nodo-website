/**
 * Validação do briefing — função pura, sem dependências nem imports (roda no servidor e
 * pode ser testada direto com Node). As opções válidas vêm de src/config/briefing.ts.
 */

export const BRIEFING_FIELDS = [
  'name',
  'company',
  'email',
  'projectType',
  'budget',
  'timeline',
  'description',
  'privacy',
] as const;

export type BriefingField = (typeof BRIEFING_FIELDS)[number];
export type BriefingValues = Record<BriefingField, string>;
export type BriefingErrors = Partial<Record<BriefingField, string>>;

export type BriefingOptions = {
  projectTypes: readonly { value: string }[];
  budgetRanges: readonly { value: string }[];
  timelines: readonly { value: string }[];
};

export const LIMITS = {
  name: { min: 2, max: 120 },
  company: { max: 120 },
  email: { max: 254 },
  description: { min: 20, max: 4000 },
  /** Tempo mínimo (ms) entre abrir e enviar o formulário — antispam, só com JS. */
  minFillMs: 3000,
} as const;

// Formato prático de e-mail (não RFC completo): algo@dominio.tld, sem espaços.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

export function readBriefing(get: (key: string) => unknown): BriefingValues {
  return {
    name: clean(get('name')).replace(/\s+/g, ' '),
    company: clean(get('company')).replace(/\s+/g, ' '),
    email: clean(get('email')).toLowerCase(),
    projectType: clean(get('projectType')),
    budget: clean(get('budget')),
    timeline: clean(get('timeline')),
    description: clean(get('description')),
    privacy: get('privacy') === 'on' ? 'on' : '',
  };
}

export function validateBriefing(v: BriefingValues, opts: BriefingOptions): BriefingErrors {
  const e: BriefingErrors = {};
  const oneOf = (value: string, list: readonly { value: string }[]) =>
    list.some((o) => o.value === value);

  if (v.name.length < LIMITS.name.min) e.name = 'Informe seu nome.';
  else if (v.name.length > LIMITS.name.max) e.name = `Use até ${LIMITS.name.max} caracteres.`;

  if (v.company.length > LIMITS.company.max)
    e.company = `Use até ${LIMITS.company.max} caracteres.`;

  if (!v.email) e.email = 'Informe um e-mail para retorno.';
  else if (v.email.length > LIMITS.email.max || !EMAIL.test(v.email))
    e.email = 'Confira o e-mail (ex.: nome@empresa.com.br).';

  if (!oneOf(v.projectType, opts.projectTypes)) e.projectType = 'Escolha o tipo de projeto.';
  if (v.budget && !oneOf(v.budget, opts.budgetRanges)) e.budget = 'Escolha uma faixa da lista.';
  if (v.timeline && !oneOf(v.timeline, opts.timelines)) e.timeline = 'Escolha um prazo da lista.';

  if (v.description.length < LIMITS.description.min)
    e.description = `Conte um pouco mais (mínimo de ${LIMITS.description.min} caracteres).`;
  else if (v.description.length > LIMITS.description.max)
    e.description = `Use até ${LIMITS.description.max} caracteres.`;

  if (v.privacy !== 'on') e.privacy = 'Confirme que leu como usamos seus dados.';

  return e;
}

/** Sinais de envio automatizado: honeypot preenchido ou envio rápido demais. */
export function looksAutomated(honeypot: unknown, startedAt: unknown, now: number): boolean {
  if (clean(honeypot)) return true;
  const t = Number(startedAt);
  // Sem JS o carimbo não existe: aí vale só o honeypot (não bloquear quem navega sem JS).
  if (!Number.isFinite(t) || t <= 0) return false;
  return now - t < LIMITS.minFillMs;
}
