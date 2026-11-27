/**
 * Geometria procedural para os objetos NODO (DS §07), sem dependências.
 * Todo cálculo roda no servidor/build: o resultado é SVG estático.
 */

export type Vec3 = readonly [number, number, number];

export type Projected = { x: number; y: number; z: number; scale: number };

export type Segment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  /** Profundidade média (maior = mais próximo da câmera). */
  depth: number;
  /** Escala de perspectiva média (para espessura). */
  scale: number;
};

/** PRNG determinístico (mulberry32) — mesma saída em todo build. */
export function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Nó toroidal (p, q) — O01 The Knot. */
export function torusKnot(p: number, q: number, samples: number, tube = 0.45): Vec3[] {
  const points: Vec3[] = [];
  for (let i = 0; i < samples; i++) {
    const t = (i / samples) * Math.PI * 2;
    const r = 1 + tube * Math.cos(q * t);
    points.push([r * Math.cos(p * t), r * Math.sin(p * t), tube * Math.sin(q * t)]);
  }
  return points;
}

/** Pontos distribuídos numa esfera (espiral de Fibonacci) — O03 The Intelligence. */
export function fibonacciSphere(count: number): Vec3[] {
  const points: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }
  return points;
}

export function rotate([x, y, z]: Vec3, rx: number, ry: number, rz: number): Vec3 {
  // X
  let y1 = y * Math.cos(rx) - z * Math.sin(rx);
  let z1 = y * Math.sin(rx) + z * Math.cos(rx);
  // Y
  const x2 = x * Math.cos(ry) + z1 * Math.sin(ry);
  z1 = -x * Math.sin(ry) + z1 * Math.cos(ry);
  // Z
  const x3 = x2 * Math.cos(rz) - y1 * Math.sin(rz);
  y1 = x2 * Math.sin(rz) + y1 * Math.cos(rz);
  return [x3, y1, z1];
}

/** Projeção em perspectiva simples sobre um viewBox. */
export function project(
  [x, y, z]: Vec3,
  { size, distance = 4, zoom = 1 }: { size: number; distance?: number; zoom?: number },
): Projected {
  const scale = distance / (distance - z);
  const half = size / 2;
  return {
    x: half + x * scale * half * 0.42 * zoom,
    y: half + y * scale * half * 0.42 * zoom,
    z,
    scale,
  };
}

/** Converte uma curva fechada projetada em segmentos ordenados do fundo para a frente. */
export function depthSortedSegments(points: Projected[]): Segment[] {
  const segments: Segment[] = points.map((a, i) => {
    const b = points[(i + 1) % points.length]!;
    return {
      x1: a.x,
      y1: a.y,
      x2: b.x,
      y2: b.y,
      depth: (a.z + b.z) / 2,
      scale: (a.scale + b.scale) / 2,
    };
  });
  return segments.sort((a, b) => a.depth - b.depth);
}

/** Path SVG de uma curva fechada (polilinha suave o bastante com amostragem alta). */
export function closedPath(points: Projected[]): string {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${round(p.x)} ${round(p.y)}`).join('') + 'Z';
}

export function round(n: number, digits = 1) {
  const f = 10 ** digits;
  return Math.round(n * f) / f;
}
