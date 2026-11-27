import { round } from '@/lib/geometry';

/*
 * O04 The Flow — órbitas finas ao redor do objeto do Hero (SVG calculado no servidor).
 * Composição herdada do Hero B aprovado: viewBox 1440×900, centro do objeto ≈ 64% / 46%.
 * Valores artísticos pontuais (raios, rotações, opacidades), sem token correspondente.
 */

export const HERO_VIEW = { w: 1440, h: 900 } as const;
export const HERO_CENTER = { x: 930, y: 420 } as const;

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
    x: round(HERO_CENTER.x + x * Math.cos(r) - y * Math.sin(r)),
    y: round(HERO_CENTER.y + x * Math.sin(r) + y * Math.cos(r)),
  };
}

const NODES = [
  pointOnOrbit(ORBITS[0], 230),
  pointOnOrbit(ORBITS[1], -60),
  pointOnOrbit(ORBITS[2], 20),
];

export function FlowOrbits() {
  const { x: cx, y: cy } = HERO_CENTER;
  return (
    <svg
      aria-hidden="true"
      data-parallax="-0.08"
      viewBox={`0 0 ${HERO_VIEW.w} ${HERO_VIEW.h}`}
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full"
      fill="none"
    >
      <g className="nodo-orbit-spin">
        {ORBITS.map((o, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={o.rx}
            ry={o.ry}
            transform={`rotate(${o.rot} ${cx} ${cy})`}
            className="stroke-silver"
            strokeOpacity={o.opacity}
            strokeDasharray={o.dash}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
      {/* mira técnica no centro do objeto */}
      <g className="stroke-silver" strokeOpacity={0.35}>
        <line x1={cx - 14} y1={cy} x2={cx + 14} y2={cy} />
        <line x1={cx} y1={cy - 14} x2={cx} y2={cy + 14} />
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
