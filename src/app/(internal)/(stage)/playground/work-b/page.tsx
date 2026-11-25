import type { Metadata } from 'next';
import { HeroB } from '@/experiments/hero-b/HeroB';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';
import { WorkB } from '@/experiments/work-b/WorkB';

export const metadata: Metadata = { title: 'Selected Work B — Full Width Showcase' };

/** Hero B (aprovado) + proposta de Selected Work, para avaliar a transição Carbon → Paper. */
export default function WorkBPage() {
  return (
    <>
      <HeroB />
      <WorkB />
      <ProposalNotes slug="work-b" />
    </>
  );
}
