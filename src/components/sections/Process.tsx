import type { CSSProperties } from 'react';
import { process } from '@/content/studio';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { cn } from '@/lib/cn';

/*
 * 04 — Process · "From idea to impact." — uma trajetória contínua, não uma grade de cards.
 * Desktop: um trilho (faixa de altura --process-drop) acima das etapas. Os nodos alternam
 * entre o topo e a base do trilho e cada etapa desenha a curva até o nodo seguinte; uma
 * haste fina liga o nodo ao texto. Como as distâncias são exatas (coluna + gutter, altura
 * do trilho), a curva sempre encontra o próximo ponto, em qualquer largura — e nunca cruza
 * o texto. Mobile/tablet: linha vertical contínua com os nodos sobre ela.
 * `data-draw` + pathLength=1: M09 (Etapa 5) desenha a trajetória com a rolagem; sem JS, completa.
 */

const DROP = '8rem';

function Connector({ direction }: { direction: 'down' | 'up' }) {
  const d = direction === 'down' ? 'M0 0 C 55 0, 45 100, 100 100' : 'M0 100 C 55 100, 45 0, 100 0';
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      className="pointer-events-none absolute inset-y-0 left-0 h-full w-[calc(100%+var(--grid-gap))] overflow-visible"
    >
      <path
        d={d}
        pathLength={1}
        data-draw
        className="stroke-fg"
        strokeOpacity={0.55}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export function Process() {
  const { steps } = process;

  return (
    <Section
      id="process"
      theme="light"
      data-motion-section="process"
      aria-labelledby="process-title"
    >
      <Container className="flex flex-col gap-16 lg:gap-24">
        <header className="flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionLabel index="04">Process</SectionLabel>
            <p className="font-mono text-label text-muted uppercase">
              {steps.map((s) => s.name).join(' → ')}
            </p>
          </div>
          <h2
            id="process-title"
            className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] font-bold tracking-[-0.055em]"
          >
            <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
              <span data-reveal-line className="block">
                From idea to impact<span className="text-navy">.</span>
              </span>
            </span>
          </h2>
          <p className="font-mono text-label text-muted uppercase">{process.subline}</p>
        </header>

        <ol
          style={{ '--process-drop': DROP } as CSSProperties}
          className="flex flex-col lg:grid-editorial"
        >
          {steps.map((step, i) => {
            const high = i % 2 === 0; // nodo no topo do trilho
            const last = i === steps.length - 1;
            return (
              <li
                key={step.index}
                className="relative border-l border-line pb-14 pl-8 last:pb-0 lg:col-span-3 lg:border-l-0 lg:pr-6 lg:pb-0 lg:pl-0"
              >
                {/* nodo sobre a linha vertical (mobile/tablet) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute top-2 left-0 size-3 -translate-x-1/2 rounded-pill lg:hidden',
                    last ? 'bg-navy' : 'bg-fg',
                  )}
                />

                {/* trilho (desktop): curva até o próximo nodo + haste até o texto */}
                <div aria-hidden="true" className="relative hidden h-(--process-drop) lg:block">
                  {!last ? <Connector direction={high ? 'down' : 'up'} /> : null}
                  {last ? (
                    <span className="absolute bottom-0 left-0 h-px w-full border-t border-dashed border-line" />
                  ) : null}
                  {high ? <span className="absolute inset-y-0 left-0 w-px bg-line" /> : null}
                  <span
                    className={cn(
                      'absolute left-0 size-3 -translate-x-1/2 rounded-pill',
                      high ? 'top-0 -translate-y-1/2' : 'bottom-0 translate-y-1/2',
                      last ? 'bg-navy' : 'bg-fg',
                    )}
                  />
                </div>

                <div className="flex flex-col gap-4 pt-1 lg:border-l lg:border-line lg:pt-6 lg:pl-5">
                  <span
                    aria-hidden="true"
                    className="font-display text-[clamp(4rem,7vw,7.5rem)] leading-[0.8] font-bold tracking-[-0.06em] text-border-light select-none"
                  >
                    {step.index}
                  </span>
                  <h3 className="font-display text-h3 font-bold">{step.name}</h3>
                  <p className="max-w-xs text-body">{step.text}</p>
                  <p className="max-w-xs text-small text-muted">{step.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}
