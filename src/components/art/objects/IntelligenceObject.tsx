import { fibonacciSphere, project, rotate, round } from '@/lib/geometry';
import { cn } from '@/lib/cn';

/*
 * O03 The Intelligence — esfera de nodos (DS §07). Calculada no build:
 * hemisfério posterior ligado ao vizinho mais próximo (rede), anterior em pontos.
 * Cores semânticas: accent-detail = Navy no tema Light, Blue Light no Dark.
 */

const SIZE = 400;
const points = fibonacciSphere(220).map((v) =>
  project(rotate(v, 0.5, 0.9, 0.15), { size: SIZE, distance: 5, zoom: 1.75 }),
);
const back = points.filter((p) => p.z < 0);
const front = points.filter((p) => p.z >= 0);

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

const radius = (z: number) => round(1.2 + 2.6 * ((z + 1) / 2));

export function IntelligenceObject({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      fill="none"
      className={cn('block h-auto w-full overflow-visible', className)}
    >
      <circle cx={SIZE / 2} cy={SIZE / 2} r={168} className="stroke-line" strokeDasharray="2 6" />
      <g className="stroke-accent-detail" strokeOpacity={0.32}>
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
      {back.map((p, i) => (
        <circle
          key={`b${i}`}
          cx={round(p.x)}
          cy={round(p.y)}
          r={radius(p.z)}
          className="fill-accent-detail"
          fillOpacity={round(0.35 + 0.35 * ((p.z + 1) / 2), 2)}
        />
      ))}
      {front.map((p, i) => (
        <circle
          key={`f${i}`}
          cx={round(p.x)}
          cy={round(p.y)}
          r={radius(p.z)}
          className="fill-fg"
          fillOpacity={round(0.5 + 0.5 * p.z, 2)}
        />
      ))}
    </svg>
  );
}
