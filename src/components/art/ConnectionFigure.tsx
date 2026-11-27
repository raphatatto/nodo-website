import { cn } from '@/lib/cn';

/*
 * FIG. 002 — Conexão. Dois nodos (criatividade, engenharia) ligados por uma curva;
 * no meio dela, o ponto da marca (`nodo.`) — Navy no tema Light, Blue Light no Dark/Signal.
 * Linhas de construção tracejadas fazem o papel do "Technical Grid" do DS §07.
 *
 * Coordenadas num viewBox 400×260. O ponto médio é o da cúbica em t=0,5:
 * 0,125·P0 + 0,375·P1 + 0,375·P2 + 0,125·P3 = (200, 130).
 * `data-draw` + pathLength=1: a Etapa 5 (M09) desenha a curva com stroke-dashoffset;
 * sem JS, a linha já aparece completa.
 */

const A = { x: 40, y: 200 };
const B = { x: 360, y: 60 };
const MID = { x: 200, y: 130 };
const CURVE = `M${A.x} ${A.y} C 160 ${A.y}, 240 ${B.y}, ${B.x} ${B.y}`;

function Node({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} className="stroke-line" vectorEffect="non-scaling-stroke" />
      <circle cx={x} cy={y} r={4.5} className="fill-fg" />
    </g>
  );
}

export function ConnectionFigure({
  labels = ['Creativity', 'Engineering'],
  caption = 'FIG. 002 — Conexão',
  className,
}: {
  labels?: readonly [string, string];
  caption?: string;
  className?: string;
}) {
  return (
    <figure aria-hidden="true" className={cn('flex flex-col gap-4', className)}>
      <div className="relative">
        <svg viewBox="0 0 400 260" fill="none" className="block h-auto w-full overflow-visible">
          {/* construção */}
          <g className="stroke-line" strokeDasharray="2 6" vectorEffect="non-scaling-stroke">
            <line x1={A.x} y1={A.y} x2={B.x} y2={A.y} vectorEffect="non-scaling-stroke" />
            <line x1={B.x} y1={B.y} x2={B.x} y2={A.y} vectorEffect="non-scaling-stroke" />
            <line x1={MID.x} y1={MID.y} x2={MID.x} y2={A.y} vectorEffect="non-scaling-stroke" />
          </g>
          <path
            d={CURVE}
            pathLength={1}
            data-draw
            className="stroke-fg"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <Node {...A} />
          <Node {...B} />
          {/* o ponto da marca */}
          <circle cx={MID.x} cy={MID.y} r={8} className="fill-accent-detail" />
        </svg>
        {/* rótulos em HTML: nítidos em qualquer escala */}
        <span className="absolute top-[86%] left-0 font-mono text-label text-muted uppercase">
          {labels[0]}
        </span>
        <span className="absolute top-[3%] right-[10%] -translate-y-full font-mono text-label text-muted uppercase">
          {labels[1]}
        </span>
      </div>
      <figcaption className="font-mono text-label text-muted uppercase">{caption}</figcaption>
    </figure>
  );
}
