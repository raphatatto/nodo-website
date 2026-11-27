import Link from 'next/link';
import { site } from '@/config/site';
import { pillars, positioning } from '@/content/studio';
import { ConnectionFigure } from '@/components/art/ConnectionFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';

/*
 * 01 — Introduction · "dois polos e um nodo".
 * Duas frases em blocos desalinhados (criativo à esquerda, engenheiro deslocado à
 * direita) e, no vazio sob o primeiro bloco, a FIG. 002: a conexão entre as duas.
 * h2 e figura compartilham a grade por subgrid (linhas e colunas alinhadas).
 * O vazio à direita do 1º bloco é intencional: âncora `knot-intro` do The Knot 3D (Etapa 6).
 */

function Line({ text, last }: { text: string; last?: boolean }) {
  // Máscara de linha (M01, Etapa 5): o wrapper recorta e a linha interna sobe. O padding
  // vertical com margem negativa amplia a área de recorte (acentos, "ç") sem mudar o layout.
  const body = last && text.endsWith('.') ? text.slice(0, -1) : text;
  return (
    <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
      <span data-reveal-line className="block whitespace-nowrap">
        {body}
        {last && text.endsWith('.') ? <span className="text-navy">.</span> : null}
      </span>
      {/* espaço real entre linhas em bloco: texto contínuo para busca, cópia e leitores de tela */}{' '}
    </span>
  );
}

export function Introduction() {
  const [first, second] = positioning.headline;
  const studio = site.nav.find((item) => item.href === '/studio');

  return (
    <Section
      id="introduction"
      theme="light"
      data-motion-section="intro"
      aria-labelledby="intro-title"
    >
      <Container className="flex flex-col gap-16 lg:gap-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionLabel index="01">Introduction</SectionLabel>
          <p className="font-mono text-label text-muted uppercase">
            {pillars.map((p) => p.name).join(' · ')}
          </p>
        </div>

        <div className="grid-editorial gap-y-10 md:gap-y-12">
          <h2
            id="intro-title"
            className="col-span-full row-span-2 row-start-1 grid grid-cols-subgrid grid-rows-subgrid font-display text-[clamp(2.5rem,7vw,8rem)] leading-[0.92] font-bold tracking-[-0.05em]"
          >
            <span className="col-span-full row-start-1 block">
              {first.map((t) => (
                <Line key={t} text={t} />
              ))}
            </span>
            <span className="col-span-full row-start-2 block md:col-span-6 md:col-start-3 lg:col-span-9 lg:col-start-4">
              {second.map((t, i) => (
                <Line key={t} text={t} last={i === second.length - 1} />
              ))}
            </span>
          </h2>

          {/* no vão sob "criativos.", ao lado de "Construímos…" (desktop) */}
          <ConnectionFigure className="col-span-3 md:col-span-4 lg:col-span-3 lg:col-start-1 lg:row-start-2 lg:self-end" />

          {/* lugar do objeto 3D na Etapa 6 (vazio intencional sem WebGL) */}
          <div
            aria-hidden="true"
            data-scene-anchor="knot-intro"
            className="hidden lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:block"
          />
        </div>

        <div className="grid-editorial gap-y-10 border-t border-line pt-10">
          <div className="col-span-full flex flex-col gap-6 md:col-span-5 lg:col-span-5">
            <p data-reveal="up" className="max-w-xl text-body-lg">
              {positioning.summary}
            </p>
            {studio?.available ? (
              <Link
                href={studio.href}
                className="inline-flex min-h-control items-center gap-2 self-start font-medium underline-offset-[6px] hover:underline"
              >
                Conheça o estúdio <span aria-hidden="true">↗</span>
              </Link>
            ) : null}
          </div>

          <dl className="col-span-full flex flex-col divide-y divide-line border-y border-line md:col-span-8 lg:col-span-6 lg:col-start-7">
            {pillars.map((p) => (
              <div
                key={p.index}
                data-reveal="up"
                className="flex flex-col gap-1 py-4 md:grid md:grid-cols-[12rem_1fr] md:items-baseline md:gap-4"
              >
                <dt className="flex items-baseline gap-4">
                  <span className="w-6 font-mono text-label text-muted">{p.index}</span>
                  <span className="font-display text-body-lg font-bold">{p.name}</span>
                </dt>
                <dd className="pl-10 text-small text-muted md:pl-0">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
