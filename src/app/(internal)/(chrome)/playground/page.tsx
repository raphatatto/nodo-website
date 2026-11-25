import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading } from '@/components/ui/Heading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import { proposals, workProposals } from '@/experiments/shared/proposals';
import { PreviewGrid } from './PreviewGrid';

export const metadata: Metadata = { title: 'Playground' };

/** Próximos experimentos (ainda não implementados). */
const planned = [
  { id: 'M-01', title: 'Text Reveal e Media Reveal', stage: 'Etapa 5', kind: 'Motion' },
  { id: 'M-04', title: 'Transição de página Carbon/Paper/Navy', stage: 'Etapa 5', kind: 'Motion' },
  { id: 'O-01', title: 'The Knot — objeto 3D original', stage: 'Etapa 6', kind: '3D / WebGL' },
  { id: 'O-03', title: 'The Intelligence — partículas', stage: 'Etapa 6', kind: '3D / WebGL' },
];

export default function PlaygroundPage() {
  return (
    <>
      <Section theme="light" aria-labelledby="pg-title">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            <SectionLabel index="LAB">Etapa 3 — Selected Work · interno</SectionLabel>
            <Heading id="pg-title" as="h1" size="h1">
              Três composições para os projetos
            </Heading>
            <Text size="lg" muted>
              Cada proposta abre com o Hero B aprovado, seguido da seção Selected Work. As prévias
              já começam na seção; clique para ver a transição Carbon → Paper em tela cheia. Os
              quatro projetos são conceituais.
            </Text>
          </div>
          <PreviewGrid
            proposals={workProposals}
            hash="#work"
            label="Viewport da pré-visualização — Selected Work"
          />
        </Container>
      </Section>

      <Section theme="dark" aria-labelledby="pg-hero">
        <Container className="flex flex-col gap-14">
          <div className="flex flex-col gap-6">
            <SectionLabel index="02">Etapa 2 — Art Direction · B aprovada</SectionLabel>
            <Heading id="pg-hero" as="h2" size="h2">
              Três direções para o Hero
            </Heading>
            <Text size="lg" muted>
              Referência das propostas de Hero. A direção B (The Knot) foi escolhida.
            </Text>
          </div>
          <PreviewGrid proposals={proposals} label="Viewport da pré-visualização — Hero" />
        </Container>
      </Section>

      <Section theme="light" aria-labelledby="pg-next">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <SectionLabel index="+">Planejado</SectionLabel>
            <Heading id="pg-next" size="h3">
              Próximos experimentos
            </Heading>
          </div>
          <ul className="flex flex-col divide-y divide-line border-y border-line">
            {planned.map((item) => (
              <li key={item.id} className="grid-editorial items-center gap-y-3 py-5">
                <span className="col-span-1 font-mono text-label text-muted uppercase">
                  {item.id}
                </span>
                <span className="col-span-3 text-body-lg md:col-span-4 lg:col-span-6">
                  {item.title}
                </span>
                <span className="col-span-4 flex flex-wrap gap-2 md:col-span-3 md:justify-end lg:col-span-5">
                  <Tag>{item.kind}</Tag>
                  <Tag>{item.stage}</Tag>
                </span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
