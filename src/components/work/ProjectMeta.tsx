import { statusLabel, type Project } from '@/content/projects';
import { cn } from '@/lib/cn';

type ProjectMetaProps = {
  project: Project;
  /** Exibe o índice editorial (01, 02…) no início da linha. */
  withIndex?: boolean;
  className?: string;
};

/** Linha editorial em mono: índice · serviço · ano · status (DS §07/§12). */
export function ProjectMeta({ project, withIndex = true, className }: ProjectMetaProps) {
  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-label text-muted uppercase',
        className,
      )}
    >
      {withIndex ? <span className="text-accent-detail">{project.index}</span> : null}
      <span>{project.service}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
      <span className="rounded-pill border border-accent-detail/40 px-2 py-0.5 text-accent-detail">
        {statusLabel[project.status]}
      </span>
    </p>
  );
}
