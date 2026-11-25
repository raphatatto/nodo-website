'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import type { Proposal } from '@/experiments/shared/proposals';

const VIEWPORTS = {
  desktop: { label: 'Desktop · 1440', width: 1440, height: 900 },
  mobile: { label: 'Mobile · 390', width: 390, height: 844 },
} as const;

type Viewport = keyof typeof VIEWPORTS;

/** Iframe escalado para caber na largura do cartão. */
function ScaledFrame({ src, title, viewport }: { src: string; title: string; viewport: Viewport }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const { width, height } = VIEWPORTS[viewport];

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={box}
      className="relative w-full overflow-hidden border border-line bg-carbon"
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        tabIndex={-1}
        className="pointer-events-none absolute top-0 left-0 origin-top-left border-0"
        style={{ width, height, transform: `scale(${scale})` }}
      />
    </div>
  );
}

export function PreviewGrid({
  proposals,
  hash = '',
  label = 'Viewport da pré-visualização',
}: {
  proposals: Proposal[];
  /** Âncora aberta no iframe (ex.: "#work" mostra a seção em vez do Hero). */
  hash?: string;
  label?: string;
}) {
  const [viewport, setViewport] = useState<Viewport>('desktop');

  return (
    <div className="flex flex-col gap-8">
      <div role="group" aria-label={label} className="flex gap-2">
        {(Object.keys(VIEWPORTS) as Viewport[]).map((key) => (
          <button
            key={key}
            type="button"
            aria-pressed={viewport === key}
            onClick={() => setViewport(key)}
            className={cn(
              'min-h-control rounded-pill border px-5 font-mono text-label uppercase transition-colors duration-fast',
              viewport === key
                ? 'border-fg bg-fg text-bg'
                : 'border-line text-muted hover:border-control hover:text-fg',
            )}
          >
            {VIEWPORTS[key].label}
          </button>
        ))}
      </div>

      <ul
        className={cn(
          'grid gap-grid',
          viewport === 'desktop' ? 'lg:grid-cols-3' : 'grid-cols-1 sm:grid-cols-3',
        )}
      >
        {proposals.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/playground/${p.slug}`}
              className="group flex flex-col gap-4"
              aria-label={`Abrir proposta ${p.code} — ${p.name}`}
            >
              <div className={cn(viewport === 'mobile' && 'mx-auto w-full max-w-72')}>
                <ScaledFrame
                  src={`/playground/${p.slug}${hash}`}
                  title={`Pré-visualização da proposta ${p.code}`}
                  viewport={viewport}
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-mono text-label text-muted uppercase">
                  {p.code} · {p.direction} · {p.theme}
                </p>
                <p className="font-display text-h3 font-bold group-hover:text-accent-detail">
                  {p.name} <span aria-hidden="true">↗</span>
                </p>
                <p className="max-w-prose text-small text-muted">{p.summary}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
