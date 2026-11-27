import { site } from '@/config/site';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { cn } from '@/lib/cn';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { NavItems } from './NavItems';
import type { Theme } from './Section';

export type HeaderVariant = 'solid' | 'overlay';

/**
 * Header global (DS §09). Wordmark, navegação discreta e CTA "Iniciar um projeto".
 * - `solid`: barra Dark no fluxo da página (páginas internas), com CTA.
 * - `overlay`: transparente e absoluto sobre a 1ª dobra (Home). Sem CTA no topo:
 *   o Hero B aprovado já traz os CTAs, e a sua linha superior fica idêntica.
 * Adaptação ao tema da seção visível (header sticky): Etapa 5 (M10).
 */
export function Header({
  theme = 'dark',
  variant = 'solid',
}: {
  theme?: Theme;
  variant?: HeaderVariant;
}) {
  const { primary } = site.cta;
  const cta = primary.available ? (
    <Button href={primary.href} arrow className="px-5 py-2 text-small">
      {primary.label}
    </Button>
  ) : null;

  return (
    <header
      data-theme={theme}
      className={cn(
        'z-20',
        variant === 'overlay' ? 'absolute inset-x-0 top-0 bg-transparent' : 'relative',
      )}
    >
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <div className="flex items-center gap-8">
          <nav aria-label="Principal" className="hidden md:block">
            <NavItems className="flex items-center gap-8 text-small" />
          </nav>
          {variant === 'solid' && cta ? <div className="hidden md:block">{cta}</div> : null}
          <MobileMenu
            footer={
              <>
                {primary.available ? (
                  <Button href={primary.href} arrow className="w-full justify-between">
                    {primary.label}
                  </Button>
                ) : null}
                <p className="font-mono text-label text-muted uppercase">{site.concept}</p>
              </>
            }
          >
            <NavItems
              className="flex flex-col divide-y divide-line border-y border-line"
              itemClassName="w-full justify-between py-4 font-display text-h3 font-bold"
            />
          </MobileMenu>
        </div>
      </Container>
    </header>
  );
}
