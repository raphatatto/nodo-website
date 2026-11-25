'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSyncExternalStore } from 'react';
import { cn } from '@/lib/cn';
import { allProposals } from './proposals';

const noop = () => () => {};

/**
 * Navegação de comparação entre as propostas (fixa, discreta).
 * Fica oculta dentro dos iframes de pré-visualização do /playground.
 */
export function ProposalSwitcher() {
  const pathname = usePathname();
  const isTopLevel = useSyncExternalStore(
    noop,
    () => window.self === window.top,
    () => false,
  );

  const current = allProposals.find((p) => pathname === `/playground/${p.slug}`);
  if (!isTopLevel || !current) return null;
  const group = allProposals.filter((p) => p.group === current.group);

  return (
    <nav
      aria-label={current.group === 'hero' ? 'Propostas de Hero' : 'Propostas de Selected Work'}
      data-theme="dark"
      className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-pill border border-line bg-graphite/90 p-1 font-mono text-label uppercase shadow-lg backdrop-blur"
    >
      <Link
        href="/playground"
        className="inline-flex min-h-10 items-center rounded-pill px-4 text-muted hover:text-fg"
      >
        Índice
      </Link>
      {group.map((p) => {
        const href = `/playground/${p.slug}`;
        const isCurrent = pathname === href;
        return (
          <Link
            key={p.slug}
            href={href}
            aria-current={isCurrent ? 'page' : undefined}
            title={`${p.code} — ${p.direction}`}
            className={cn(
              'inline-flex size-10 items-center justify-center rounded-pill transition-colors duration-fast',
              isCurrent ? 'bg-paper text-carbon' : 'text-fg hover:bg-steel',
            )}
          >
            {p.code}
          </Link>
        );
      })}
      <a
        href="#ficha"
        className="inline-flex min-h-10 items-center rounded-pill px-4 text-muted hover:text-fg"
      >
        Ficha ↓
      </a>
    </nav>
  );
}
