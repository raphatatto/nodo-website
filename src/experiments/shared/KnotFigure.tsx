import { cn } from '@/lib/cn';
import { depthSortedSegments, project, rotate, round, torusKnot, type Projected } from './geometry';

type KnotFigureProps = {
  /**
   * `line`   — estudo editorial em traço 1px, com cruzamentos por cima/por baixo.
   * `chrome` — "pseudo-render": tubo metálico em camadas (borda, corpo, especular, rim Navy).
   */
  mode?: 'line' | 'chrome';
  p?: number;
  q?: number;
  /** Rotação em radianos [x, y, z] — enquadramento artístico. */
  rotation?: readonly [number, number, number];
  samples?: number;
  /** Cor do halo no modo `line` — deve igualar o fundo onde a figura está. */
  haloClassName?: string;
  className?: string;
};

const SIZE = 1000;
// Direção da luz de estúdio (canto superior esquerdo), normalizada.
const LIGHT = { x: -0.55, y: -0.835 };

/** O01 — The Knot. SVG estático calculado no servidor. */
export function KnotFigure({
  mode = 'line',
  p = 3,
  q = 4,
  rotation = [0.5, 0.3, 0.2],
  samples = mode === 'chrome' ? 520 : 480,
  haloClassName = 'stroke-bg',
  className,
}: KnotFigureProps) {
  const points = torusKnot(p, q, samples).map((v) =>
    project(rotate(v, ...rotation), { size: SIZE, distance: 4.2, zoom: 1.05 }),
  );
  const segments = depthSortedSegments(points);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      aria-hidden="true"
      focusable="false"
      className={cn('block', className)}
      fill="none"
      strokeLinecap="round"
    >
      {mode === 'line' ? (
        <LineKnot segments={segments} haloClassName={haloClassName} />
      ) : (
        <ChromeKnot points={points} />
      )}
    </svg>
  );
}

function LineKnot({
  segments,
  haloClassName,
}: {
  segments: ReturnType<typeof depthSortedSegments>;
  haloClassName: string;
}) {
  return (
    <g>
      {segments.map((raw, i) => {
        const s = {
          x1: round(raw.x1),
          y1: round(raw.y1),
          x2: round(raw.x2),
          y2: round(raw.y2),
        };
        return (
          <g key={i}>
            {/* halo na cor do fundo cria o efeito de passar por cima */}
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              className={haloClassName}
              strokeWidth={7}
              strokeLinecap="butt"
              vectorEffect="non-scaling-stroke"
            />
            <line
              x1={s.x1}
              y1={s.y1}
              x2={s.x2}
              y2={s.y2}
              className="stroke-fg"
              strokeWidth={1.25}
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}
    </g>
  );
}

/**
 * Pseudo-render: a curva é dividida em trechos contínuos (polylines), ordenados
 * do fundo para a frente. Cada trecho recebe camadas de tubo metálico com
 * deslocamento pela normal voltada para a luz — sem "nervuras" entre segmentos.
 */
const CHUNK = 14;

function ChromeKnot({ points }: { points: Projected[] }) {
  const n = points.length;
  const at = (i: number) => points[((i % n) + n) % n]!;

  const chunks = [];
  for (let start = 0; start < n; start += CHUNK) {
    // sobreposição de 2 pontos de cada lado esconde as emendas
    const idx = Array.from({ length: CHUNK + 4 }, (_, k) => start - 2 + k);
    const pts = idx.map(at);
    const depth = pts.reduce((sum, p) => sum + p.z, 0) / pts.length;
    const scale = pts.reduce((sum, p) => sum + p.scale, 0) / pts.length;
    const first = pts[0]!;
    const last = pts[pts.length - 1]!;
    const tl = Math.hypot(last.x - first.x, last.y - first.y) || 1;
    const facing =
      1 - Math.abs(((last.x - first.x) / tl) * LIGHT.x + ((last.y - first.y) / tl) * LIGHT.y);
    const normals = idx.map((i) => {
      const a = at(i - 1);
      const b = at(i + 1);
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      let nx = -(b.y - a.y) / len;
      let ny = (b.x - a.x) / len;
      if (nx * LIGHT.x + ny * LIGHT.y < 0) {
        nx = -nx;
        ny = -ny;
      }
      return { nx, ny };
    });
    chunks.push({ pts, normals, depth, scale, facing });
  }
  chunks.sort((a, b) => a.depth - b.depth);

  return (
    <g strokeLinejoin="round" strokeLinecap="butt">
      {chunks.map((c, i) => {
        const width = 30 * c.scale;
        const near = Math.min(1, Math.max(0, c.depth + 0.5));
        const spec = 0.3 + 0.7 * c.facing * c.facing;
        const line = (k: number) =>
          c.pts
            .map((p, j) => {
              const { nx, ny } = c.normals[j]!;
              return `${round(p.x + nx * width * k)},${round(p.y + ny * width * k)}`;
            })
            .join(' ');
        return (
          <g key={i}>
            <polyline points={line(0)} className="stroke-carbon" strokeWidth={round(width * 1.1)} />
            <polyline points={line(0)} className="stroke-steel" strokeWidth={round(width * 0.92)} />
            <polyline
              points={line(0.08)}
              className="stroke-silver"
              strokeWidth={round(width * 0.6)}
              strokeOpacity={round(0.35 + 0.55 * near, 2)}
            />
            <polyline
              points={line(-0.3)}
              className="stroke-navy"
              strokeWidth={round(width * 0.18)}
              strokeOpacity={round(0.6 + 0.35 * near, 2)}
            />
            <polyline
              points={line(0.24)}
              className="stroke-white"
              strokeWidth={round(width * 0.13)}
              strokeOpacity={round(spec * (0.45 + 0.55 * near), 2)}
            />
          </g>
        );
      })}
    </g>
  );
}
