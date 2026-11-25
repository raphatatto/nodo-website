import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type IconButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'children'> & {
  /** Nome acessível obrigatório — o botão contém apenas um ícone. */
  'aria-label': string;
  children: ReactNode;
};

export function IconButton({ className, children, type = 'button', ...rest }: IconButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex size-control items-center justify-center rounded-sm border border-transparent text-fg transition-colors duration-fast ease-out hover:border-line disabled:pointer-events-none disabled:opacity-55 [&_svg]:size-5 [&_svg]:shrink-0',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
