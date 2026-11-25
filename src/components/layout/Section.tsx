import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

export type Theme = 'light' | 'dark' | 'signal';

type SectionProps = ComponentPropsWithoutRef<'section'> & {
  /** Atmosfera da seção (DS §05): Light → Dark → Light → Signal, como páginas de revista. */
  theme?: Theme;
  /** `default` aplica o espaçamento vertical do DS; `none` deixa a composição livre. */
  spacing?: 'default' | 'none';
};

export function Section({ theme, spacing = 'default', className, ...rest }: SectionProps) {
  return (
    <section
      data-theme={theme}
      className={cn(spacing === 'default' && 'py-section', className)}
      {...rest}
    />
  );
}
