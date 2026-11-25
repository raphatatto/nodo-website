import Image from 'next/image';
import { projects, statusLabel, type Project } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ProjectCover } from '@/components/work/ProjectCover';
import { ProjectLink } from '@/components/work/ProjectLink';
import { cn } from '@/lib/cn';

/*
 * C — Creative Index
 * Revista editorial: masthead, sumário tipográfico (hover revela a capa no
 * desktop) e "spreads" alternando imagem e ficha técnica em mono.
 */

function IndexRow({ project }: { project: Project }) {
  return (
    <li className="group/row relative border-b border-line">
      <div className="grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-2 py-5 md:grid-cols-[3rem_1fr_12rem_5rem_7rem] md:py-7">
        <span className="font-mono text-label text-navy">{project.index}</span>
        <p className="font-display text-[clamp(1.75rem,4.6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] transition-transform duration-standard ease-out motion-safe:group-hover/row:translate-x-3">
          {project.title}
        </p>
        {/* miniatura inline no mobile */}
        <span className="relative block aspect-[4/3] w-16 overflow-hidden bg-carbon md:hidden">
          <Image src={project.cover.src} alt="" fill sizes="64px" className="object-cover" />
        </span>
        <span className="col-start-2 font-mono text-label text-muted uppercase md:col-start-auto">
          {project.service}
        </span>
        <span className="hidden font-mono text-label text-muted md:block">{project.year}</span>
        <span className="hidden justify-self-end rounded-pill border border-navy/40 px-2 py-0.5 font-mono text-label text-navy uppercase md:block">
          {statusLabel[project.status]}
        </span>
      </div>

      {/* capa flutuante (desktop, hover) — decorativa: o conteúdo já está na linha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[24%] z-10 hidden w-[min(22vw,22rem)] -translate-y-1/2 scale-95 opacity-0 shadow-2xl transition-[opacity,transform] duration-standard ease-out group-hover/row:scale-100 group-hover/row:opacity-100 lg:block"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
          <Image src={project.cover.src} alt="" fill sizes="22vw" className="object-cover" />
        </div>
      </div>
    </li>
  );
}

function Spread({ project, i }: { project: Project; i: number }) {
  const flip = i % 2 === 1;
  const portrait = project.cover.height > project.cover.width;

  return (
    <ProjectLink project={project}>
      <div className="relative grid-editorial items-end gap-y-8 border-t border-line pt-8">
        {/* numeral de fundo, editorial */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -top-6 font-display text-[clamp(8rem,22vw,22rem)] leading-none font-bold tracking-[-0.06em] text-border-light select-none',
            flip ? 'left-0' : 'right-0',
          )}
        >
          {project.index}
        </span>

        <div
          className={cn(
            'relative col-span-full',
            portrait ? 'lg:col-span-5' : 'lg:col-span-7',
            flip && (portrait ? 'lg:col-start-8' : 'lg:col-start-6'),
          )}
        >
          <ProjectCover
            project={project}
            ratio={portrait ? '4/5' : '4/3'}
            sizes={portrait ? '(min-width: 1024px) 40vw, 100vw' : '(min-width: 1024px) 56vw, 100vw'}
          />
          <p className="mt-3 font-mono text-label text-muted uppercase">
            FIG. {project.index} — {project.title}
          </p>
        </div>

        {/* ficha técnica */}
        <div
          className={cn(
            'relative col-span-full flex flex-col gap-6 lg:col-span-4',
            flip ? 'lg:col-start-1 lg:row-start-1' : portrait ? 'lg:col-start-8' : 'lg:col-start-9',
          )}
        >
          <h3 className="font-display text-h2 font-bold">{project.title}</h3>
          <p className="text-body text-muted">{project.summary}</p>
          <dl className="divide-y divide-line border-y border-line font-mono text-label uppercase">
            {[
              ['Serviço', project.service],
              ['Disciplinas', project.disciplines.join(' · ')],
              ['Status', statusLabel[project.status]],
              ['Ano', project.year],
            ].map(([label, value]) => (
              <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 py-2.5">
                <dt className="text-muted">{label}</dt>
                <dd className={label === 'Status' ? 'text-navy' : ''}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </ProjectLink>
  );
}

export function WorkC() {
  return (
    <Section id="work" theme="light" aria-labelledby="work-title">
      <Container className="flex flex-col gap-20 lg:gap-32">
        <div className="flex flex-col gap-10">
          {/* masthead */}
          <div className="grid grid-cols-3 border-y border-line py-3 font-mono text-label uppercase">
            <span className="text-navy">N° 01</span>
            <span className="text-center text-muted">Selected Work</span>
            <span className="text-right text-muted">Índice · 2026</span>
          </div>

          <div className="grid-editorial items-end gap-y-6">
            <h2
              id="work-title"
              className="col-span-full font-display text-[clamp(3rem,10vw,10.5rem)] leading-[0.86] font-bold tracking-[-0.055em] lg:col-span-9"
            >
              Ideias
              <br />
              em ação<span className="text-navy">.</span>
            </h2>
            <p className="col-span-full max-w-sm text-body text-muted lg:col-span-3 lg:pb-3">
              Conheça soluções e experimentos que mostram como transformamos necessidades em
              tecnologia. Estudos conceituais da NODO.
            </p>
          </div>

          {/* sumário */}
          <div>
            <div className="hidden grid-cols-[3rem_1fr_12rem_5rem_7rem] gap-x-4 border-b border-fg pb-2 font-mono text-label text-muted uppercase md:grid">
              <span>N°</span>
              <span>Projeto</span>
              <span>Serviço</span>
              <span>Ano</span>
              <span className="text-right">Status</span>
            </div>
            <ol>
              {projects.map((project) => (
                <IndexRow key={project.slug} project={project} />
              ))}
            </ol>
          </div>
        </div>

        {/* spreads */}
        <div className="flex flex-col gap-24 lg:gap-36">
          {projects.map((project, i) => (
            <Spread key={project.slug} project={project} i={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
