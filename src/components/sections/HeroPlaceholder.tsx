import { site } from '@/config/site';
import { cn } from '@/lib/cn';
import { internalRoutesEnabled } from '@/lib/internal';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';

/**
 * PROVISÓRIO — Etapa 1 (Foundation).
 * Valida tipografia, tema Dark e grid. O Hero definitivo será definido na
 * Etapa 2 (Art Direction), a partir de três propostas visuais.
 */
export function HeroPlaceholder() {
  const showInternal = internalRoutesEnabled();

  return (
    <Section
      theme="dark"
      spacing="none"
      aria-labelledby="hero-title"
      className="relative overflow-hidden"
    >
      {/* Technical Grid (DS §07): linhas finas alinhadas às 12 colunas — decorativo */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Container className="grid-editorial h-full">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={cn(
                'border-l border-line/60',
                i >= 4 && i < 8 && 'hidden md:block',
                i >= 8 && 'hidden lg:block',
              )}
            />
          ))}
        </Container>
      </div>

      <Container className="relative grid-editorial min-h-[calc(100svh-5rem)] content-between gap-y-16 pt-16 pb-12 md:pt-24">
        <div className="col-span-full flex items-start justify-between gap-6">
          <SectionLabel index="00">{site.category}</SectionLabel>
          <p className="hidden font-mono text-label text-muted uppercase md:block">
            FIG. 001 — NODO / Foundation
          </p>
        </div>

        <div className="col-span-full flex flex-col gap-10 lg:col-span-11">
          <Heading id="hero-title" as="h1" size="hero">
            Creativity meets
            <br />
            engineering<span className="text-accent-detail">.</span>
          </Heading>

          <div className="grid-editorial gap-y-8">
            <Text size="lg" muted className="col-span-4 md:col-span-5 lg:col-span-5">
              {site.description}
            </Text>
            {showInternal ? (
              <div className="col-span-4 flex flex-wrap items-end gap-4 md:col-span-3 lg:col-span-5 lg:col-start-8 lg:justify-end">
                <Button href="/design-system" arrow>
                  Design System
                </Button>
                <Button href="/playground" variant="secondary">
                  Playground
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-span-full flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <p className="font-mono text-label text-muted uppercase">Etapa 1 — Foundation</p>
          <p className="font-mono text-label text-muted uppercase">
            Design System v1.1 · Dark Blue Edition
          </p>
        </div>
      </Container>
    </Section>
  );
}
