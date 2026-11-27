import type { Metadata } from 'next';
import { site } from '@/config/site';
import {
  differentiators,
  manifesto,
  manifestoFull,
  pillars,
  positioning,
  process,
  studioPositioning,
  values,
} from '@/content/studio';
import { ConnectionFigure } from '@/components/art/ConnectionFigure';
import { KnotFigure } from '@/components/art/KnotFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Estúdio',
  description:
    'A NODO é um estúdio independente de tecnologia que conecta criatividade, design, engenharia e inteligência artificial.',
};

/*
 * /studio — posicionamento, manifesto e método. Textos oficiais do DS (§01, §02, §11)
 * e o posicionamento definido na Etapa 4. Sem equipe, escritórios, números ou clientes:
 * dados de fundadores aguardam confirmação.
 */
export default function StudioPage() {
  const [first, second] = manifesto.headline;

  return (
    <>
      {/* abertura */}
      <Section theme="light" aria-labelledby="studio-title">
        <Container className="flex flex-col gap-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel>Studio</SectionLabel>
            <p className="font-mono text-label text-muted uppercase">{site.category}</p>
          </div>
          <h1
            id="studio-title"
            className="flex flex-col font-display text-[clamp(2.75rem,7.5vw,8.5rem)] leading-[0.9] font-bold tracking-[-0.05em]"
          >
            <span>{first}</span>{' '}
            <span className="lg:text-right">
              {second.slice(0, -1)}
              <span className="text-navy">.</span>
            </span>
          </h1>
          <div className="grid-editorial gap-y-10">
            <p className="col-span-full text-body-lg md:col-span-5 lg:col-span-5">
              {positioning.summary}
            </p>
            <ul className="col-span-full flex flex-col gap-3 md:col-span-3 md:col-start-6 lg:col-span-4 lg:col-start-9">
              {differentiators.map((d) => (
                <li
                  key={d}
                  className="flex items-center gap-3 font-mono text-label text-muted uppercase"
                >
                  <span aria-hidden="true" className="size-1.5 rounded-pill bg-navy" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* manifesto */}
      <Section theme="dark" aria-labelledby="manifesto-title">
        <Container className="flex flex-col gap-14">
          <div className="flex items-center justify-between gap-4">
            <h2
              id="manifesto-title"
              className="font-mono text-label font-normal text-muted uppercase"
            >
              Manifesto
            </h2>
            <span className="font-mono text-label text-muted uppercase">FIG. 008</span>
          </div>
          <div className="flex flex-col gap-10">
            {manifestoFull.map((line, i) => (
              <p
                key={line}
                data-reveal="up"
                className={cn(
                  'max-w-5xl',
                  i === 0 || i === manifestoFull.length - 1
                    ? 'font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-[1] font-bold tracking-[-0.04em]'
                    : 'text-body-lg text-muted lg:max-w-3xl',
                  i === 1 && 'lg:ml-[calc((100%+var(--grid-gap))/4)]',
                  i === 2 && 'lg:ml-[calc((100%+var(--grid-gap))/3)]',
                  i === 3 && 'lg:ml-[calc((100%+var(--grid-gap))/4)]',
                )}
              >
                {line}
              </p>
            ))}
            <p className="font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-[1] font-bold tracking-[-0.04em] text-accent-detail lg:text-right">
              {site.concept}
            </p>
          </div>
        </Container>
      </Section>

      {/* o que somos */}
      <Section theme="light" aria-labelledby="position-title">
        <Container className="grid-editorial gap-y-12">
          <div className="col-span-full flex flex-col gap-8 lg:col-span-7">
            <h2 id="position-title" className="font-display text-h2 font-bold">
              Estúdio, não agência.
            </h2>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {studioPositioning.isNot.map((line) => (
                <li key={line} className="py-4 text-body-lg text-muted">
                  {line}
                </li>
              ))}
            </ul>
            <p className="font-display text-h3 font-bold">{studioPositioning.is}</p>
            <p className="max-w-xl text-body text-muted">{studioPositioning.blend}</p>
          </div>
          <div className="col-span-3 md:col-span-4 lg:col-span-4 lg:col-start-9 lg:self-end">
            <ConnectionFigure
              labels={['Criatividade', 'Engenharia']}
              caption="FIG. 009 — Estúdio independente"
            />
          </div>
        </Container>
      </Section>

      {/* pilares e valores */}
      <Section theme="dark" aria-labelledby="pillars-title">
        <Container className="flex flex-col gap-16">
          <h2 id="pillars-title" className="font-display text-h2 font-bold">
            Três pilares<span className="text-accent-detail">.</span>
          </h2>
          <ol className="grid gap-px border-y border-line md:grid-cols-3">
            {pillars.map((p) => (
              <li key={p.index} className="flex flex-col gap-4 py-8 md:pr-8">
                <span className="font-mono text-label text-muted">{p.index}</span>
                <h3 className="font-display text-[clamp(2rem,4vw,3.5rem)] leading-none font-bold tracking-[-0.045em]">
                  {p.name}
                </h3>
                <p className="max-w-xs text-body text-muted">{p.text}</p>
              </li>
            ))}
          </ol>
          <div className="grid-editorial items-center gap-y-8">
            <div className="col-span-full flex flex-col gap-4 lg:col-span-8">
              <h3 className="font-mono text-label font-normal text-muted uppercase">Valores</h3>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 font-display text-[clamp(1.5rem,2.6vw,2.5rem)] font-bold tracking-[-0.03em]">
                {values.map((v, i) => (
                  <li key={v} className="flex items-center gap-6">
                    {v}
                    {i < values.length - 1 ? (
                      <span aria-hidden="true" className="size-2 rounded-pill bg-accent-detail" />
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
            <div
              aria-hidden="true"
              className="col-span-2 md:col-span-3 lg:col-span-3 lg:col-start-10"
            >
              <KnotFigure mode="line" rotation={[0.5, 0.3, 2.2]} haloClassName="stroke-bg" />
            </div>
          </div>
        </Container>
      </Section>

      {/* método */}
      <Section theme="light" aria-labelledby="method-title">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="method-title" className="font-display text-h2 font-bold">
              Como trabalhamos
            </h2>
            <p className="font-mono text-label text-muted uppercase">{process.subline}</p>
          </div>
          <ol className="flex flex-col divide-y divide-line border-y border-line">
            {process.steps.map((s) => (
              <li key={s.index} className="grid-editorial items-baseline gap-y-2 py-6">
                <span className="col-span-1 font-mono text-label text-muted">{s.index}</span>
                <h3 className="col-span-3 font-display text-h3 font-bold md:col-span-2 lg:col-span-3">
                  {s.name}
                </h3>
                <p className="col-span-full text-body md:col-span-3 lg:col-span-4">{s.text}</p>
                <p className="col-span-full text-small text-muted md:col-span-2 lg:col-span-4">
                  {s.detail}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <ContactCta index={null} />
    </>
  );
}
