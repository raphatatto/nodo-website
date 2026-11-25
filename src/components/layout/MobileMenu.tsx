'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';

/**
 * Menu mobile com <dialog> nativo: foco preso no modal, Esc fecha, fundo inerte
 * e o foco volta ao botão que abriu (DS §09/§16). Scroll travado via CSS
 * (`html:has(dialog[open])` em globals.css).
 */
export function MobileMenu({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  // Fecha ao navegar por um link dentro do menu.
  const handleClick = (event: MouseEvent<HTMLDialogElement>) => {
    if ((event.target as HTMLElement).closest('a')) close();
  };

  return (
    <>
      <IconButton
        aria-label="Abrir menu"
        aria-haspopup="dialog"
        onClick={open}
        className="md:hidden"
      >
        <Menu strokeWidth={1.5} aria-hidden="true" />
      </IconButton>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        data-theme="dark"
        onClick={handleClick}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-bg text-fg backdrop:bg-carbon"
      >
        <div className="flex h-full flex-col px-gutter">
          <div className="flex min-h-20 items-center justify-between">
            <Logo />
            <IconButton aria-label="Fechar menu" onClick={close}>
              <X strokeWidth={1.5} aria-hidden="true" />
            </IconButton>
          </div>
          <nav aria-label="Principal" className="mt-12">
            {children}
          </nav>
        </div>
      </dialog>
    </>
  );
}
