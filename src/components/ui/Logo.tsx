import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * Wordmark provisório `nodo.` em texto (DS §04).
 * Substituir pelo SVG definitivo em public/brand/ quando aprovado.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="NODO — página inicial"
      className={cn(
        'inline-flex min-h-control items-center font-display text-[1.75rem] leading-none font-bold tracking-(--tracking-display)',
        className,
      )}
    >
      nodo<span className="text-accent-detail">.</span>
    </Link>
  );
}
