import { SiteChrome } from '@/components/layout/SiteChrome';

/** Páginas internas: Header sólido (barra Dark) com CTA. */
export default function PagesLayout({ children }: LayoutProps<'/'>) {
  return <SiteChrome>{children}</SiteChrome>;
}
