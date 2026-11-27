import { site } from '@/config/site';
import { Container } from '@/components/layout/Container';
import { MobileMenu } from '@/components/layout/MobileMenu';
import { NavItems } from '@/components/layout/NavItems';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/cn';
import { fibonacciSphere, project, rotate, round } from '@/lib/geometry';
import { MetalCube, MetalDefs } from '@/components/art/Metal';

/*
 * C — Editorial Futurism · "Connected Index"
 * A manchete ocupa a página; O03 The Intelligence (esfera de nodos) e O02 The
 * Structure (módulos) atravessam as letras — parte atrás, parte à frente — e
 * ligam a marca aos quatro serviços. Faixa Paper inferior = virada de página.
 */

const SIZE = 1000;
const sphere = fibonacciSphere(280).map((v) =>
  project(rotate(v, 0.5, 0.9, 0.15), { size: SIZE, distance: 5, zoom: 1.9 }),
);
const back = sphere.filter((p) => p.z < 0);
const front = sphere.filter((p) => p.z >= 0);

// Rede: cada nodo do hemisfério posterior liga-se ao vizinho mais próximo.
const links = back.map((a) => {
  let best = back[0]!;
  let min = Infinity;
  for (const b of back) {
    if (a === b) continue;
    const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
    if (d < min) {
      min = d;
      best = b;
    }
  }
  return { a, b: best };
});

const dotRadius = (z: number) => round(2 + 5 * ((z + 1) / 2));

// Nodos de serviço em coordenadas do quadrado da esfera (%), fora da esfera.
const SERVICE_NODES = [
  { x: -20, y: 50, align: 'right' },
  { x: 70, y: -4, align: 'left' },
  { x: 92, y: 76, align: 'left' },
  { x: 14, y: 100, align: 'right' },
] as const;

function SphereLayer({ layer }: { layer: 'back' | 'front' }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      className="absolute inset-0 size-full overflow-visible"
    >
      {layer === 'back' ? (
        <>
          <g className="stroke-blue-light" strokeOpacity={0.22}>
            {links.map(({ a, b }, i) => (
              <line
                key={i}
                x1={round(a.x)}
                y1={round(a.y)}
                x2={round(b.x)}
                y2={round(b.y)}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
          {/* conexões até os serviços */}
          <g className="stroke-blue-light" strokeOpacity={0.55}>
            {SERVICE_NODES.map((n, i) => (
              <line
                key={i}
                x1={SIZE / 2}
                y1={SIZE / 2}
                x2={(n.x / 100) * SIZE}
                y2={(n.y / 100) * SIZE}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </g>
          {back.map((p, i) => (
            <circle
              key={i}
              cx={round(p.x)}
              cy={round(p.y)}
              r={dotRadius(p.z)}
              className="fill-blue-light"
              fillOpacity={round(0.3 + 0.4 * ((p.z + 1) / 2), 2)}
            />
          ))}
        </>
      ) : (
        <>
          {front.map((p, i) => (
            <circle
              key={i}
              cx={round(p.x)}
              cy={round(p.y)}
              r={dotRadius(p.z)}
              className="fill-paper"
              fillOpacity={round(0.55 + 0.45 * p.z, 2)}
            />
          ))}
          {SERVICE_NODES.map((n, i) => (
            <g key={i}>
              <circle
                cx={(n.x / 100) * SIZE}
                cy={(n.y / 100) * SIZE}
                r={16}
                className="exp-pulse stroke-blue-light"
                fill="none"
                strokeOpacity={0.6}
                style={{ animationDelay: `${i * 0.6}s` }}
              />
              <circle
                cx={(n.x / 100) * SIZE}
                cy={(n.y / 100) * SIZE}
                r={6}
                className="fill-paper"
              />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}

// Módulos de The Structure: posição (% do bloco da manchete), tamanho e camada.
const CUBES = [
  { left: '22%', top: '33%', size: 'w-[8vw]', layer: 'front', enamel: false },
  { left: '43%', top: '30%', size: 'w-[6.5vw]', layer: 'back', enamel: true },
  { left: '7%', top: '66%', size: 'w-[4vw] hidden md:block', layer: 'front', enamel: false },
  { left: '62%', top: '-2%', size: 'w-[4.5vw]', layer: 'back', enamel: false },
] as const;

function Cubes({ layer }: { layer: 'back' | 'front' }) {
  return (
    <>
      {CUBES.filter((c) => c.layer === layer).map((c, i) => (
        <MetalCube
          key={i}
          enamel={c.enamel}
          className={cn('absolute min-w-10 drop-shadow-2xl', c.size)}
          style={{ left: c.left, top: c.top }}
        />
      ))}
    </>
  );
}

export function HeroC() {
  return (
    <Section
      theme="signal"
      spacing="none"
      aria-labelledby="hero-c-title"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      <MetalDefs />

      <Container className="relative z-30 flex min-h-20 items-center justify-between gap-6">
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

      <div className="relative flex flex-1 items-center">
        <Container className="relative">
          {/* camada posterior */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
            <div className="absolute top-1/2 right-[2%] aspect-square w-[58vw] -translate-y-1/2 md:w-[46vw] lg:right-[6%] lg:w-[36vw]">
              <SphereLayer layer="back" />
            </div>
            <Cubes layer="back" />
          </div>

          <h1
            id="hero-c-title"
            className="relative z-10 py-8 font-display text-[16vw] leading-[0.8] font-bold tracking-[-0.06em] [overflow-wrap:normal] whitespace-nowrap text-paper lg:py-4 lg:text-[15vw]"
          >
            <span className="block">Creativity</span>
            <span className="block text-right">meets</span>
            <span className="block">
              engineering<span className="text-blue-light">.</span>
            </span>
          </h1>

          {/* camada frontal: hemisfério anterior, módulos e serviços atravessam as letras */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute top-1/2 right-[2%] aspect-square w-[58vw] -translate-y-1/2 md:w-[46vw] lg:right-[6%] lg:w-[36vw]">
              <SphereLayer layer="front" />
              <div className="hidden lg:block">
                {site.services.map((service, i) => {
                  const n = SERVICE_NODES[i]!;
                  return (
                    <p
                      key={service.index}
                      className={cn(
                        'absolute flex w-max -translate-y-1/2 flex-col font-mono text-label uppercase',
                        n.align === 'right' ? '-translate-x-full pr-6 text-right' : 'pl-6',
                      )}
                      style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    >
                      <span className="text-blue-light">{service.index}</span>
                      <span className="text-paper">{service.name}</span>
                    </p>
                  );
                })}
              </div>
            </div>
            <Cubes layer="front" />
          </div>
        </Container>
      </div>

      {/* faixa Paper — virada de página */}
      <div data-theme="light" className="relative z-30">
        <Container className="grid-editorial items-center gap-y-6 py-8">
          <SectionLabel index="00" className="col-span-4 md:col-span-8 lg:col-span-3">
            {site.category}
          </SectionLabel>
          <Text size="lg" className="col-span-4 md:col-span-5 lg:col-span-5">
            {site.description}
          </Text>
          <div className="col-span-4 flex flex-wrap gap-3 md:col-span-3 md:justify-end lg:col-span-4">
            <Button arrow>{site.cta.primary.label}</Button>
            <Button variant="secondary">{site.cta.secondary.label}</Button>
          </div>
          <ul className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-5 md:col-span-8 md:grid-cols-4 lg:hidden">
            {site.services.map((service) => (
              <li key={service.index} className="flex flex-col font-mono text-label uppercase">
                <span className="text-navy">{service.index}</span>
                <span>{service.name}</span>
              </li>
            ))}
          </ul>
        </Container>
      </div>
    </Section>
  );
}
