import Image from 'next/image';
import { ArrowDown } from 'lucide-react';
import { site } from '@/config/site';
import { KnotFigure } from '@/components/art/KnotFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';
import { FlowOrbits } from './FlowOrbits';
import { heroRender } from './render';

/*
 * 00 — Hero · "The Knot" (direção B aprovada na Etapa 2 — não redesenhar).
 * Promovido de src/experiments/hero-b/HeroB.tsx. Diferenças intencionais:
 * - sem header interno: o Header global (variante `overlay`) ocupa a mesma linha;
 * - CTAs com destino real (sem links para rotas inexistentes);
 * - ganchos de motion/cena (data-*) para as Etapas 5 e 6.
 */

function SceneObject() {
  if (!heroRender) {
    return <KnotFigure mode="chrome" rotation={[0.7, 0.2, 0.4]} className="size-full" />;
  }
  return (
    <>
      <Image
        src={heroRender.src}
        width={heroRender.width}
        height={heroRender.height}
        alt=""
        priority
        sizes="(min-width: 1024px) 95vw, 170vw"
        className="h-auto w-full"
      />
      {/* reflexo Navy: tinge só o metal (blend "color" preserva a luminância) */}
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_72%_68%,var(--nodo-navy)_0%,transparent_58%)] mix-blend-color" />
      <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_30%,var(--nodo-blue-light)_0%,transparent_40%)] opacity-40 mix-blend-color" />
    </>
  );
}

export function Hero() {
  const { primary, secondary } = site.cta;

  return (
    <Section
      theme="dark"
      spacing="none"
      data-motion-section="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      {/* profundidade: halo Blue Deep atrás do objeto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_55%_60%_at_64%_44%,var(--nodo-blue-deep)_0%,transparent_70%)]"
      />

      {/* objeto protagonista — "lighten" funde o preto do render ao Carbon.
          data-scene-anchor: posição do The Knot 3D (Etapa 6); a imagem vira o poster. */}
      <div
        aria-hidden="true"
        data-scene-anchor="knot-hero"
        data-parallax="0.12"
        className="pointer-events-none absolute top-[4svh] left-1/2 -z-10 w-[150vw] -translate-x-1/2 mix-blend-lighten md:w-[130vw] lg:top-[-4svh] lg:left-[18%] lg:w-[96vw] lg:max-w-[1900px] lg:translate-x-0"
      >
        <div data-scene-fallback className="nodo-float relative isolate">
          <SceneObject />
        </div>
      </div>

      <FlowOrbits />

      {/* legibilidade do texto na base */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-0 h-[55%] bg-gradient-to-t from-carbon via-carbon/70 to-transparent"
      />

      <div className="relative z-10 flex min-h-svh flex-col">
        {/* reserva a linha do Header overlay (mesma altura do header do Hero B) */}
        <div aria-hidden="true" className="min-h-20" />

        {/* legendas de figura presas às órbitas (desktop) */}
        <div aria-hidden="true" className="pointer-events-none relative hidden flex-1 lg:block">
          <p className="absolute top-[10%] left-[33%] font-mono text-label text-muted uppercase">
            O01 — The Knot
            <br />
            <span className="text-silver/60">Chrome · alumínio · esmalte Navy</span>
          </p>
          <p className="absolute top-[2%] right-[4%] text-right font-mono text-label text-muted uppercase">
            O04 — The Flow
            <br />
            <span className="text-silver/60">Sistemas em movimento</span>
          </p>
        </div>

        <Container className="mt-auto flex flex-col gap-10 pb-6">
          <div className="grid-editorial items-end gap-y-8">
            <div className="col-span-4 flex flex-col gap-5 md:col-span-6 lg:col-span-6">
              <SectionLabel index="00">{site.category}</SectionLabel>
              <h1 id="hero-title" className="font-display text-h1 font-bold">
                Creativity meets
                <br />
                engineering<span className="text-blue-light">.</span>
              </h1>
            </div>
            <div className="col-span-4 flex flex-col gap-6 md:col-span-6 lg:col-span-4 lg:col-start-9">
              <Text muted>{site.description}</Text>
              <div className="flex flex-wrap gap-3">
                {/* Sem /contact publicado, o CTA primário não aponta para rota inexistente. */}
                {primary.available ? (
                  <Button href={primary.href} arrow>
                    {primary.label}
                  </Button>
                ) : (
                  <Button arrow>{primary.label}</Button>
                )}
                <Button href={secondary.available ? secondary.href : '#work'} variant="secondary">
                  {secondary.label}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-line pt-4 font-mono text-label text-muted uppercase">
            <span className="inline-flex items-center gap-2">
              <ArrowDown aria-hidden="true" strokeWidth={1.5} className="size-3.5" />
              Role para explorar
            </span>
            <span className="hidden sm:inline">FIG. O01 — Estudo de material</span>
            {heroRender ? (
              <span className="hidden lg:inline">
                Render: {heroRender.credit.author} / Unsplash
              </span>
            ) : null}
          </div>
        </Container>
      </div>
    </Section>
  );
}
