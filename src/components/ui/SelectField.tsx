import { useId, type ComponentPropsWithoutRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

type SelectFieldProps = Omit<ComponentPropsWithoutRef<'select'>, 'children'> & {
  label: string;
  options: readonly { value: string; label: string }[];
  /** Texto da opção vazia inicial. */
  placeholder?: string;
  hint?: string;
  error?: string;
  className?: string;
};

/** Select nativo com label persistente, ajuda e erro associados (DS §09, padrão do TextField). */
export function SelectField({
  label,
  options,
  placeholder = 'Selecione',
  hint,
  error,
  className,
  id: idProp,
  ...rest
}: SelectFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="text-small font-medium text-fg">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={[hintId, errorId].filter(Boolean).join(' ') || undefined}
          className="min-h-control w-full appearance-none rounded-sm border border-control bg-surface py-3 pr-12 pl-4 text-body text-fg transition-colors duration-fast ease-out focus-visible:border-focus disabled:cursor-not-allowed disabled:opacity-55 aria-invalid:border-error"
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden="true"
          strokeWidth={1.5}
          className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        />
      </div>
      {hint ? (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-small text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
