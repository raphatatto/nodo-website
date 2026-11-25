import Link from 'next/link';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

type NavItemsProps = {
  className?: string;
  itemClassName?: string;
};

/**
 * Navegação principal (DS §09). Rotas ainda não publicadas aparecem como texto
 * desabilitado com "em breve" — nunca como links funcionais.
 */
export function NavItems({ className, itemClassName }: NavItemsProps) {
  return (
    <ul className={className}>
      {site.nav.map((item) => (
        <li key={item.href}>
          {item.available ? (
            <Link
              href={item.href}
              className={cn(
                'inline-flex min-h-control items-center transition-colors duration-fast ease-out hover:text-accent-detail',
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
      ))}
    </ul>
  );
}
