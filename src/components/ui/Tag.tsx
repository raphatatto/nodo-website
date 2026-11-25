import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

/** Categoria/tecnologia. Não interativo — não deve parecer clicável (DS §09). */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-pill border border-line px-3 py-1 font-mono text-label text-muted uppercase',
        className,
      )}
    >
      {children}
    </span>
  );
}
