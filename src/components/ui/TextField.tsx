import { useId, type ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type BaseProps = {
  label: string;
  hint?: string;
  error?: string;
  className?: string;
};

type InputProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'input'>, keyof BaseProps> & { multiline?: false };
type TextareaProps = BaseProps &
  Omit<ComponentPropsWithoutRef<'textarea'>, keyof BaseProps> & { multiline: true };

export type TextFieldProps = InputProps | TextareaProps;

const fieldClasses =
  'w-full min-h-control rounded-sm border border-control bg-surface px-4 py-3 text-body text-fg transition-colors duration-fast ease-out placeholder:text-muted focus-visible:border-focus disabled:cursor-not-allowed disabled:opacity-55 aria-invalid:border-error';

/** Label persistente, ajuda e erro associados (DS §09). Placeholder não substitui label. */
export function TextField(props: TextFieldProps) {
  const autoId = useId();
  const id = props.id ?? autoId;
  const hintId = props.hint ? `${id}-hint` : undefined;
  const errorId = props.error ? `${id}-error` : undefined;
  const a11y = {
    id,
    'aria-invalid': props.error ? true : undefined,
    'aria-describedby': [hintId, errorId].filter(Boolean).join(' ') || undefined,
  } as const;

  let control;
  if (props.multiline) {
    const { label, hint, error, className, multiline, ...rest } = props;
    control = <textarea rows={5} {...rest} {...a11y} className={cn(fieldClasses, 'resize-y')} />;
  } else {
    const { label, hint, error, className, multiline, ...rest } = props;
    control = <input type="text" {...rest} {...a11y} className={fieldClasses} />;
  }

  return (
    <div className={cn('flex flex-col gap-2', props.className)}>
      <label htmlFor={id} className="text-small font-medium text-fg">
        {props.label}
      </label>
      {control}
      {props.hint ? (
        <p id={hintId} className="text-small text-muted">
          {props.hint}
        </p>
      ) : null}
      {props.error ? (
        <p id={errorId} className="text-small text-error">
          {props.error}
        </p>
      ) : null}
    </div>
  );
}
