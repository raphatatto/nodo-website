import Image from 'next/image';
import type { Project } from '@/content/projects';
import { cn } from '@/lib/cn';

export type CoverRatio = '16/9' | '16/10' | '4/5' | '3/2' | '21/9' | '4/3';

const ratioClass: Record<CoverRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '16/10': 'aspect-[16/10]',
  '4/5': 'aspect-[4/5]',
  '3/2': 'aspect-[3/2]',
  '21/9': 'aspect-[21/9]',
  '4/3': 'aspect-[4/3]',
};

type ProjectCoverProps = {
  project: Project;
  ratio: CoverRatio;
  /** `sizes` do next/image conforme a largura que a capa ocupa no layout. */
  sizes: string;
  /** Enquadramento da imagem dentro da máscara (CSS object-position). */
  position?: string;
  priority?: boolean;
  /** Tratamento Navy discreto para unificar a galeria (só capas escuras). */
  tint?: boolean;
  className?: string;
};

/**
 * Capa de projeto com proporção controlada. Hover: escala sutil da imagem dentro
 * da máscara (pai com `group/project`). `data-reveal` e `data-cursor` são ganchos
 * para a Etapa 5 (GSAP: reveal por máscara e cursor "ver projeto").
 */
export function ProjectCover({
  project,
  ratio,
  sizes,
  position = '50% 50%',
  priority = false,
  tint = false,
  className,
}: ProjectCoverProps) {
  return (
    <div
      data-reveal="media"
      data-cursor={project.available ? 'Ver projeto' : undefined}
      className={cn(
        'relative isolate overflow-hidden bg-carbon',
        ratioClass[ratio],
        project.tone === 'light' && 'bg-border-light',
        className,
      )}
    >
      <Image
        src={project.cover.src}
        alt={project.cover.alt}
        fill
        sizes={sizes}
        priority={priority}
        style={{ objectPosition: position }}
        className="object-cover transition-transform duration-reveal ease-out group-hover/project:scale-[1.03] motion-reduce:transition-none"
      />
      {tint && project.tone === 'dark' ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-navy opacity-25 mix-blend-color"
        />
      ) : null}
    </div>
  );
}
