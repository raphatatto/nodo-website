import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/cn';

type ProjectLinkProps = {
  project: Project;
  className?: string;
  children: ReactNode;
};

/**
 * Envolve um projeto. Enquanto /work/[slug] não existir (`available: false`),
 * renderiza um <article> sem link — nunca um link para rota inexistente.
 * Ambos os casos expõem `group/project` para os estados de hover das capas.
 * `prefetch` = per-link prefetching (Partial Prefetching): o case chega antes do clique.
 */
export function ProjectLink({ project, className, children }: ProjectLinkProps) {
  const classes = cn('group/project block', className);

  if (project.available) {
    return (
      <Link href={`/work/${project.slug}`} prefetch className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <article aria-label={project.title} className={classes}>
      {children}
    </article>
  );
}
