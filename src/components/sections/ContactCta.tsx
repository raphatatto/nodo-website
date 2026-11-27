import { site } from '@/config/site';
import { ConnectionFigure } from '@/components/art/ConnectionFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';

/*
 * 07 — Contact · "Let's build something." — encerramento em Navy (DS §10, roteiro 7):
 * tipografia em escala máxima, espaço negativo e um único CTA Paper/Navy.
 * O formulário completo vive em /contact (Home leve, CTA evidente).
 * `knot-contact`: o The Knot retorna aqui na Etapa 6, se a cena estiver ativa.
 */

/** `index`: numeração editorial na Home ("07"); `null` nas páginas internas. */
export function ContactCta({ index = '07' }: { index?: string | null }) {
  const { primary } = site.cta;

  return (
    <Section
      id="contato"
      theme="signal"
      data-motion-section="contact"
      aria-labelledby="contact-title"
      className="relative overflow-hidden"
    >
      <Container className="flex flex-col gap-16 lg:gap-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel index={index ?? undefined}>Contact</SectionLabel>
          <p className="font-mono text-label text-muted uppercase">{site.concept}</p>
        </div>

        <h2
          id="contact-title"
          className="font-display text-[clamp(3.5rem,13vw,13.5rem)] leading-[0.84] font-bold tracking-[-0.06em]"
        >
          <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
            <span data-reveal-line className="block">
              Let’s build
            </span>{' '}
          </span>
          <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
            <span data-reveal-line className="block">
              something<span className="text-blue-light">.</span>
            </span>
          </span>
        </h2>

        <div className="grid-editorial items-end gap-y-12">
          <div className="col-span-full flex flex-col gap-8 md:col-span-5 lg:col-span-5">
            <p data-reveal="up" className="font-display text-h3 font-bold">
              Toda grande ideia começa com uma conexão.
            </p>
            <p data-reveal="up" className="max-w-md text-body-lg text-muted">
              Conte o que você quer construir ou qual desafio precisa resolver.
            </p>
            {primary.available ? (
              <Button href={primary.href} arrow className="self-start">
                {primary.label}
              </Button>
            ) : null}
          </div>

          <div className="col-span-3 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
            <div data-scene-anchor="knot-contact">
              <ConnectionFigure labels={['Sua ideia', 'NODO']} caption="FIG. 007 — Conexão" />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
