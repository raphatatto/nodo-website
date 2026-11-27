'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

type NavItemsProps = {
  className?: string;
  itemClassName?: string;
};

/**
 * Navegação principal (DS §09). Client Component só para marcar a página atual
 * (`aria-current="page"`). Rotas ainda não publicadas aparecem como texto com
 * "em breve" — nunca como links funcionais.
 */
export function NavItems({ className, itemClassName }: NavItemsProps) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {site.nav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            {item.available ? (
              <Link
                href={item.href}
                aria-current={current ? 'page' : undefined}
                className={cn(
                  'inline-flex min-h-control items-center transition-colors duration-fast ease-out hover:text-accent-detail aria-[current=page]:text-accent-detail',
                  itemClassName,
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className={cn(
                  'inline-flex min-h-control items-center gap-2 text-muted',
                  itemClassName,
                )}
              >
                {item.label}
                <span className="font-mono text-label uppercase">em breve</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
