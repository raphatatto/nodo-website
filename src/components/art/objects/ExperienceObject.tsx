import { round } from '@/lib/geometry';
import { cn } from '@/lib/cn';

/*
 * O05 The Experience — planos translúcidos em camadas (DS §07: design e interfaces,
 * "separação e encaixe"). Quatro planos em projeção isométrica, ligados por guias
 * tracejadas; o plano superior traz uma grade de interface abstrata.
 */

const COS = Math.cos(Math.PI / 6);
const SIN = 0.5;
const iso = (x: number, y: number, z: number) => ({
  x: round(200 + (x - y) * COS),
  y: round(205 + (x + y) * SIN - z),
});
const pts = (list: { x: number; y: number }[]) => list.map((p) => `${p.x},${p.y}`).join(' ');

const W = 108; // meia largura do plano
const D = 76; // meia profundidade
const LAYERS = [-84, -28, 28, 84];

function corners(z: number) {
  return [iso(-W, -D, z), iso(W, -D, z), iso(W, D, z), iso(-W, D, z)];
}

// Grade de interface no plano superior: barra superior, coluna lateral e blocos.
function uiLines(z: number) {
  const seg = (x1: number, y1: number, x2: number, y2: number) =>
    [iso(x1, y1, z), iso(x2, y2, z)] as const;
  return [
    seg(-W + 14, -D + 22, W - 14, -D + 22),
    seg(-W + 50, -D + 22, -W + 50, D - 14),
    seg(-W + 64, -D + 40, W - 18, -D + 40),
    seg(-W + 64, -D + 54, W - 50, -D + 54),
    seg(-W + 64, 6, W - 18, 6),
    seg(-W + 64, 6, -W + 64, D - 14),
    seg(W - 18, 6, W - 18, D - 14),
    seg(-W + 64, D - 14, W - 18, D - 14),
  ];
}

export function ExperienceObject({ className }: { className?: string }) {
  const top = LAYERS[LAYERS.length - 1]!;
  const bottom = LAYERS[0]!;
  const guides = corners(bottom).map((c, i) => [c, corners(top)[i]!] as const);

  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      fill="none"
      className={cn('block h-auto w-full overflow-visible', className)}
    >
      {/* guias de encaixe entre as camadas */}
      <g className="stroke-line" strokeDasharray="2 6">
        {guides.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {LAYERS.map((z, i) => {
        const isTop = z === top;
        const tinted = i === 1;
        return (
          <polygon
            key={z}
            points={pts(corners(z))}
            className={cn(tinted ? 'fill-accent-detail' : 'fill-fg', 'stroke-fg')}
            fillOpacity={tinted ? 0.22 : 0.04 + i * 0.015}
            strokeOpacity={isTop ? 0.9 : 0.35 + i * 0.1}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
      <g className="stroke-fg" strokeOpacity={0.45}>
        {uiLines(top).map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
      {/* ponto de conexão no canto do plano superior */}
      <circle
        cx={iso(W, -D, top).x}
        cy={iso(W, -D, top).y}
        r={4.5}
        className="fill-accent-detail"
      />
    </svg>
  );
}
