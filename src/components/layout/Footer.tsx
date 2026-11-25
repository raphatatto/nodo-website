import { site } from '@/config/site';
import { Logo } from '@/components/ui/Logo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Container } from './Container';
import { NavItems } from './NavItems';

/** Footer global (DS §09/§11). Contatos reais pendentes — nada é inventado. */
export function Footer() {
  return (
    <footer data-theme="dark" className="border-t border-line">
      <Container className="grid-editorial gap-y-12 py-16">
        <div className="col-span-4 flex flex-col gap-4 md:col-span-4 lg:col-span-5">
          <Logo />
          <p className="max-w-sm text-small text-muted">
            {site.category}. {site.tagline}
          </p>
        </div>

        <div className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-3">
          <SectionLabel>Navegação</SectionLabel>
          <NavItems className="flex flex-col text-small" itemClassName="min-h-10" />
        </div>

        <div className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-4">
          <SectionLabel>Contato</SectionLabel>
          {site.contact.email ? (
            <a
              href={`mailto:${site.contact.email}`}
              className="text-small hover:text-accent-detail"
            >
              {site.contact.email}
            </a>
          ) : (
            <p className="text-small text-muted">Canais de contato em breve.</p>
          )}
        </div>

        <div className="col-span-full flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="font-mono text-label text-muted uppercase">© NODO</p>
          <p className="font-mono text-label text-muted uppercase">{site.concept}</p>
        </div>
      </Container>
    </footer>
  );
}
