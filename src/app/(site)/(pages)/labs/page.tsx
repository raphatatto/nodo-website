import type { Metadata } from 'next';
import { labStatusLabel, labs, type LabEntry } from '@/content/labs';
import { KnotFigure } from '@/components/art/KnotFigure';
import { IntelligenceObject } from '@/components/art/objects/IntelligenceObject';
import { StructureObject } from '@/components/art/objects/StructureObject';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Labs',
  description:
    'NODO Labs: pesquisa, experimentação e desenvolvimento criativo — estudos procedurais e pesquisas em andamento.',
};

/*
 * /labs — catálogo de espécimes (DS §12): status, objetivo, como é feito, tecnologias reais
 * e demo viva quando existe. Linguagem mais experimental (grade técnica, mono), dentro da marca.
 */

function Demo({ demo }: { demo: LabEntry['demo'] }) {
  switch (demo) {
    case 'knot':
      return (
        <div className="nodo-specimen-spin aspect-square h-full max-w-full">
          <KnotFigure mode="line" haloClassName="stroke-bg" className="size-full" />
        </div>
      );
    case 'intelligence':
      return <IntelligenceObject className="max-h-full w-auto" />;
    case 'structure':
      return <StructureObject id="structure-labs" className="max-h-full w-auto" />;
    default:
      return null;
  }
}

export default function LabsPage() {
  return (
    <>
      <Section theme="dark" aria-labelledby="labs-title">
        <Container className="flex flex-col gap-12">
          <div className="grid-editorial items-end gap-y-8">
            <div className="col-span-full flex flex-col gap-8 lg:col-span-8">
              <SectionLabel>NODO Labs</SectionLabel>
              <h1
                id="labs-title"
                className="font-display text-[clamp(3.25rem,11vw,11.5rem)] leading-[0.85] font-bold tracking-[-0.055em]"
              >
                Always in motion<span className="text-accent-detail">.</span>
              </h1>
            </div>
            <p className="col-span-full text-body-lg text-muted md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-4">
              Pesquisa, experimentação e desenvolvimento criativo. Começamos pequeno: aqui entra só
              o que existe neste site ou o que está claramente marcado como pesquisa.
            </p>
          </div>
          <dl className="flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4 font-mono text-label text-muted uppercase">
            {Object.entries(labStatusLabel).map(([key, label]) => (
              <div key={key} className="flex items-center gap-2">
                <dt className="sr-only">Status</dt>
                <dd className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className={cn(
                      'size-2 rounded-pill border',
                      key === 'research'
                        ? 'border-dashed border-muted'
                        : 'border-accent-detail bg-accent-detail',
                    )}
                  />
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section theme="dark" spacing="none" aria-label="Experimentos" className="pb-24 lg:pb-32">
        <Container className="flex flex-col">
          {labs.map((lab, i) => (
            <article
              key={lab.id}
              aria-labelledby={`${lab.id}-title`}
              className="grid-editorial gap-y-8 border-t border-line py-12 lg:py-16"
            >
              <figure
                aria-hidden="true"
                className={cn(
                  'col-span-full flex flex-col gap-3 lg:col-span-6',
                  i % 2 === 1 && 'lg:col-start-7 lg:row-start-1',
                )}
              >
                <div
                  className={cn(
                    'relative aspect-[4/3] overflow-hidden border',
                    lab.demo
                      ? 'border-line bg-[linear-gradient(var(--color-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-border)_1px,transparent_1px)] bg-size-[2.5rem_2.5rem]'
                      : 'border-dashed border-line',
                  )}
                >
                  <div className="absolute inset-[10%] flex items-center justify-center">
                    {lab.demo ? (
                      <Demo demo={lab.demo} />
                    ) : (
                      <p className="max-w-xs text-center font-mono text-label text-muted uppercase">
                        Sem demo pública — em pesquisa
                      </p>
                    )}
                  </div>
                  <span className="absolute top-3 left-3 bg-bg px-1 font-mono text-label text-muted uppercase">
                    FIG. {lab.id}
                  </span>
                  <span className="absolute right-3 bottom-3 bg-bg px-1 font-mono text-label text-muted uppercase">
                    {lab.object}
                  </span>
                </div>
              </figure>

              <div
                className={cn(
                  'col-span-full flex flex-col gap-5 lg:col-span-5',
                  i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8',
                )}
              >
                <div className="flex items-center justify-between gap-4 font-mono text-label text-muted uppercase">
                  <span>
                    {lab.id} · {lab.year}
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
                <h2
                  id={`${lab.id}-title`}
                  className="font-display text-[clamp(1.875rem,3.4vw,3rem)] leading-[1] font-bold tracking-[-0.04em]"
                >
                  {lab.title}
                </h2>
                <p className="text-body-lg text-muted">{lab.summary}</p>
                <div className="flex flex-col gap-2 border-t border-line pt-4">
                  <h3 className="font-mono text-label font-normal text-muted uppercase">
                    Como é feito
                  </h3>
                  <p className="text-small">{lab.method}</p>
                </div>
                <p className="font-mono text-label text-muted">{lab.tech.join(' · ')}</p>
              </div>
            </article>
          ))}
        </Container>
      </Section>

      <ContactCta index={null} />
    </>
  );
}
