import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { site } from '@/config/site';
import { Container } from '@/components/layout/Container';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavItems } from '@/components/layout/NavItems';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';
import { round } from '../shared/geometry';
import { KnotFigure } from '../shared/KnotFigure';
import { heroBRender } from './render';

/*
 * B — Immersive Futurism · "The Knot"
 * Palco Carbon. O objeto metálico é o protagonista (render estático + reflexo Navy);
 * O04 The Flow aparece como órbitas finas. A manchete cede espaço à matéria.
 */

// Composição da cena num viewBox 1440×900 (centro do objeto ≈ 64% / 46%).
const VIEW = { w: 1440, h: 900 };
const CENTER = { x: 930, y: 420 };
const ORBITS = [
  { rx: 640, ry: 165, rot: -12, dash: undefined, opacity: 0.32 },
  { rx: 470, ry: 300, rot: 24, dash: '2 7', opacity: 0.4 },
  { rx: 820, ry: 260, rot: -4, dash: undefined, opacity: 0.14 },
] as const;

function pointOnOrbit(o: (typeof ORBITS)[number], angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  const r = (o.rot * Math.PI) / 180;
  const x = o.rx * Math.cos(a);
  const y = o.ry * Math.sin(a);
  return {
    x: round(CENTER.x + x * Math.cos(r) - y * Math.sin(r)),
    y: round(CENTER.y + x * Math.sin(r) + y * Math.cos(r)),
  };
}

const NODES = [
  pointOnOrbit(ORBITS[0], 230),
  pointOnOrbit(ORBITS[1], -60),
  pointOnOrbit(ORBITS[2], 20),
];

function FlowOrbits() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full"
      fill="none"
    >
      <g className="exp-spin-slow">
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={CENTER.x}
            cy={CENTER.y}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.rot} ${CENTER.x} ${CENTER.y})`}
            className="stroke-silver"
            strokeOpacity={o.opacity}
            strokeDasharray={o.dash}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {/* mira técnica no centro do objeto */}
      <g className="stroke-silver" strokeOpacity={0.35}>
        <line x1={CENTER.x - 14} y1={CENTER.y} x2={CENTER.x + 14} y2={CENTER.y} />
        <line x1={CENTER.x} y1={CENTER.y - 14} x2={CENTER.x} y2={CENTER.y + 14} />
      </g>
      {NODES.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={14} className="stroke-blue-light" strokeOpacity={0.35} />
          <circle cx={n.x} cy={n.y} r={4} className="fill-paper" />
        </g>
      ))}
    </svg>
  );
}

function SceneObject() {
  if (!heroBRender) {
    return <KnotFigure mode="chrome" rotation={[0.7, 0.2, 0.4]} className="size-full" />;
  }
  return (
    <>
      <Image
        src={heroBRender.src}
        width={heroBRender.width}
        height={heroBRender.height}
        alt=""
        priority
        sizes="(min-width: 1024px) 95vw, 170vw"
        className="h-auto w-full"
      />
      {/* reflexo Navy: tinge só o metal (blend "color" preserva a luminância) */}
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_68%,var(--nodo-navy)_0%,transparent_58%)] mix-blend-color" />
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_30%,var(--nodo-blue-light)_0%,transparent_40%)] opacity-40 mix-blend-color" />
    </>
  );
}

export function HeroB() {
  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-b-title"
      className="relative isolate overflow-hidden"
    >
      {/* profundidade: halo Blue Deep atrás do objeto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_64%_44%,var(--nodo-blue-deep)_0%,transparent_70%)]"
      />

      {/* objeto protagonista — "lighten" funde o preto do render ao Carbon */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[4svh] left-1/2 -z-10 w-[150vw] -translate-x-1/2 mix-blend-lighten md:w-[130vw] lg:top-[-4svh] lg:left-[18%] lg:w-[96vw] lg:max-w-[1900px] lg:translate-x-0"
      >
        <div className="exp-float relative isolate">
          <SceneObject />
        </div>
      </div>

      <FlowOrbits />

      {/* legibilidade do texto na base */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-0 h-[55%] bg-gradient-to-t from-carbon via-carbon/70 to-transparent"
      />

      <div className="relative z-10 flex min-h-svh flex-col">
        <Container className="flex min-h-20 items-center justify-between gap-6">
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
        </Container>

        {/* legendas de figura presas às órbitas (desktop) */}
        <div aria-hidden="true" className="pointer-events-none relative hidden flex-1 lg:block">
          <p className="absolute top-[10%] left-[33%] font-mono text-label text-muted uppercase">
            O01 — The Knot
            <br />
            <span className="text-silver/60">Chrome · alumínio · esmalte Navy</span>
          </p>
          <p className="absolute top-[2%] right-[4%] text-right font-mono text-label text-muted uppercase">
            O04 — The Flow
            <br />
            <span className="text-silver/60">Sistemas em movimento</span>
          </p>
        </div>

        <Container className="mt-auto flex flex-col gap-10 pb-6">
          <div className="grid-editorial items-end gap-y-8">
            <div className="col-span-4 flex flex-col gap-5 md:col-span-6 lg:col-span-6">
              <SectionLabel index="00">{site.category}</SectionLabel>
              <h1 id="hero-b-title" className="font-display text-h1 font-bold">
                Creativity meets
                <br />
                engineering<span className="text-blue-light">.</span>
              </h1>
            </div>
            <div className="col-span-4 flex flex-col gap-6 md:col-span-6 lg:col-span-4 lg:col-start-9">
              <Text muted>{site.description}</Text>
              <div className="flex flex-wrap gap-3">
                <Button arrow>{site.cta.primary.label}</Button>
                <Button variant="secondary">{site.cta.secondary.label}</Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-label text-muted uppercase">
            <span className="inline-flex items-center gap-2">
              <ArrowDown aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              Role para explorar
            </span>
            <span className="hidden sm:inline">FIG. O01 — Estudo de material</span>
            {heroBRender ? (
              <span className="hidden lg:inline">
                Render: {heroBRender.credit.author} / Unsplash
              </span>
            ) : null}
          </div>
        </Container>
      </div>
    </Section>
  );
}
