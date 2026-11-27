import { Plus } from 'lucide-react';
import { expertiseIntro, services, type Service } from '@/content/services';
import { KnotFigure } from '@/components/art/KnotFigure';
import { ServiceObject } from '@/components/art/objects/ServiceObject';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';

/*
 * 03 — Expertise · "Built to solve." — accordion editorial + palco de objeto.
 * Zero JS: <details name="expertise"> é um accordion exclusivo nativo (teclado, busca
 * do navegador abre o item) e o palco mostra o objeto do serviço aberto via CSS :has()
 * (regras `.expertise` em globals.css). O 1º serviço vem aberto.
 * Etapa 6 (M03): o evento `toggle` dos <details> seta `data-active-service` e a cena 3D
 * troca geometria/material/posição do objeto — os SVGs viram fallback (`data-scene-fallback`).
 */

function Caption({ s }: { s: Service }) {
  return (
    <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-label text-muted uppercase">
      <span>
        Object {s.object.code.slice(1)} — {s.object.name}
      </span>
      <span>{s.object.material}</span>
    </figcaption>
  );
}

export function Expertise() {
  return (
    <Section
      id="expertise"
      theme="dark"
      data-motion-section="expertise"
      aria-labelledby="expertise-title"
      className="expertise"
    >
      <Container className="flex flex-col gap-16 lg:gap-24">
        <header className="grid-editorial items-end gap-y-8">
          <div className="col-span-full flex flex-col gap-8 lg:col-span-8">
            <SectionLabel index="03">Expertise</SectionLabel>
            <h2
              id="expertise-title"
              className="font-display text-[clamp(3rem,10vw,10.5rem)] leading-[0.86] font-bold tracking-[-0.055em]"
            >
              <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
                <span data-reveal-line className="block">
                  Built to solve<span className="text-accent-detail">.</span>
                </span>
              </span>
            </h2>
          </div>
          <div className="col-span-full flex flex-col gap-4 md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-3">
            <p className="font-mono text-label text-muted uppercase">O que construímos</p>
            <p data-reveal="up" className="text-body-lg text-muted">
              {expertiseIntro}
            </p>
          </div>
        </header>

        <div className="grid-editorial gap-y-12">
          {/* lista de serviços */}
          <div className="col-span-full lg:col-span-7">
            {services.map((s, i) => (
              <details
                key={s.id}
                name="expertise"
                data-service={s.id}
                open={i === 0}
                className="group/service border-t border-line last:border-b"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_auto] items-start gap-x-4 py-6 md:grid-cols-[3rem_1fr_auto] lg:py-8 [&::-webkit-details-marker]:hidden">
                  <span className="pt-[0.6em] font-mono text-label text-muted">{s.index}</span>{' '}
                  <span className="flex flex-col gap-2">
                    <span className="font-display text-[clamp(2rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] text-muted transition-colors duration-standard ease-out group-open/service:text-fg group-hover/service:text-fg">
                      {s.name}
                    </span>{' '}
                    <span className="font-mono text-label text-muted uppercase">
                      {s.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="grid size-control place-items-center rounded-pill border border-line transition-colors duration-fast group-hover/service:border-control"
                  >
                    <Plus
                      strokeWidth={1.5}
                      className="size-4 transition-transform duration-standard ease-out group-open/service:rotate-45"
                    />
                  </span>
                </summary>

                <div className="grid gap-8 pb-10 pl-[calc(2rem+1rem)] md:grid-cols-2 md:pl-[calc(3rem+1rem)]">
                  <div className="flex flex-col gap-6">
                    <p className="text-body-lg">{s.summary}</p>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-line pt-4 text-small">
                      <dt className="font-mono text-label text-muted uppercase">Necessidade</dt>
                      <dd>{s.need}</dd>
                      <dt className="font-mono text-label text-muted uppercase">Valor</dt>
                      <dd>{s.value}</dd>
                    </dl>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p className="font-mono text-label text-muted uppercase">Entregáveis</p>
                    <ul className="flex flex-wrap gap-2">
                      {s.deliverables.map((d) => (
                        <li key={d}>
                          <Tag>{d}</Tag>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* objeto dentro do painel (mobile/tablet) */}
                  <figure
                    aria-hidden="true"
                    className="flex max-w-sm flex-col gap-3 md:col-span-2 lg:hidden"
                  >
                    <ServiceObject id={s.object.id} scope={`panel-${s.id}`} />
                    <Caption s={s} />
                  </figure>
                </div>
              </details>
            ))}
          </div>

          {/* palco sticky (desktop) — objeto do serviço aberto */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div
              aria-hidden="true"
              data-scene-anchor="service-stage"
              className="sticky top-24 grid aspect-[4/5] grid-cols-1 grid-rows-1"
            >
              {services.map((s) => (
                <figure
                  key={s.id}
                  data-stage-object={s.object.id}
                  data-scene-fallback
                  className="col-start-1 row-start-1 flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-1 items-center">
                    <ServiceObject id={s.object.id} scope="stage" />
                  </div>
                  <Caption s={s} />
                </figure>
              ))}
              {/* nenhum item aberto: o nó, símbolo de conexão */}
              <figure
                data-stage-object="knot"
                className="col-start-1 row-start-1 flex flex-col justify-between gap-6"
              >
                <div className="flex flex-1 items-center">
                  <KnotFigure mode="line" haloClassName="stroke-bg" className="w-full" />
                </div>
                <figcaption className="font-mono text-label text-muted uppercase">
                  Object 01 — The Knot
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
