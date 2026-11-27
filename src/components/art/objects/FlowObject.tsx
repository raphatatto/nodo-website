import { round } from '@/lib/geometry';
import { cn } from '@/lib/cn';

/*
 * O04 The Flow — anéis e trajetórias contínuas (DS §07: automação, fluxos sincronizados).
 * Três anéis inclinados ao redor de um centro + uma trajetória em oito que passa por
 * todos eles; nodos marcam as "etapas" do fluxo. Valores artísticos pontuais.
 */

const C = { x: 200, y: 200 };
const RINGS = [
  { rx: 172, ry: 54, rot: -18, dash: undefined, opacity: 0.55 },
  { rx: 150, ry: 92, rot: 34, dash: '2 6', opacity: 0.5 },
  { rx: 118, ry: 36, rot: 78, dash: undefined, opacity: 0.4 },
] as const;

function onRing(r: (typeof RINGS)[number], deg: number) {
  const a = (deg * Math.PI) / 180;
  const t = (r.rot * Math.PI) / 180;
  const x = r.rx * Math.cos(a);
  const y = r.ry * Math.sin(a);
  return {
    x: round(C.x + x * Math.cos(t) - y * Math.sin(t)),
    y: round(C.y + x * Math.sin(t) + y * Math.cos(t)),
  };
}

// Trajetória em oito (lemniscata de Gerono), levemente girada.
const PATH = (() => {
  const pts: string[] = [];
  const rot = (-12 * Math.PI) / 180;
  for (let i = 0; i <= 120; i++) {
    const t = (i / 120) * Math.PI * 2;
    const x = 158 * Math.cos(t);
    const y = 74 * Math.sin(t) * Math.cos(t) * 2;
    pts.push(
      `${round(C.x + x * Math.cos(rot) - y * Math.sin(rot))} ${round(C.y + x * Math.sin(rot) + y * Math.cos(rot))}`,
    );
  }
  return `M${pts.join('L')}Z`;
})();

const NODES = [onRing(RINGS[0], 200), onRing(RINGS[1], -40), onRing(RINGS[2], 120)];
const ACCENT = onRing(RINGS[0], 20);

export function FlowObject({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden="true"
      fill="none"
      className={cn('block h-auto w-full overflow-visible', className)}
    >
      <path
        d={PATH}
        className="stroke-accent-detail"
        strokeOpacity={0.6}
        pathLength={1}
        data-draw
        vectorEffect="non-scaling-stroke"
      />
      {RINGS.map((r, i) => (
        <ellipse
          key={i}
          cx={C.x}
          cy={C.y}
          rx={r.rx}
          ry={r.ry}
          transform={`rotate(${r.rot} ${C.x} ${C.y})`}
          className="stroke-fg"
          strokeOpacity={r.opacity}
          strokeDasharray={r.dash}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <g className="stroke-fg" strokeOpacity={0.45}>
        <line x1={C.x - 10} y1={C.y} x2={C.x + 10} y2={C.y} vectorEffect="non-scaling-stroke" />
        <line x1={C.x} y1={C.y - 10} x2={C.x} y2={C.y + 10} vectorEffect="non-scaling-stroke" />
      </g>
      {NODES.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={4} className="fill-fg" />
      ))}
      <circle
        cx={ACCENT.x}
        cy={ACCENT.y}
        r={13}
        className="stroke-accent-detail"
        vectorEffect="non-scaling-stroke"
      />
      <circle cx={ACCENT.x} cy={ACCENT.y} r={5} className="fill-accent-detail" />
    </svg>
  );
}
