import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

type SectionLabelProps = {
  /** Índice editorial, ex.: "01". */
  index?: string;
  children: ReactNode;
  className?: string;
};

/** Índice editorial em mono (DS §07/§09). Não substitui o heading semântico. */
export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <p className={cn('font-mono text-label text-muted uppercase', className)}>
      {index ? (
        <>
          <span>{index}</span>
          <span aria-hidden="true"> / </span>
        </>
      ) : null}
      {children}
    </p>
  );
}
