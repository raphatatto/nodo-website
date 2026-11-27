'use client';

import Link from 'next/link';
import { useActionState, useEffect, useRef } from 'react';
import type { Option } from '@/config/briefing';
import { Button } from '@/components/ui/Button';
import { CheckboxField } from '@/components/ui/CheckboxField';
import { SelectField } from '@/components/ui/SelectField';
import { TextField } from '@/components/ui/TextField';
import { LIMITS, type BriefingField } from '@/lib/briefing/validate';
import { cn } from '@/lib/cn';
import { submitBriefing, type BriefingState } from './actions';

const LABELS: Record<BriefingField, string> = {
  name: 'Nome',
  company: 'Empresa',
  email: 'E-mail',
  projectType: 'Tipo de projeto',
  budget: 'Orçamento estimado',
  timeline: 'Prazo desejado',
  description: 'Descrição do projeto',
  privacy: 'Uso dos dados',
};

const fieldId = (f: BriefingField) => `briefing-${f}`;

type Props = {
  options: { projectTypes: Option[]; budgetRanges: Option[]; timelines: Option[] };
  privacy: { href: string; available: boolean };
};

/**
 * Formulário de briefing (DS §09). Funciona sem JS (Server Function via <form action>);
 * com JS, mostra estado de envio e leva o foco ao resumo. Validação final sempre no servidor.
 */
export function BriefingForm({ options, privacy }: Props) {
  const [state, action, pending] = useActionState<BriefingState, FormData>(submitBriefing, {
    status: 'idle',
  });
  const statusRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLInputElement>(null);

  // Carimbo de abertura (antispam): só existe com JS; o servidor ignora quando ausente.
  useEffect(() => {
    if (stampRef.current) stampRef.current.value = String(Date.now());
  }, [state.nonce]);

  useEffect(() => {
    if (state.status !== 'idle') statusRef.current?.focus();
  }, [state.status, state.nonce]);

  const v = state.values ?? {};
  const err = state.errors ?? {};
  const errorList = Object.entries(err) as [BriefingField, string][];

  return (
    <form key={state.nonce ?? 0} action={action} noValidate className="flex flex-col gap-8">
      {/* resumo do envio — região anunciada e focada após cada resposta */}
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className={cn(
          'outline-none empty:hidden',
          state.status !== 'idle' && 'flex flex-col gap-3 border-l-2 py-1 pl-4',
          state.status === 'sent' && 'border-success',
          state.status === 'unavailable' && 'border-accent-detail',
          (state.status === 'invalid' || state.status === 'failed') && 'border-error',
        )}
      >
        {state.message ? (
          <p
            className={cn(
              'text-body font-medium',
              state.status === 'sent' && 'text-success',
              (state.status === 'invalid' || state.status === 'failed') && 'text-error',
            )}
          >
            {state.message}
          </p>
        ) : null}
        {errorList.length > 0 ? (
          <ul className="flex flex-col gap-1 text-small">
            {errorList.map(([field, message]) => (
              <li key={field}>
                <a href={`#${fieldId(field)}`} className="underline underline-offset-4">
                  {LABELS[field]}
                </a>
                : {message}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id={fieldId('name')}
          name="name"
          label={LABELS.name}
          autoComplete="name"
          required
          maxLength={LIMITS.name.max}
          defaultValue={v.name}
          error={err.name}
        />
        <TextField
          id={fieldId('company')}
          name="company"
          label={`${LABELS.company} (opcional)`}
          autoComplete="organization"
          maxLength={LIMITS.company.max}
          defaultValue={v.company}
          error={err.company}
        />
        <TextField
          id={fieldId('email')}
          name="email"
          type="email"
          label={LABELS.email}
          autoComplete="email"
          inputMode="email"
          required
          maxLength={LIMITS.email.max}
          defaultValue={v.email}
          error={err.email}
        />
        <SelectField
          id={fieldId('projectType')}
          name="projectType"
          label={LABELS.projectType}
          options={options.projectTypes}
          required
          defaultValue={v.projectType ?? ''}
          error={err.projectType}
        />
        <SelectField
          id={fieldId('budget')}
          name="budget"
          label={`${LABELS.budget} (opcional)`}
          options={options.budgetRanges}
          placeholder="Prefiro não informar"
          defaultValue={v.budget ?? ''}
          error={err.budget}
        />
        <SelectField
          id={fieldId('timeline')}
          name="timeline"
          label={`${LABELS.timeline} (opcional)`}
          options={options.timelines}
          placeholder="Prefiro não informar"
          defaultValue={v.timeline ?? ''}
          error={err.timeline}
        />
      </div>

      <TextField
        id={fieldId('description')}
        name="description"
        multiline
        rows={7}
        label={LABELS.description}
        hint={`O que você quer construir ou qual desafio precisa resolver. Mínimo de ${LIMITS.description.min} caracteres.`}
        required
        minLength={LIMITS.description.min}
        maxLength={LIMITS.description.max}
        defaultValue={v.description}
        error={err.description}
      />

      <CheckboxField
        id={fieldId('privacy')}
        name="privacy"
        required
        defaultChecked={v.privacy === 'on'}
        error={err.privacy}
      >
        Entendo que os dados informados servem apenas para responder a este contato
        {privacy.available ? (
          <>
            {' '}
            (veja a{' '}
            <Link href={privacy.href} className="underline underline-offset-4">
              Política de Privacidade
            </Link>
            ).
          </>
        ) : (
          <> (política de privacidade em preparação).</>
        )}
      </CheckboxField>

      {/* antispam: honeypot invisível + carimbo de abertura */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="briefing-website">Não preencha este campo</label>
        <input id="briefing-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={stampRef} type="hidden" name="startedAt" defaultValue="" />

      <div className="flex flex-wrap items-center gap-6">
        <Button type="submit" arrow loading={pending}>
          {pending ? 'Enviando…' : 'Enviar briefing'}
        </Button>
        <p className="text-small text-muted">Campos sem “(opcional)” são obrigatórios.</p>
      </div>
    </form>
  );
}
