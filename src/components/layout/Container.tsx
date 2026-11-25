import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '@/lib/cn';

/** Largura máxima de 1600 px e margens laterais fluidas (DS §08). */
export function Container({ className, ...rest }: ComponentPropsWithoutRef<'div'>) {
  return <div className={cn('mx-auto w-full max-w-layout px-gutter', className)} {...rest} />;
}
