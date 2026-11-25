import { projects, type Project } from '@/content/projects';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { ProjectCover, type CoverRatio } from '@/components/work/ProjectCover';
import { ProjectLink } from '@/components/work/ProjectLink';
import { ProjectMeta } from '@/components/work/ProjectMeta';
import { cn } from '@/lib/cn';

/*
 * A — Editorial Gallery
 * Um projeto protagonista (Basement) seguido de satélites em grade assimétrica
 * de 12 colunas, com proporções diferentes e espaço negativo entre eles.
 */

const [featured] = projects as [Project, ...Project[]];

// Ordem de leitura dos satélites (define o posicionamento na grade).
const SATELLITE_ORDER = ['digital-experience', 'intelligent-assistant', 'connected-operations'];

// Composição artística dos satélites: coluna, proporção, deslocamento e enquadramento.
const SATELLITES: Record<
  string,
  { span: string; ratio: CoverRatio; offset?: string; position?: string; sizes: string }
> = {
  'digital-experience': {
    span: 'lg:col-span-5',
    ratio: '4/5',
    offset: 'lg:mt-40',
    sizes: '(min-width: 1024px) 40vw, 100vw',
  },
  'intelligent-assistant': {
    span: 'lg:col-span-6 lg:col-start-7',
    ratio: '3/2',
    position: '50% 40%',
    sizes: '(min-width: 1024px) 48vw, 100vw',
  },
  'connected-operations': {
    span: 'lg:col-span-10 lg:col-start-3',
    ratio: '21/9',
    offset: 'lg:mt-8',
    position: '50% 46%',
    sizes: '(min-width: 1024px) 80vw, 100vw',
  },
};

function Satellite({ project }: { project: Project }) {
  const layout = SATELLITES[project.slug]!;
  return (
    <ProjectLink project={project} className={cn('col-span-full', layout.span, layout.offset)}>
      <ProjectCover
        project={project}
        ratio={layout.ratio}
        position={layout.position}
        sizes={layout.sizes}
      />
      <div className="mt-5 flex flex-col gap-3">
        <ProjectMeta project={project} />
        <h3 className="font-display text-h3 font-bold">{project.title}</h3>
        <p className="max-w-md text-small text-muted">{project.summary}</p>
      </div>
    </ProjectLink>
  );
}

export function WorkA() {
  return (
    <Section id="work" theme="light" aria-labelledby="work-title" className="relative">
      <Container className="flex flex-col gap-20 lg:gap-28">
        {/* cabeçalho editorial */}
        <header className="grid-editorial items-end gap-y-8">
          <div className="col-span-full flex flex-col gap-6 lg:col-span-8">
            <SectionLabel index="01">Selected Work</SectionLabel>
            <h2
              id="work-title"
              className="font-display text-[clamp(3rem,9vw,9.5rem)] leading-[0.88] font-bold tracking-[-0.05em]"
            >
              Ideias em ação<span className="text-navy">.</span>
            </h2>
          </div>
          <div className="col-span-full flex flex-col gap-4 lg:col-span-4 lg:col-start-9 lg:pb-4">
            <p className="text-body-lg">
              Conheça soluções e experimentos que mostram como transformamos necessidades em
              tecnologia.
            </p>
            <p className="font-mono text-label text-muted uppercase">
              04 projetos · estudos conceituais da NODO
            </p>
          </div>
        </header>

        {/* projeto protagonista */}
        <ProjectLink project={featured}>
          <ProjectCover
            project={featured}
            ratio="16/9"
            position="50% 40%"
            sizes="(min-width: 1600px) 1472px, 100vw"
            priority
          />
          <div className="mt-6 grid-editorial gap-y-6">
            <p className="col-span-1 font-display text-h2 leading-none font-bold text-navy lg:col-span-1">
              {featured.index}
            </p>
            <div className="col-span-3 flex flex-col gap-3 md:col-span-5 lg:col-span-6">
              <h3 className="font-display text-h2 font-bold">{featured.title}</h3>
              <p className="max-w-xl text-body text-muted">{featured.summary}</p>
            </div>
            <div className="col-span-full flex flex-col gap-4 md:col-span-8 lg:col-span-4 lg:col-start-9 lg:items-end">
              <ProjectMeta project={featured} withIndex={false} className="lg:justify-end" />
              <ul className="flex flex-wrap gap-2 lg:justify-end">
                {featured.disciplines.map((d) => (
                  <li key={d}>
                    <Tag>{d}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ProjectLink>

        {/* satélites em grade assimétrica */}
        <div className="grid-editorial gap-y-20 lg:gap-y-28">
          {SATELLITE_ORDER.map((slug) => {
            const project = projects.find((p) => p.slug === slug)!;
            return <Satellite key={slug} project={project} />;
          })}
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-label text-muted uppercase">
          <span>Todos os projetos — em breve</span>
          <span>Projetos conceituais · sem clientes ou métricas</span>
        </footer>
      </Container>
    </Section>
  );
}
