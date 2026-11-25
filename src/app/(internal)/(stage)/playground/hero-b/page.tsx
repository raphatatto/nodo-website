import type { Metadata } from 'next';
import { HeroB } from '@/experiments/hero-b/HeroB';
import { KnotFigure } from '@/experiments/shared/KnotFigure';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';

export const metadata: Metadata = { title: 'Hero B — The Knot' };

export default function HeroBPage() {
  return (
    <>
      <HeroB />
      <ProposalNotes
        slug="hero-b"
        aside={
          <figure data-theme="dark" className="mt-4 flex flex-col gap-3 p-6">
            <KnotFigure
              mode="chrome"
              rotation={[0.7, 0.2, 0.4]}
              className="mx-auto w-full max-w-sm"
            />
            <figcaption className="font-mono text-label text-muted uppercase">
              Fallback procedural — pseudo-render SVG (usado se o render for removido)
            </figcaption>
          </figure>
        }
      />
    </>
  );
}
