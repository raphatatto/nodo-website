'use server';

import { briefingConfig } from '@/config/briefing';
import { deliverBriefing } from '@/lib/briefing/deliver';
import {
  looksAutomated,
  readBriefing,
  validateBriefing,
  type BriefingErrors,
  type BriefingValues,
} from '@/lib/briefing/validate';

export type BriefingState = {
  status: 'idle' | 'invalid' | 'unavailable' | 'sent' | 'failed';
  message?: string;
  errors?: BriefingErrors;
  /** Valores devolvidos para repovoar o formulário (nunca persistidos). */
  values?: Partial<BriefingValues>;
  /** Muda a cada resposta: remonta os campos com os valores devolvidos. */
  nonce?: number;
};

/**
 * Server Function do briefing: validação no servidor antes de qualquer envio.
 * Nunca simula sucesso: sem destino configurado, responde `unavailable`.
 */
export async function submitBriefing(
  _prev: BriefingState,
  formData: FormData,
): Promise<BriefingState> {
  const nonce = Date.now();
  const values = readBriefing((key) => formData.get(key));

  if (looksAutomated(formData.get('website'), formData.get('startedAt'), nonce)) {
    return {
      status: 'invalid',
      message: 'Não foi possível validar o envio. Aguarde alguns segundos e tente novamente.',
      values,
      nonce,
    };
  }

  const errors = validateBriefing(values, briefingConfig);
  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', message: 'Revise os campos indicados.', errors, values, nonce };
  }

  const result = await deliverBriefing(values);

  if (result === 'sent') {
    return {
      status: 'sent',
      message: 'Briefing recebido. O retorno será feito pelo e-mail informado.',
      nonce,
    };
  }
  if (result === 'unavailable') {
    return {
      status: 'unavailable',
      message:
        'O recebimento de briefings ainda não está disponível. Seus dados foram validados, mas não foram enviados nem armazenados.',
      values,
      nonce,
    };
  }
  return {
    status: 'failed',
    message:
      'Não conseguimos enviar agora. Seus dados continuam nesta página: tente novamente em instantes.',
    values,
    nonce,
  };
}
