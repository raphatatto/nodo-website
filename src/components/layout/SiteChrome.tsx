import type { ReactNode } from 'react';
import { Footer } from './Footer';
import { Header, type HeaderVariant } from './Header';

/** Header + conteúdo principal + Footer — moldura padrão das páginas do site. */
export function SiteChrome({
  header = 'solid',
  children,
}: {
  /** `overlay` na Home: o Header flutua sobre o Hero. */
  header?: HeaderVariant;
  children: ReactNode;
}) {
  return (
    <>
      <Header variant={header} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
