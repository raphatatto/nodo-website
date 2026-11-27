import { round } from '@/lib/geometry';
import { cn } from '@/lib/cn';

/*
 * O02 The Structure — módulos geométricos encaixáveis (DS §07: engenharia e sistemas,
 * "montagem e alinhamento"). Seis módulos de alumínio em projeção isométrica e um
 * módulo em esmalte Navy suspenso sobre o encaixe vazio, com guias de alinhamento.
 * Gradientes próprios (prefixo por instância) — sem depender de <MetalDefs /> global.
 */

type Cube = { x: number; y: number; z: number; enamel?: boolean };

const S = 52;
const COS = Math.cos(Math.PI / 6);
const iso = (x: number, y: number, z: number) => ({
  x: round((x - y) * S * COS),
  y: round((x + y) * S * 0.5 - z * S),
});
const pts = (list: { x: number; y: number }[]) => list.map((p) => `${p.x},${p.y}`).join(' ');

const SLOT = { x: 2, y: 1, z: 0 };
const CUBES: Cube[] = [
  { x: 0, y: 2, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 0, y: 0, z: 1 },
  { ...SLOT, z: 1.55, enamel: true },
];
// pintor: de trás para frente
const ORDER = [...CUBES].sort((a, b) => a.x + a.y + a.z - (b.x + b.y + b.z) || a.z - b.z);

function faces({ x, y, z }: Cube) {
  return {
    top: [iso(x, y, z + 1), iso(x + 1, y, z + 1), iso(x + 1, y + 1, z + 1), iso(x, y + 1, z + 1)],
    right: [iso(x + 1, y, z), iso(x + 1, y + 1, z), iso(x + 1, y + 1, z + 1), iso(x + 1, y, z + 1)],
    left: [iso(x, y + 1, z), iso(x + 1, y + 1, z), iso(x + 1, y + 1, z + 1), iso(x, y + 1, z + 1)],
  };
}

// enquadramento: caixa de todos os vértices + margem
const all = CUBES.flatMap((c) => Object.values(faces(c)).flat());
const minX = Math.min(...all.map((p) => p.x)) - 24;
const maxX = Math.max(...all.map((p) => p.x)) + 24;
const minY = Math.min(...all.map((p) => p.y)) - 24;
const maxY = Math.max(...all.map((p) => p.y)) + 24;

const stop = (color: string, offset: string) => (
  <stop offset={offset} style={{ stopColor: `var(${color})` }} />
);

export function StructureObject({
  id = 'structure',
  className,
}: {
  id?: string;
  className?: string;
}) {
  const g = (name: string) => `url(#${id}-${name})`;
  const floating = CUBES.find((c) => c.enamel)!;
  const floor = faces({ ...SLOT, z: -1 }).top; // pegada do encaixe vazio (plano z = 0)

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      aria-hidden="true"
      className={cn('block h-auto w-full overflow-visible', className)}
    >
      <defs>
        <linearGradient id={`${id}-top`} x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-white', '0%')}
          {stop('--nodo-silver', '55%')}
          {stop('--nodo-paper', '100%')}
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="0" y1="0" x2="0.4" y2="1">
          {stop('--nodo-silver', '0%')}
          {stop('--nodo-steel', '70%')}
          {stop('--nodo-graphite', '100%')}
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-steel', '0%')}
          {stop('--nodo-carbon', '60%')}
          {stop('--nodo-blue-deep', '100%')}
        </linearGradient>
        <linearGradient id={`${id}-navy`} x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-blue-hover', '0%')}
          {stop('--nodo-navy', '50%')}
          {stop('--nodo-blue-deep', '100%')}
        </linearGradient>
      </defs>

      {/* encaixe vazio + guias de alinhamento até o módulo suspenso */}
      <polygon
        points={pts(floor)}
        fill="none"
        className="stroke-fg"
        strokeOpacity={0.5}
        strokeDasharray="3 5"
        vectorEffect="non-scaling-stroke"
      />
      <g className="stroke-fg" strokeOpacity={0.35} strokeDasharray="2 5">
        {[0, 1, 3].map((i) => (
          <line
            key={i}
            x1={floor[i]!.x}
            y1={floor[i]!.y}
            x2={iso(floating.x + (i === 1 ? 1 : 0), floating.y + (i === 3 ? 1 : 0), floating.z).x}
            y2={iso(floating.x + (i === 1 ? 1 : 0), floating.y + (i === 3 ? 1 : 0), floating.z).y}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {ORDER.map((c, i) => {
        const f = faces(c);
        return (
          <g key={i}>
            <polygon points={pts(f.left)} fill={c.enamel ? g('navy') : g('left')} />
            <polygon points={pts(f.right)} fill={g('right')} />
            <polygon points={pts(f.top)} fill={c.enamel ? g('left') : g('top')} />
            <polyline
              points={pts([f.top[3]!, f.top[2]!, f.top[1]!])}
              fill="none"
              className="stroke-white"
              strokeOpacity={0.85}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={f.top[2]!.x}
              y1={f.top[2]!.y}
              x2={f.left[1]!.x}
              y2={f.left[1]!.y}
              className="stroke-white"
              strokeOpacity={0.3}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </svg>
  );
}
