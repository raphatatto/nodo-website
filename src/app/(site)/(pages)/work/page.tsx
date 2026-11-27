import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { ProjectIndex } from '@/components/work/ProjectIndex';

export const metadata: Metadata = {
  title: 'Projetos',
  description:
    'Estudos conceituais da NODO em sites, produtos digitais, automação e inteligência artificial.',
};

/*
 * /work — catálogo. Masthead Carbon + índice tipográfico em Paper (Creative Index),
 * pensado para varrer; a apresentação cinematográfica fica na Home (Selected Work B).
 */
export default function WorkPage() {
  const count = String(projects.length).padStart(2, '0');

  return (
    <>
      <Section theme="dark" aria-labelledby="work-title">
        <Container className="flex flex-col gap-12">
          <div className="grid grid-cols-3 border-y border-line py-3 font-mono text-label uppercase">
            <span className="text-accent-detail">Work</span>
            <span className="text-center text-muted">Índice</span>
            <span className="text-right text-muted">{count} estudos · 2026</span>
          </div>
          <div className="grid-editorial items-end gap-y-8">
            <h1
              id="work-title"
              className="col-span-full font-display text-[clamp(3.25rem,12vw,12.5rem)] leading-[0.85] font-bold tracking-[-0.055em] lg:col-span-9"
            >
              <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
                <span data-reveal-line className="block">
                  Ideias em ação<span className="text-accent-detail">.</span>
                </span>
              </span>
            </h1>
            <p className="col-span-full max-w-sm text-body-lg text-muted lg:col-span-3 lg:pb-4">
              Conheça soluções e experimentos que mostram como transformamos necessidades em
              tecnologia.
            </p>
          </div>
        </Container>
      </Section>

      <Section theme="light" aria-labelledby="index-title">
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="index-title" className="font-mono text-label font-normal text-muted uppercase">
              {count} <span aria-hidden="true">/</span> Projetos
            </h2>
            <p className="font-mono text-label text-muted uppercase">
              Todos os projetos atuais são estudos conceituais da NODO
            </p>
          </div>
          <ProjectIndex />
        </Container>
      </Section>

      <ContactCta index={null} />
    </>
  );
}
