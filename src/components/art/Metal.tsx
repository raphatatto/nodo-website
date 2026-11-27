import type { CSSProperties } from 'react';

/**
 * Materiais metálicos em SVG (gradientes por token) e o módulo isométrico de
 * O02 The Structure. <MetalDefs /> deve ser renderizado uma vez por página.
 */

const stop = (color: string, offset: string, opacity = 1) => (
  <stop offset={offset} style={{ stopColor: `var(${color})`, stopOpacity: opacity }} />
);

export function MetalDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="metal-top" x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-white', '0%')}
          {stop('--nodo-silver', '55%')}
          {stop('--nodo-paper', '100%')}
        </linearGradient>
        <linearGradient id="metal-left" x1="0" y1="0" x2="0.4" y2="1">
          {stop('--nodo-silver', '0%')}
          {stop('--nodo-steel', '70%')}
          {stop('--nodo-graphite', '100%')}
        </linearGradient>
        <linearGradient id="metal-right" x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-steel', '0%')}
          {stop('--nodo-carbon', '60%')}
          {stop('--nodo-blue-deep', '100%')}
        </linearGradient>
        <linearGradient id="metal-navy" x1="0" y1="0" x2="1" y2="1">
          {stop('--nodo-blue-hover', '0%')}
          {stop('--nodo-navy', '50%')}
          {stop('--nodo-blue-deep', '100%')}
        </linearGradient>
      </defs>
    </svg>
  );
}

type CubeProps = {
  className?: string;
  style?: CSSProperties;
  /** Um único módulo em esmalte Navy (DS §07 — The Structure). */
  enamel?: boolean;
};

/** Módulo isométrico com faces metálicas e arestas de luz. */
export function MetalCube({ className, style, enamel = false }: CubeProps) {
  // Hexágono isométrico num viewBox 100×100.
  const top = '50,6 92,28 50,50 8,28';
  const left = '8,28 50,50 50,96 8,74';
  const right = '50,50 92,28 92,74 50,96';
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className} style={style}>
      <polygon points={left} fill={enamel ? 'url(#metal-navy)' : 'url(#metal-left)'} />
      <polygon points={right} fill="url(#metal-right)" />
      <polygon points={top} fill={enamel ? 'url(#metal-left)' : 'url(#metal-top)'} />
      <polyline
        points="8,28 50,50 92,28"
        fill="none"
        className="stroke-white"
        strokeOpacity={0.9}
        strokeWidth={1.2}
        strokeLinejoin="round"
      />
      <line x1="50" y1="50" x2="50" y2="96" className="stroke-white" strokeOpacity={0.35} />
    </svg>
  );
}
