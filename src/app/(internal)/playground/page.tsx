import type { Metadata } from 'next';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Heading } from '@/components/ui/Heading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';

export const metadata: Metadata = { title: 'Playground' };

/**
 * Índice do laboratório interno. Cada experimento ganha uma rota em
 * src/app/(internal)/playground/<slug>/ e código em src/experiments/<slug>/.
 * Itens abaixo são planejados — nenhum está implementado nesta etapa.
 */
const planned = [
  { id: 'H-A', title: 'Hero — Proposta A', stage: 'Etapa 2', kind: 'Art Direction' },
  { id: 'H-B', title: 'Hero — Proposta B', stage: 'Etapa 2', kind: 'Art Direction' },
  { id: 'H-C', title: 'Hero — Proposta C', stage: 'Etapa 2', kind: 'Art Direction' },
  { id: 'M-01', title: 'Text Reveal e Media Reveal', stage: 'Etapa 5', kind: 'Motion' },
  { id: 'M-04', title: 'Transição de página Carbon/Paper/Navy', stage: 'Etapa 5', kind: 'Motion' },
  { id: 'O-01', title: 'The Knot — objeto 3D', stage: 'Etapa 6', kind: '3D / WebGL' },
  { id: 'O-03', title: 'The Intelligence — rede de nodos', stage: 'Etapa 6', kind: '3D / WebGL' },
];

export default function PlaygroundPage() {
  return (
    <Section theme="dark" aria-labelledby="pg-title" className="min-h-[80svh]">
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-6">
          <SectionLabel index="LAB">Interno · não indexado</SectionLabel>
          <Heading id="pg-title" as="h1" size="h1">
            Playground
          </Heading>
          <Text size="lg" muted>
            Área isolada para protótipos de Hero, objetos 3D, efeitos WebGL e transições.
            Experimentos não afetam as rotas públicas nem o bundle do site.
          </Text>
        </div>

        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {planned.map((item) => (
            <li key={item.id} className="grid-editorial items-center gap-y-3 py-6">
              <span className="col-span-1 font-mono text-label text-muted uppercase lg:col-span-1">
                {item.id}
              </span>
              <span className="col-span-3 text-body-lg md:col-span-4 lg:col-span-6">
                {item.title}
              </span>
              <span className="col-span-4 flex flex-wrap gap-2 md:col-span-3 md:justify-end lg:col-span-5">
                <Tag>{item.kind}</Tag>
                <Tag>{item.stage}</Tag>
                <Tag>Planejado</Tag>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
