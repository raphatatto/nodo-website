import type { Metadata } from 'next';
import { HeroA } from '@/experiments/hero-a/HeroA';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';

export const metadata: Metadata = { title: 'Hero A — Signal Line' };

export default function HeroAPage() {
  return (
    <>
      <HeroA />
      <ProposalNotes slug="hero-a" />
    </>
  );
}
