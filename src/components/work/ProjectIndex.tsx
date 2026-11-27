import Image from 'next/image';
import { projects, statusLabel, type Project } from '@/content/projects';
import { ProjectLink } from './ProjectLink';

/*
 * Índice tipográfico de projetos (/work) — promovido do conceito "Creative Index" (Etapa 3, C).
 * Complementa o Full Width Showcase da Home: aqui o objetivo é varrer o catálogo rápido.
 * A linha inteira é o link; a capa flutuante (hover/foco, desktop) é decorativa — título,
 * serviço, ano e status estão sempre visíveis.
 */

function Row({ project }: { project: Project }) {
  return (
    <li className="relative border-b border-line">
      <ProjectLink
        project={project}
        className="group/row grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[3rem_1fr_12rem_5rem_7rem] md:py-8"
      >
        <span className="font-mono text-label text-accent-detail">{project.index}</span>
        <span className="font-display text-[clamp(1.75rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] transition-transform duration-standard ease-out motion-safe:group-hover/row:translate-x-3 motion-safe:group-focus-visible/row:translate-x-3">
          {project.title}
        </span>{' '}
        {/* miniatura inline (mobile/tablet) */}
        <span className="relative block aspect-[4/3] w-16 overflow-hidden bg-carbon md:hidden">
          <Image src={project.cover.src} alt="" fill sizes="64px" className="object-cover" />
        </span>
        <span className="col-start-2 font-mono text-label text-muted uppercase md:col-start-auto">
          {project.service}
        </span>{' '}
        <span className="hidden font-mono text-label text-muted md:block">{project.year}</span>{' '}
        <span className="hidden justify-self-end rounded-pill border border-accent-detail px-2 py-0.5 font-mono text-label text-accent-detail uppercase md:block">
          {statusLabel[project.status]}
        </span>
        {/* capa flutuante (desktop) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-[24%] z-10 hidden w-[min(22vw,22rem)] -translate-y-1/2 scale-95 opacity-0 shadow-2xl transition-[opacity,transform] duration-standard ease-out group-hover/row:scale-100 group-hover/row:opacity-100 group-focus-visible/row:scale-100 group-focus-visible/row:opacity-100 lg:block"
        >
          <span className="relative block aspect-[4/3] overflow-hidden bg-carbon">
            <Image src={project.cover.src} alt="" fill sizes="22vw" className="object-cover" />
          </span>
        </span>
      </ProjectLink>
    </li>
  );
}

export function ProjectIndex() {
  return (
    <ol className="border-t border-line">
      {projects.map((p) => (
        <Row key={p.slug} project={p} />
      ))}
    </ol>
  );
}
