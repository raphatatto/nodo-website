import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type HeadingSize = 'hero' | 'h1' | 'h2' | 'h3';
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'p';

type HeadingProps = ComponentPropsWithoutRef<'h2'> & {
  /** Elemento semântico — independente do tamanho visual. */
  as?: HeadingTag;
  size?: HeadingSize;
};

const sizes: Record<HeadingSize, string> = {
  hero: 'text-hero',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
};

export function Heading({ as: Tag = 'h2', size = 'h2', className, ...rest }: HeadingProps) {
  return <Tag className={cn('font-display font-bold', sizes[size], className)} {...rest} />;
}
