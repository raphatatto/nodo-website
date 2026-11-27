import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getNextProject, getProject, projects, statusLabel } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { ProjectCover } from '@/components/work/ProjectCover';
import { cn } from '@/lib/cn';

/*
 * /work/[slug] — matéria editorial de um estudo (DS §12).
 * Conceitos: cenário, desafio e solução são hipóteses; os "recursos visuais" são recortes
 * da MESMA imagem conceitual (legendados como tal) — nenhuma tela é inventada.
 * Com cacheComponents, `dynamicParams` não existe: slug desconhecido → notFound().
 * `params` é lido no topo (sem <Suspense>): assim o HTML pré-renderizado de cada slug já traz
 * o case inteiro, legível sem JavaScript. Com <Suspense>, o React emitia o placeholder e só
 * trocava pelo conteúdo via script inline — invisível sem JS e pior para o LCP.
 */

/**
 * Por isso a navegação para o case pode "bloquear": o segmento sai da validação de instant
 * navigation (aviso só de desenvolvimento). Os 4 slugs são estáticos, então a espera é só o
 * payload pré-renderizado — e o case chega num único commit, como a transição M04 exigirá.
 */
export const instant = false;

/**
 * Composição assimétrica dos recortes: a largura acompanha a proporção (retrato = estreito).
 * Larguras limitadas a ~7 colunas para que zoom × largura não ultrapasse a resolução da imagem.
 */
function figureLayout(ratio: string, i: number) {
  const portrait = ratio === '4/5';
  if (i === 0) return portrait ? 'md:col-span-4 lg:col-span-5' : 'lg:col-span-7';
  if (i === 1)
    return portrait
      ? 'md:col-span-4 lg:col-span-4 lg:col-start-9 lg:mt-32'
      : 'lg:col-span-5 lg:col-start-8 lg:mt-32';
  return portrait ? 'md:col-span-4 lg:col-span-4 lg:col-start-3' : 'lg:col-span-7 lg:col-start-4';
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/work/[slug]'>): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.summary} Estudo conceitual da NODO.`,
  };
}

export default async function CasePage({ params }: PageProps<'/work/[slug]'>) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const { caseStudy: cs } = project;
  const next = getNextProject(project.slug);
  const portrait = project.cover.height > project.cover.width;
  const theme = project.tone === 'light' ? 'light' : 'dark';

  const chapters = [
    { index: '01', label: 'Cenário', note: 'hipótese do estudo', text: cs.context },
    { index: '02', label: 'Desafio', note: null, text: cs.challenge },
    { index: '03', label: 'Solução proposta', note: null, text: cs.solution },
  ];

  return (
    <>
      {/* hero do projeto — atmosfera da capa */}
      <Section theme={theme} aria-labelledby="case-title" className="pb-0">
        <Container className="flex flex-col gap-12">
          <nav
            aria-label="Trilha"
            className="flex items-center gap-3 font-mono text-label text-muted uppercase"
          >
            <Link href="/work" className="inline-flex min-h-control items-center hover:text-fg">
              Work
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{project.index}</span>
          </nav>

          <div className="grid-editorial items-end gap-y-10">
            <div className="col-span-full flex flex-col gap-6 lg:col-span-8">
              <h1
                id="case-title"
                className="font-display text-[clamp(3rem,10vw,10rem)] leading-[0.86] font-bold tracking-[-0.055em]"
              >
                {project.title}
                <span className="text-accent-detail">.</span>
              </h1>
              <p className="max-w-xl text-body-lg text-muted">{project.summary}</p>
            </div>

            <dl className="col-span-full grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-4 font-mono text-label uppercase md:col-span-6 lg:col-span-4 lg:col-start-9">
              <div className="flex flex-col gap-1">
                <dt className="text-muted">Categoria</dt>
                <dd>{project.service}</dd>
              </div>
              <div className="flex flex-col gap-1">
                <dt className="text-muted">Ano</dt>
                <dd>{project.year}</dd>
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <dt className="text-muted">Status</dt>
                <dd className="text-accent-detail">{statusLabel[project.status]}</dd>
              </div>
            </dl>
          </div>

          {project.status === 'concept' ? (
            <p className="max-w-3xl border-l-2 border-accent-detail py-1 pl-4 text-small">
              <strong className="font-medium">Estudo conceitual da NODO.</strong> Não há cliente,
              implementação ou resultados: o cenário e a solução descrevem uma hipótese de projeto,
              ilustrada por uma única imagem conceitual.
            </p>
          ) : null}
        </Container>

        {/* capa em grande escala */}
        <div className={cn('mt-16 lg:mt-24', portrait && 'mx-auto w-full max-w-layout px-gutter')}>
          <div className={cn(portrait && 'lg:mx-auto lg:w-7/12')}>
            <ProjectCover
              project={project}
              ratio={portrait ? '4/5' : '21/9'}
              sizes={portrait ? '(min-width: 1024px) 58vw, 100vw' : '100vw'}
              priority
              className={cn(!portrait && 'max-lg:aspect-[4/3]')}
            />
          </div>
        </div>
      </Section>

      {/* cenário · desafio · solução */}
      <Section theme="light" aria-labelledby="case-story">
        <Container className="flex flex-col gap-16">
          <h2 id="case-story" className="sr-only">
            Sobre o estudo
          </h2>
          {chapters.map((c, i) => (
            <article
              key={c.index}
              className="grid-editorial gap-y-4 border-t border-line pt-8"
              aria-labelledby={`chapter-${c.index}`}
            >
              <div className="col-span-full flex flex-col gap-1 md:col-span-3 lg:col-span-3">
                <span className="font-mono text-label text-muted">{c.index}</span>
                <h3 id={`chapter-${c.index}`} className="font-display text-h3 font-bold">
                  {c.label}
                </h3>
                {c.note ? (
                  <span className="font-mono text-label text-muted uppercase">{c.note}</span>
                ) : null}
              </div>
              <p
                className={cn(
                  'col-span-full text-body-lg md:col-span-5 lg:col-span-6',
                  // ritmo editorial: o texto avança uma coluna a cada capítulo
                  i === 0 && 'lg:col-start-5',
                  i === 1 && 'lg:col-start-6',
                  i === 2 && 'lg:col-start-7',
                )}
              >
                {c.text}
              </p>
            </article>
          ))}
        </Container>
      </Section>

      {/* recursos visuais: recortes da mesma imagem */}
      <Section theme={theme} aria-labelledby="case-figures">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="case-figures" className="font-display text-h2 font-bold">
              Recursos visuais
            </h2>
            <p className="font-mono text-label text-muted uppercase">
              Recortes da imagem conceitual
            </p>
          </div>
          <div className="grid-editorial gap-y-12">
            {cs.figures.map((f, i) => (
              <figure
                key={f.caption}
                className={cn('col-span-full flex flex-col gap-3', figureLayout(f.ratio, i))}
              >
                <ProjectCover
                  project={project}
                  ratio={f.ratio}
                  position={f.position}
                  zoom={f.zoom}
                  alt={`Detalhe da imagem conceitual de ${project.title}: ${f.caption.toLowerCase()}.`}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                />
                <figcaption className="font-mono text-label text-muted uppercase">
                  FIG. {project.index}.{i + 1} — {f.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* ficha técnica */}
      <Section theme="light" aria-labelledby="case-sheet">
        <Container className="grid-editorial gap-y-8">
          <div className="col-span-full md:col-span-3 lg:col-span-3">
            <SectionLabel>Ficha técnica</SectionLabel>
            <h2 id="case-sheet" className="sr-only">
              Ficha técnica
            </h2>
          </div>
          <dl className="col-span-full divide-y divide-line border-y border-line md:col-span-5 lg:col-span-7 lg:col-start-5">
            {[
              ['Serviço', project.service],
              ['Status', statusLabel[project.status]],
              ['Ano', project.year],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                <dt className="font-mono text-label text-muted uppercase">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-4">
              <dt className="font-mono text-label text-muted uppercase">Disciplinas</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {project.disciplines.map((d) => (
                    <li key={d}>
                      <Tag>{d}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="grid grid-cols-[8rem_1fr] gap-4 py-4">
              <dt className="font-mono text-label text-muted uppercase">Tecnologias</dt>
              <dd>
                {cs.technologies
                  ? cs.technologies.join(' · ')
                  : 'Estudo visual — sem implementação técnica a declarar.'}
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      {/* próximo projeto */}
      <Section theme="dark" aria-labelledby="next-title">
        <Container>
          <Link
            href={`/work/${next.slug}`}
            prefetch
            className="group/next grid-editorial items-center gap-y-8 border-t border-line pt-8"
          >
            <div className="col-span-full flex flex-col gap-4 lg:col-span-7">
              <span className="font-mono text-label text-muted uppercase">
                Próximo projeto · {next.index}
              </span>
              <h2
                id="next-title"
                className="font-display text-[clamp(2.5rem,7vw,7rem)] leading-[0.9] font-bold tracking-[-0.05em] transition-colors duration-fast group-hover/next:text-accent-detail"
              >
                {next.title} <span aria-hidden="true">↗</span>
              </h2>
              <span className="font-mono text-label text-muted uppercase">{next.service}</span>
            </div>
            <span className="relative col-span-full block aspect-[16/10] overflow-hidden bg-carbon lg:col-span-4 lg:col-start-9">
              <Image
                src={next.cover.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 30vw, 100vw"
                className="object-cover transition-transform duration-reveal ease-out group-hover/next:scale-[1.03] motion-reduce:transition-none"
              />
            </span>
          </Link>
        </Container>
      </Section>

      <ContactCta index={null} />
    </>
  );
}
