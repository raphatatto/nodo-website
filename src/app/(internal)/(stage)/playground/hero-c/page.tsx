import type { Metadata } from 'next';
import { HeroC } from '@/experiments/hero-c/HeroC';
import { ProposalNotes } from '@/experiments/shared/ProposalNotes';

export const metadata: Metadata = { title: 'Hero C — Connected Index' };

export default function HeroCPage() {
  return (
    <>
      <HeroC />
      <ProposalNotes slug="hero-c" />
    </>
  );
}
