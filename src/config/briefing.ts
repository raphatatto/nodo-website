import { site } from '@/config/site';

/**
 * Formulário de briefing (/contact) — opções configuráveis.
 *
 * ⚠️ Faixas de orçamento e prazos são uma PROPOSTA (Etapa 4), pendente de confirmação
 * pela NODO. Ajuste aqui: o formulário e a validação no servidor leem esta lista.
 *
 * Entrega: `BRIEFING_WEBHOOK_URL` (n8n, CRM ou serviço de e-mail) — ver src/lib/briefing/deliver.ts.
 * Sem a variável, o site informa que o recebimento ainda não está disponível.
 */

export type Option = { value: string; label: string };

export const briefingConfig = {
  projectTypes: [
    ...site.services.map((s) => ({ value: s.name, label: `${s.name} — ${s.description}` })),
    { value: 'unknown', label: 'Ainda não sei' },
  ],
  budgetRanges: [
    { value: 'ate-10k', label: 'Até R$ 10 mil' },
    { value: '10k-30k', label: 'R$ 10 mil a R$ 30 mil' },
    { value: '30k-80k', label: 'R$ 30 mil a R$ 80 mil' },
    { value: '80k-mais', label: 'Acima de R$ 80 mil' },
    { value: 'nao-sei', label: 'Ainda não sei' },
  ],
  timelines: [
    { value: 'ate-1-mes', label: 'Até 1 mês' },
    { value: '1-3-meses', label: '1 a 3 meses' },
    { value: '3-6-meses', label: '3 a 6 meses' },
    { value: 'flexivel', label: 'Flexível' },
  ],
} satisfies Record<string, Option[]>;

/** O recebimento está configurado? (avaliado no servidor, no build/requisição) */
export function briefingDeliveryConfigured(): boolean {
  return Boolean(process.env.BRIEFING_WEBHOOK_URL);
}
