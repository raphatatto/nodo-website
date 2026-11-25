import type { Metadata } from 'next';
import { HeroB } from '@/experiments/hero-b/HeroB';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';
import { WorkA } from '@/experiments/work-a/WorkA';

export const metadata: Metadata = { title: 'Selected Work A — Editorial Gallery' };

/** Hero B (aprovado) + proposta de Selected Work, para avaliar a transição Carbon → Paper. */
export default function WorkAPage() {
  return (
    <>
      <HeroB />
      <WorkA />
      <ProposalNotes slug="work-a" />
    </>
  );
}
