import Link from 'next/link';
import { site } from '@/config/site';
import { labStatusLabel, labs } from '@/content/labs';
import { KnotFigure } from '@/components/art/KnotFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/*
 * 05 — NODO Labs · "Always in motion." — linguagem mais experimental: grade técnica,
 * mono dominante e um espécime vivo. Só experimentos que existem neste site (estudos
 * procedurais da Etapa 2) ou marcados como pesquisa (DS §12).
 * Os parâmetros na moldura são os reais da figura (p=3, q=4, 480 segmentos).
 */

export function Labs() {
  const page = site.nav.find((item) => item.href === '/labs');

  return (
    <Section id="labs" theme="dark" data-motion-section="labs" aria-labelledby="labs-title">
      <Container className="flex flex-col gap-16 lg:gap-24">
        <header className="grid-editorial items-end gap-y-8">
          <div className="col-span-full flex flex-col gap-8 lg:col-span-8">
            <SectionLabel index="05">NODO Labs</SectionLabel>
            <h2
              id="labs-title"
              className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] font-bold tracking-[-0.055em]"
            >
              <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
                <span data-reveal-line className="block">
                  Always in motion<span className="text-accent-detail">.</span>
                </span>
              </span>
            </h2>
          </div>
          <p
            data-reveal="up"
            className="col-span-full text-body-lg text-muted md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-3"
          >
            Pesquisa, experimentação e desenvolvimento criativo — estudos que nascem aqui e
            alimentam os projetos.
          </p>
        </header>

        <div className="grid-editorial gap-y-12">
          {/* espécime */}
          <figure aria-hidden="true" className="col-span-full flex flex-col gap-4 lg:col-span-7">
            <div className="relative aspect-square overflow-hidden border border-line bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-size-[2.5rem_2.5rem] md:aspect-[4/3]">
              <div className="absolute inset-[8%] flex items-center justify-center">
                <div className="nodo-specimen-spin aspect-square h-full max-w-full">
                  <KnotFigure mode="line" haloClassName="stroke-bg" className="size-full" />
                </div>
              </div>
              {/* coordenadas da moldura */}
              <span className="absolute top-3 left-3 bg-bg px-1 font-mono text-label text-muted uppercase">
                FIG. L-01
              </span>
              <span className="absolute top-3 right-3 bg-bg px-1 font-mono text-label text-muted">
                p = 3 · q = 4
              </span>
              <span className="absolute bottom-3 left-3 bg-bg px-1 font-mono text-label text-muted">
                480 segmentos · SVG
              </span>
              <span className="absolute right-3 bottom-3 bg-bg px-1 font-mono text-label text-muted uppercase">
                Server-rendered
              </span>
            </div>
            <figcaption className="font-mono text-label text-muted uppercase">
              The Knot — geometria procedural, sem JavaScript no navegador
            </figcaption>
          </figure>

          {/* índice de experimentos */}
          <div className="col-span-full flex flex-col gap-6 lg:col-span-5 lg:col-start-8">
            <ol className="flex flex-col border-b border-line">
              {labs.map((lab) => (
                <li key={lab.id} className="flex flex-col gap-3 border-t border-line py-6">
                  <div className="flex items-center justify-between gap-4 font-mono text-label text-muted uppercase">
                    <span>
                      {lab.id} · {lab.object}
                    </span>
                    <span
                      className={cn(
                        'rounded-pill border px-2.5 py-0.5',
                        lab.status === 'research'
                          ? 'border-dashed border-line'
                          : 'border-accent-detail text-accent-detail',
                      )}
                    >
                      {labStatusLabel[lab.status]}
                    </span>
                  </div>
                  <h3 className="font-display text-[clamp(1.375rem,2vw,1.875rem)] leading-tight font-bold">
                    {lab.title}
                  </h3>
                  <p className="text-small text-muted">{lab.summary}</p>
                  <p className="font-mono text-label text-muted">
                    {lab.tech.join(' · ')} · {lab.year}
                  </p>
                </li>
              ))}
            </ol>
            {page?.available ? (
              <Link
                href={page.href}
                className="inline-flex min-h-control items-center gap-2 self-start font-mono text-label uppercase hover:text-accent-detail"
              >
                Ver o Labs <span aria-hidden="true">↗</span>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
