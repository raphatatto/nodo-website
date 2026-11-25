import { SiteChrome } from '@/components/layout/SiteChrome';

/** Páginas internas com a moldura do site: /design-system e o índice /playground. */
export default function InternalChromeLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome>{children}</SiteChrome>;
}
