import { SiteChrome } from '@/components/layout/SiteChrome';

/** Home: o Header flutua sobre o Hero (variante `overlay`). */
export default function HomeLayout({ children }: LayoutProps<'/'>) {
  return <SiteChrome header="overlay">{children}</SiteChrome>;
}
