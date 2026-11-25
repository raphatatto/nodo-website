import type { Metadata } from 'next';
import { Geist, IBM_Plex_Mono, Space_Grotesk } from 'next/font/google';
import { site } from '@/config/site';
import { SkipLink } from '@/components/layout/SkipLink';
import './globals.css';

// Tipografia do DS §06 — ligada a --font-display/body/mono em globals.css.
const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '700'],
  variable: '--font-display-loaded',
  display: 'swap',
});

const body = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body-loaded',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-loaded',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.category}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="pt-BR"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      // Next desativa o smooth scroll durante transições de rota (globals.css usa smooth).
      data-scroll-behavior="smooth"
      // Extensões de navegador (ex.: LanguageTool, `data-lt-installed`) injetam atributos
      // no <html> antes da hidratação. Vale só para os atributos deste elemento.
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col">
        <SkipLink />
        {children}
      </body>
    </html>
  );
}
