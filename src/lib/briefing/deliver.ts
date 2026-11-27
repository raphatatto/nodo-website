import type { BriefingValues } from './validate';

/**
 * Entrega do briefing — adaptador único para n8n, CRM ou serviço de e-mail.
 * Destino em `BRIEFING_WEBHOOK_URL` (segredo; só no servidor). Contrato: POST JSON,
 * sucesso apenas com resposta 2xx. Sem a variável: `unavailable` — nunca sucesso simulado.
 * Nada é gravado nem registrado em log com dados pessoais.
 * Importado apenas pela Server Action (actions.ts, `use server`) — nunca por Client Components.
 */

export type DeliveryResult = 'sent' | 'unavailable' | 'failed';

const TIMEOUT_MS = 8000;

export async function deliverBriefing(values: BriefingValues): Promise<DeliveryResult> {
  const url = process.env.BRIEFING_WEBHOOK_URL;
  if (!url) return 'unavailable';

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        source: 'nodo-site/contact',
        submittedAt: new Date().toISOString(),
        ...values,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: 'no-store',
    });
    return res.ok ? 'sent' : 'failed';
  } catch {
    // Sem detalhes no log: a mensagem poderia conter dados pessoais.
    console.error('[briefing] falha ao entregar (rede, timeout ou destino indisponível)');
    return 'failed';
  }
}
