import { projects, type Project } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { ProjectCover } from '@/components/work/ProjectCover';
import { ProjectLink } from '@/components/work/ProjectLink';
import { ProjectMeta } from '@/components/work/ProjectMeta';
import Link from 'next/link';
import { site } from '@/config/site';
import { cn } from '@/lib/cn';

/*
 * 02 — Selected Work · "Full Width Showcase" (direção B aprovada na Etapa 3 — não redesenhar).
 * Promovido de src/experiments/work-b/WorkB.tsx. Um projeto por "tela": imagem em grande
 * escala alternando o lado; do outro, índice gigante + título + meta numa coluna sticky (CSS).
 * Diferenças intencionais: índice da seção 02 (ordem da Home), 1ª capa sem carregamento
 * prioritário (fora da dobra; o LCP é o Hero), link para /work quando a rota existir, ganchos data-*.
 */

function Showcase({ project, i }: { project: Project; i: number }) {
  const imageRight = i % 2 === 1;
  const portrait = project.cover.height > project.cover.width;

  return (
    <li className="border-t border-line">
      <ProjectLink project={project}>
        <div className="grid-editorial gap-y-8 py-14 lg:min-h-[min(90svh,60rem)] lg:items-start lg:py-24">
          {/* imagem */}
          <div
            className={cn(
              'col-span-full',
              portrait ? 'lg:col-span-5' : 'lg:col-span-8',
              imageRight ? 'lg:order-2 lg:col-start-5' : 'lg:order-1',
              imageRight && portrait && 'lg:col-start-8',
            )}
          >
            <ProjectCover
              project={project}
              ratio={portrait ? '4/5' : '16/10'}
              position={project.slug === 'connected-operations' ? '50% 40%' : '50% 45%'}
              sizes={
                portrait ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 64vw, 100vw'
              }
            />
          </div>

          {/* texto sticky */}
          <div
            className={cn(
              'col-span-full flex flex-col gap-6 lg:sticky lg:top-24',
              portrait ? 'lg:col-span-6' : 'lg:col-span-4',
              imageRight ? 'lg:order-1 lg:col-start-1' : 'lg:order-2',
              !imageRight && (portrait ? 'lg:col-start-7' : 'lg:col-start-9'),
            )}
          >
            <p
              aria-hidden="true"
              className="font-display text-[clamp(4.5rem,11vw,11rem)] leading-[0.8] font-bold tracking-[-0.06em] text-navy"
            >
              {project.index}
            </p>
            <h3 className="font-display text-h2 font-bold">{project.title}</h3>
            <p className="max-w-md text-body text-muted">{project.summary}</p>
            <ProjectMeta project={project} withIndex={false} />
            <ul className="flex flex-wrap gap-2">
              {project.disciplines.map((d) => (
                <li key={d}>
                  <Tag>{d}</Tag>
                </li>
              ))}
            </ul>
            {/* progresso editorial — M05 (ScrollTrigger) na Etapa 5 */}
            <div
              data-progress
              className="mt-2 flex items-center gap-3 font-mono text-label text-muted"
              aria-hidden="true"
            >
              <span>{project.index}</span>
              <span className="relative h-px w-24 bg-line">
                <span
                  className="absolute inset-y-0 left-0 bg-navy"
                  style={{ width: `${((i + 1) / projects.length) * 100}%` }}
                />
              </span>
              <span>{String(projects.length).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
      </ProjectLink>
    </li>
  );
}

export function SelectedWork() {
  const all = site.nav.find((item) => item.href === '/work');

  return (
    <Section id="work" theme="light" data-motion-section="work" aria-labelledby="work-title">
      <Container>
        <header className="flex flex-col gap-8 pb-16 lg:pb-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionLabel index="02">Selected Work</SectionLabel>
            <p className="font-mono text-label text-muted uppercase">
              04 projetos · estudos conceituais
            </p>
          </div>
          <h2
            id="work-title"
            className="font-display text-[clamp(3.25rem,12.5vw,13rem)] leading-[0.85] font-bold tracking-[-0.055em]"
          >
            <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
              <span data-reveal-line className="block">
                Ideias em ação<span className="text-navy">.</span>
              </span>
            </span>
          </h2>
          <p data-reveal="up" className="max-w-xl text-body-lg text-muted">
            Conheça soluções e experimentos que mostram como transformamos necessidades em
            tecnologia.
          </p>
        </header>

        <ol className="border-b border-line">
          {projects.map((project, i) => (
            <Showcase key={project.slug} project={project} i={i} />
          ))}
        </ol>

        {all?.available ? (
          <Link
            href={all.href}
            className="mt-6 inline-flex min-h-control items-center gap-2 font-mono text-label uppercase hover:text-accent-detail"
          >
            Ver todos os projetos <span aria-hidden="true">↗</span>
          </Link>
        ) : (
          <p className="pt-6 font-mono text-label text-muted uppercase">
            Todos os projetos — em breve
          </p>
        )}
      </Container>
    </Section>
  );
}
