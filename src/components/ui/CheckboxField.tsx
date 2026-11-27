import { useId, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type CheckboxFieldProps = Omit<ComponentPropsWithoutRef<'input'>, 'type' | 'children'> & {
  /** Rótulo explícito (DS §09 Choice/Checkbox) — pode conter link. */
  children: ReactNode;
  error?: string;
  className?: string;
};

/** Checkbox nativo com alvo ≥ 44px, rótulo clicável e erro associado. */
export function CheckboxField({
  children,
  error,
  className,
  id: idProp,
  ...rest
}: CheckboxFieldProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <div className="flex min-h-control items-start gap-3 py-2">
        <input
          id={id}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-(--color-accent)"
          {...rest}
        />
        <label htmlFor={id} className="cursor-pointer text-small text-fg">
          {children}
        </label>
      </div>
      {error ? (
        <p id={errorId} className="text-small text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
