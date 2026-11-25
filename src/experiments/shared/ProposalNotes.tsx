import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading } from '@/components/ui/Heading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import type { ReactNode } from 'react';
import { getProposal, type ProposalSlug } from './proposals';

/** Ficha editorial da proposta — leitura de decisão, abaixo do Hero. */
export function ProposalNotes({ slug, aside }: { slug: ProposalSlug; aside?: ReactNode }) {
  const proposal = getProposal(slug);

  return (
    <Section
      id="ficha"
      theme="light"
      aria-labelledby="ficha-title"
      className="border-t border-line"
    >
      <Container className="grid-editorial gap-y-12 pb-16">
        <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
          <SectionLabel index={proposal.code}>Ficha da proposta</SectionLabel>
          <Heading id="ficha-title" as="h2" size="h2">
            {proposal.name}
          </Heading>
          <Text muted>{proposal.summary}</Text>
          <div className="flex flex-wrap gap-2">
            <Tag>{proposal.direction}</Tag>
            <Tag>{proposal.theme}</Tag>
            {proposal.objects.map((o) => (
              <Tag key={o}>{o}</Tag>
            ))}
          </div>
          {aside}
        </div>

        <dl className="col-span-full divide-y divide-line border-y border-line lg:col-span-7 lg:col-start-6">
          {proposal.notes.map((note) => (
            <div key={note.label} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-8">
              <dt className="font-mono text-label text-muted uppercase">{note.label}</dt>
              <dd className="text-small">{note.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
