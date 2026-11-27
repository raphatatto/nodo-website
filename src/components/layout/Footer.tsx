import Link from 'next/link';
import { site } from '@/config/site';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Container } from './Container';
import { MotionToggle } from './MotionToggle';
import { NavItems } from './NavItems';

/**
 * Footer global (DS §09/§11) — encerramento editorial, não um rodapé de links.
 * Navegação essencial, CTA, legal e contato (só dados confirmados — DS §16),
 * e o wordmark `nodo.` em escala de largura total, recortado na base de propósito.
 * `© NODO` sem ano: com cacheComponents, `new Date()` em Server Component exigiria
 * render dinâmico, e um ano fixo envelhece.
 */
export function Footer() {
  const { primary } = site.cta;
  const { privacy } = site.legal;

  return (
    <footer data-theme="dark" className="overflow-hidden border-t border-line">
      <Container className="flex flex-col gap-16 pt-16 lg:pt-24">
        <div className="grid-editorial gap-y-12">
          <div className="col-span-full flex flex-col gap-6 md:col-span-4 lg:col-span-5">
            <p className="max-w-sm font-display text-h3 font-bold">
              {site.tagline.replace(/\.$/, '')}
              <span className="text-accent-detail">.</span>
            </p>
            <p className="max-w-sm text-small text-muted">
              {site.category}. {site.description}
            </p>
            {primary.available ? (
              <Link
                href={primary.href}
                className="inline-flex min-h-control items-center gap-2 self-start font-medium underline-offset-[6px] hover:underline"
              >
                {primary.label} <span aria-hidden="true">↗</span>
              </Link>
            ) : null}
          </div>

          <nav
            aria-label="Rodapé"
            className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-2 lg:col-start-7"
          >
            <SectionLabel>Navegação</SectionLabel>
            <NavItems className="flex flex-col text-small" itemClassName="min-h-10" />
          </nav>

          <div className="col-span-2 flex flex-col gap-4 md:col-span-2 lg:col-span-2">
            <SectionLabel>Legal</SectionLabel>
            {privacy.available ? (
              <Link
                href={privacy.href}
                className="inline-flex min-h-10 items-center text-small hover:text-accent-detail"
              >
                {privacy.label}
              </Link>
            ) : (
              <p className="inline-flex min-h-10 items-center gap-2 text-small text-muted">
                {privacy.label}
                <span className="font-mono text-label uppercase">em breve</span>
              </p>
            )}
          </div>

          <div className="col-span-full flex flex-col gap-4 md:col-span-2 lg:col-span-2">
            <SectionLabel>Contato</SectionLabel>
            {site.contact.email ? (
              <a
                href={`mailto:${site.contact.email}`}
                className="inline-flex min-h-10 items-center text-small hover:text-accent-detail"
              >
                {site.contact.email}
              </a>
            ) : (
              <p className="text-small text-muted">Canais de contato em breve.</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4 font-mono text-label text-muted uppercase">
          <p>© NODO</p>
          <p className="hidden sm:block">{site.concept}</p>
          <MotionToggle />
        </div>
      </Container>

      {/* wordmark de encerramento — o mesmo `nodo.` do header, em escala de página */}
      <Container aria-hidden="true" className="select-none">
        <p className="-mb-[0.08em] font-display text-[clamp(6rem,30vw,31rem)] leading-[0.8] font-bold tracking-[-0.07em]">
          nodo<span className="text-accent-detail">.</span>
        </p>
      </Container>
    </footer>
  );
}
