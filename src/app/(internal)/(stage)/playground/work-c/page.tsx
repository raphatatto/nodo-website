import type { Metadata } from 'next';
import { HeroB } from '@/experiments/hero-b/HeroB';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';
import { WorkC } from '@/experiments/work-c/WorkC';

export const metadata: Metadata = { title: 'Selected Work C — Creative Index' };

/** Hero B (aprovado) + proposta de Selected Work, para avaliar a transição Carbon → Paper. */
export default function WorkCPage() {
  return (
    <>
      <HeroB />
      <WorkC />
      <ProposalNotes slug="work-c" />
    </>
  );
}
