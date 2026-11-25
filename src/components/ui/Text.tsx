import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

type TextProps = ComponentPropsWithoutRef<'p'> & {
  size?: 'lg' | 'body' | 'small';
  muted?: boolean;
  /** Limita a largura a ~65 caracteres (DS §06). */
  measure?: boolean;
};

const sizes = {
  lg: 'text-body-lg',
  body: 'text-body',
  small: 'text-small',
} as const;

export function Text({
  size = 'body',
  muted = false,
  measure = true,
  className,
  ...rest
}: TextProps) {
  return (
    <p
      className={cn(sizes[size], muted && 'text-muted', measure && 'max-w-prose', className)}
      {...rest}
    />
  );
}
