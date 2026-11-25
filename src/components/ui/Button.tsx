import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';

type CommonProps = {
  variant?: ButtonVariant;
  /** Seta diagonal discreta (DS §07: exploração/link). */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof CommonProps> & {
    href?: undefined;
    loading?: boolean;
  };

type ButtonAsLink = CommonProps &
  Omit<ComponentPropsWithoutRef<'a'>, keyof CommonProps | 'href'> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  'group/button inline-flex min-h-control items-center justify-center gap-4 rounded-sm border font-body text-body leading-[1.4] font-medium whitespace-nowrap transition-[background-color,color,border-color,opacity] duration-fast ease-out select-none active:translate-y-px disabled:pointer-events-none disabled:opacity-55';

const variants: Record<ButtonVariant, string> = {
  // Light: Navy/White · Dark: Navy/White + contorno Blue Light · Signal: Paper/Navy
  primary: 'border-accent-border bg-accent px-6 py-3 text-on-accent hover:bg-accent-hover',
  secondary: 'border-control bg-transparent px-6 py-3 text-fg hover:bg-surface',
  outline: 'border-fg bg-transparent px-6 py-3 text-fg hover:bg-fg hover:text-bg',
  text: 'border-transparent px-0 py-3 text-fg underline-offset-[6px] hover:underline',
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      strokeWidth={1.5}
      className="size-4 shrink-0 transition-transform duration-fast ease-out group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
    />
  );
}

export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { href, variant = 'primary', arrow = false, className, children, ...rest } = props;
    const classes = cn(base, variants[variant], className);
    const content = (
      <>
        {children}
        {arrow ? <Arrow /> : null}
      </>
    );
    return isExternal(href) ? (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    ) : (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const {
    variant = 'primary',
    arrow = false,
    loading = false,
    disabled,
    type = 'button',
    className,
    children,
    ...rest
  } = props;

  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {children}
      {loading ? (
        <LoaderCircle
          aria-hidden="true"
          strokeWidth={1.5}
          className="size-4 shrink-0 animate-spin motion-reduce:animate-none"
        />
      ) : arrow ? (
        <Arrow />
      ) : null}
    </button>
  );
}
