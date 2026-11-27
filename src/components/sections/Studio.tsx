import Link from 'next/link';
import { site } from '@/config/site';
import { differentiators, manifesto } from '@/content/studio';
import { KnotFigure } from '@/components/art/KnotFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';

/*
 * 06 — Studio · "Independent by nature. Connected by design." — página de manifesto.
 * A Introduction diz o que fazemos; aqui, como somos. Texto do manifesto do DS §02,
 * diferenciais do DS §01. Sem equipe, números ou clientes (dados não confirmados).
 * Vem depois de Labs para levar a proximidade ("contato direto com quem constrói") ao CTA.
 */

export function Studio() {
  const [first, second] = manifesto.headline;
  const [lead, ...rest] = manifesto.lines;
  const page = site.nav.find((item) => item.href === '/studio');

  return (
    <Section id="studio" theme="light" data-motion-section="studio" aria-labelledby="studio-title">
      <Container className="flex flex-col gap-16 lg:gap-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel index="06">Studio</SectionLabel>
          <p className="font-mono text-label text-muted uppercase">{site.concept}</p>
        </div>

        <h2
          id="studio-title"
          className="flex flex-col font-display text-[clamp(2.5rem,6.6vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.05em]"
        >
          <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
            <span data-reveal-line className="block">
              {first}
            </span>{' '}
          </span>
          <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em] lg:text-right">
            <span data-reveal-line className="block">
              {second.slice(0, -1)}
              <span className="text-navy">.</span>
            </span>
          </span>
        </h2>

        <div className="grid-editorial gap-y-12">
          <figure
            aria-hidden="true"
            className="col-span-3 flex flex-col gap-4 md:col-span-3 lg:col-span-4"
          >
            <div data-parallax="0.06">
              <KnotFigure
                mode="line"
                rotation={[0.5, 0.3, 1.35]}
                haloClassName="stroke-bg"
                className="w-full"
              />
            </div>
            <figcaption className="font-mono text-label text-muted uppercase">
              FIG. 006 — Continuidade
            </figcaption>
          </figure>

          <div className="col-span-full flex flex-col gap-10 md:col-span-5 md:col-start-4 lg:col-span-6 lg:col-start-7">
            <div className="flex flex-col divide-y divide-line border-y border-line">
              <p data-reveal="up" className="py-6 font-display text-h3 font-bold">
                {lead}
              </p>
              {rest.map((line) => (
                <p key={line} data-reveal="up" className="py-6 text-body-lg text-muted">
                  {line}
                </p>
              ))}
            </div>

            <ul className="flex flex-col gap-3">
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

            {page?.available ? (
              <Link
                href={page.href}
                className="inline-flex min-h-control items-center gap-2 self-start font-medium underline-offset-[6px] hover:underline"
              >
                Conheça o estúdio <span aria-hidden="true">↗</span>
              </Link>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
