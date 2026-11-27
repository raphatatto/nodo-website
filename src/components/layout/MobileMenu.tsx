'use client';

import { useLayoutEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { IconButton } from '@/components/ui/IconButton';
import { Logo } from '@/components/ui/Logo';

/**
 * Menu mobile com <dialog> nativo: foco preso no modal, Esc fecha, fundo inerte
 * e o foco volta ao botão que abriu (DS §09/§16). Scroll travado via CSS
 * (`html:has(dialog[open])` em globals.css).
 * Com `cacheComponents`, a rota anterior fica oculta via <Activity>: o cleanup do
 * layout effect fecha o menu para ele não reaparecer aberto ao voltar.
 */
export function MobileMenu({ children, footer }: { children: ReactNode; footer?: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = () => dialogRef.current?.showModal();
  const close = () => dialogRef.current?.close();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    return () => dialog?.close();
  }, []);

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
        <div className="flex h-full flex-col px-gutter pb-8">
          <div className="flex min-h-20 items-center justify-between">
            <Logo />
            <IconButton aria-label="Fechar menu" onClick={close}>
              <X strokeWidth={1.5} aria-hidden="true" />
            </IconButton>
          </div>
          <nav aria-label="Principal" className="mt-12">
            {children}
          </nav>
          {footer ? <div className="mt-auto flex flex-col gap-6 pt-10">{footer}</div> : null}
        </div>
      </dialog>
    </>
  );
}
