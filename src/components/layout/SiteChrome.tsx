import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

/** Header + conteúdo principal + Footer — moldura padrão das páginas do site. */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
