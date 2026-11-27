import { site } from '@/config/site';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavItems } from '@/components/layout/NavItems';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';
import { KnotFigure } from '@/components/art/KnotFigure';

/*
 * A — Editorial Minimalism · "Signal Line"
 * Página de revista em Paper. A faixa Navy é o único gesto de cor: atravessa a
 * manchete e o texto sob ela inverte para Paper (cópia recortada por clip-path).
 */

// Posição/largura da faixa em relação ao bloco da manchete (valores de composição).
// Percentuais relativos à largura do próprio texto (wrapper w-fit): a faixa
// cruza "Creativity" e "engineering" e deixa "meets" livre em qualquer tela.
const bandVars = '[--band-x:62%] [--band-w:clamp(2.25rem,6vw,6.5rem)]';

function Headline({ inverted = false }: { inverted?: boolean }) {
  return (
    <span
      className={inverted ? 'block text-paper' : 'block'}
      style={
        inverted
          ? {
              clipPath: 'inset(-10% calc(100% - var(--band-x) - var(--band-w)) -10% var(--band-x))',
            }
          : undefined
      }
    >
      <span className="block">Creativity</span>
      <span className="block">meets</span>
      <span className="block">
        engineering<span className={inverted ? 'text-paper' : 'text-navy'}>.</span>
      </span>
    </span>
  );
}

export function HeroA() {
  return (
    <Section
      theme="light"
      spacing="none"
      aria-labelledby="hero-a-title"
      className="relative overflow-hidden"
    >
      <div className="flex min-h-svh flex-col p-2 md:p-4 lg:p-6">
        <div className="relative flex flex-1 flex-col border border-line">
          {/* Header dentro da moldura */}
          <header className="relative z-30 flex min-h-16 items-center justify-between gap-6 border-b border-line px-4 md:px-8">
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
          </header>

          <div className="relative z-10 flex flex-1 flex-col justify-between gap-10 overflow-hidden px-4 pt-8 pb-5 md:px-8 md:pt-12 lg:px-12 lg:pt-14">
            <SectionLabel index="01">Signal · {site.category}</SectionLabel>

            <div className="grid-editorial items-start gap-y-10">
              {/* Manchete + faixa Navy */}
              <div className={`relative col-span-full w-fit lg:col-span-9 ${bandVars}`}>
                {/* fita marcadora: desce do header e termina abaixo da manchete */}
                <span
                  aria-hidden="true"
                  className="exp-band-in absolute -top-6 -bottom-8 left-(--band-x) flex w-(--band-w) items-end justify-center bg-navy pb-3 lg:-top-[100vh] lg:-bottom-16"
                >
                  <span className="font-mono text-label text-paper">01</span>
                </span>
                <h1
                  id="hero-a-title"
                  className="relative font-display text-[14vw] leading-[0.9] font-bold tracking-(--tracking-display) md:text-hero"
                >
                  <Headline />
                </h1>
                <p
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 font-display text-[14vw] leading-[0.9] font-bold tracking-(--tracking-display) md:text-hero"
                >
                  <Headline inverted />
                </p>
              </div>

              {/* O05 The Experience — planos translúcidos com o estudo de The Knot */}
              <figure className="relative col-span-3 col-start-10 hidden lg:block">
                <div aria-hidden="true" className="relative aspect-[4/5] w-full">
                  <span className="absolute inset-0 translate-x-[14%] -translate-y-[8%] border border-line bg-white/30" />
                  <span className="absolute inset-0 translate-x-[7%] -translate-y-[4%] border border-line bg-white/50" />
                  <span className="absolute inset-0 flex items-center justify-center border border-line bg-white/80">
                    <KnotFigure mode="line" haloClassName="stroke-white" className="w-[96%]" />
                  </span>
                  <span className="absolute top-3 left-3 font-mono text-label text-muted">+</span>
                  <span className="absolute right-3 bottom-3 font-mono text-label text-muted">
                    +
                  </span>
                </div>
                <figcaption className="mt-4 font-mono text-label text-muted uppercase">
                  FIG. 001 — The Knot, estudo em linha
                </figcaption>
              </figure>
            </div>

            <div className="grid-editorial gap-y-10">
              <div className="col-span-4 flex flex-col gap-6 md:col-span-4 lg:col-span-5">
                <Text size="lg">{site.description}</Text>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                  <Button arrow>{site.cta.primary.label}</Button>
                  <Button variant="text">{site.cta.secondary.label}</Button>
                </div>
              </div>

              {/* Sumário — os serviços como índice de revista */}
              <div className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9">
                <p className="mb-3 font-mono text-label text-muted uppercase">Sumário</p>
                <ol className="divide-y divide-line border-y border-line">
                  {site.services.map((service) => (
                    <li key={service.index} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-2.5">
                      <span className="pt-0.5 font-mono text-label text-navy">{service.index}</span>
                      <span className="flex flex-col">
                        <span className="text-body font-medium">{service.name}</span>
                        <span className="text-small text-muted">{service.description}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex items-end justify-between gap-6 border-t border-line pt-4">
              <p className="font-mono text-label text-muted uppercase">{site.concept}</p>
              <p className="font-mono text-label text-muted uppercase">Vol. 01 — Edição Fundação</p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
