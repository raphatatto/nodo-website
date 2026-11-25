import { Logo } from '@/components/ui/Logo';
import { Container } from './Container';
import { MobileMenu } from './MobileMenu';
import { NavItems } from './NavItems';
import type { Theme } from './Section';

/**
 * Header global (Server Component). Apenas o menu mobile é Client Component.
 * Tema padrão Dark porque a primeira dobra prevista é Dark (DS §11).
 * Adaptação automática ao tema da seção visível fica para a etapa de Motion.
 */
export function Header({ theme = 'dark' }: { theme?: Theme }) {
  return (
    <header data-theme={theme} className="relative z-20">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Principal" className="hidden md:block">
          <NavItems className="flex items-center gap-8 text-small" />
        </nav>
        <MobileMenu>
          <NavItems
            className="flex flex-col divide-y divide-line border-y border-line"
            itemClassName="w-full justify-between py-4 font-display text-h3 font-bold"
          />
        </MobileMenu>
      </Container>
    </header>
  );
}
