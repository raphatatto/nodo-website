import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { ArrowDown, Menu } from 'lucide-react';
import tokens from '@ds/tokens.json';
import { cn } from '@/lib/cn';
import { Container } from '@/components/layout/Container';
import { Section, type Theme } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { IconButton } from '@/components/ui/IconButton';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { Text } from '@/components/ui/Text';
import { TextField } from '@/components/ui/TextField';

export const metadata: Metadata = { title: 'Design System' };

/*
 * Ambiente interno de validação visual. Valores exibidos vêm de NODO/tokens.json
 * (fonte canônica) — nada é duplicado aqui.
 */

const brandColors = tokens.color.tokens.filter(
  (t): t is { name: string; value: string; usage: string } =>
    t.name.startsWith('nodo-') && typeof t.value === 'string' && t.value.startsWith('#'),
);

const themes: { id: Theme; name: string; note: string }[] = [
  { id: 'light', name: 'Light', note: 'Paper · Carbon · CTA Navy' },
  { id: 'dark', name: 'Dark', note: 'Carbon · Paper · CTA Navy + Blue Light' },
  { id: 'signal', name: 'Signal', note: 'Navy · Paper · CTA Paper/Navy' },
];

const typeScale = [
  {
    cls: 'text-hero font-display font-bold',
    name: 'Hero / Display',
    spec: '--type-hero · 48→144px',
  },
  { cls: 'text-h1 font-display font-bold', name: 'H1', spec: '--type-h1 · 44→96px' },
  { cls: 'text-h2 font-display font-bold', name: 'H2', spec: '--type-h2 · 36→72px' },
  { cls: 'text-h3 font-display font-bold', name: 'H3', spec: '--type-h3 · 24→40px' },
  { cls: 'text-body-lg', name: 'Body Large', spec: '--type-body-lg · 18→22px' },
  { cls: 'text-body', name: 'Body', spec: '--type-body · 16px' },
  { cls: 'text-small', name: 'Small', spec: '--type-small · 14px' },
  { cls: 'font-mono text-label uppercase', name: 'Mono Label', spec: '--type-label · 12px' },
];

function Block({
  index,
  label,
  title,
  theme = 'light',
  children,
}: {
  index: string;
  label: string;
  title: string;
  theme?: Theme;
  children: ReactNode;
}) {
  const id = `ds-${index}`;
  return (
    <Section theme={theme} aria-labelledby={id} className="border-t border-line">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <SectionLabel index={index}>{label}</SectionLabel>
          <Heading id={id} size="h2">
            {title}
          </Heading>
        </div>
        {children}
      </Container>
    </Section>
  );
}

function ComponentSet() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button arrow>Iniciar um projeto</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="text" arrow>
          Text link
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button loading>Enviando</Button>
        <Button disabled>Disabled</Button>
        <IconButton aria-label="Menu (exemplo)">
          <Menu strokeWidth={1.5} aria-hidden="true" />
        </IconButton>
        <IconButton aria-label="Rolar (exemplo)">
          <ArrowDown strokeWidth={1.5} aria-hidden="true" />
        </IconButton>
      </div>
      <div className="flex flex-wrap gap-2">
        <Tag>Web Experiences</Tag>
        <Tag>Next.js</Tag>
        <Tag>Conceito</Tag>
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <Section theme="light" aria-labelledby="ds-title">
        <Container className="flex flex-col gap-8">
          <SectionLabel index="DS">Interno · não indexado</SectionLabel>
          <Heading id="ds-title" as="h1" size="h1">
            Design System
          </Heading>
          <Text size="lg" muted>
            Validação visual dos tokens, temas e componentes da NODO — Editorial Futurism, v1.1 Dark
            Blue Edition. Fonte canônica: <code className="font-mono">NODO/README.md</code> e{' '}
            <code className="font-mono">NODO/tokens.css</code>.
          </Text>
        </Container>
      </Section>

      <Block index="01" label="Cores" title="Paleta Dark Blue Edition">
        <ul className="grid grid-cols-2 gap-grid md:grid-cols-4 lg:grid-cols-6">
          {brandColors.map((color) => (
            <li key={color.name} className="flex flex-col gap-3">
              <span
                className="aspect-[4/3] border border-line"
                style={{ backgroundColor: `var(--${color.name})` }}
              />
              <span className="flex flex-col">
                <span className="text-small font-medium">--{color.name}</span>
                <span className="font-mono text-label text-muted uppercase">{color.value}</span>
              </span>
            </li>
          ))}
        </ul>
        <Text size="small" muted>
          Proporção de referência: 45% Paper · 40% Carbon · 10% neutros · 5% azul. Verde e vermelho
          apenas como feedback semântico (erro/sucesso), nunca como marca.
        </Text>
      </Block>

      <Block index="02" label="Temas" title="Light · Dark · Signal">
        <div className="grid gap-grid lg:grid-cols-3">
          {themes.map((theme) => (
            <div
              key={theme.id}
              data-theme={theme.id}
              className="flex flex-col gap-8 border border-line p-8"
            >
              <div className="flex flex-col gap-3">
                <SectionLabel>{theme.note}</SectionLabel>
                <Heading as="h3" size="h3">
                  {theme.name}
                </Heading>
                <Text muted size="small">
                  Texto secundário em <span className="text-accent-detail">accent-detail</span>.
                </Text>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button arrow>Primary</Button>
                <Button variant="secondary">Secondary</Button>
              </div>
              <TextField label="E-mail" type="email" placeholder="voce@empresa.com" />
              <TextField label="Empresa" error="Informe o nome da empresa." />
            </div>
          ))}
        </div>
      </Block>

      <Block index="03" label="Tipografia" title="Escala fluida" theme="dark">
        <ul className="flex flex-col divide-y divide-line border-y border-line">
          {typeScale.map((item) => (
            <li key={item.name} className="grid-editorial items-baseline gap-y-2 py-6">
              <span className="col-span-4 flex flex-col gap-1 md:col-span-2 lg:col-span-3">
                <span className="font-mono text-label uppercase">{item.name}</span>
                <span className="font-mono text-label text-muted">{item.spec}</span>
              </span>
              <span className={cn('col-span-4 md:col-span-6 lg:col-span-9', item.cls)}>
                {item.name.startsWith('H')
                  ? 'Creativity meets engineering.'
                  : 'Tudo começa com uma conexão.'}
              </span>
            </li>
          ))}
        </ul>
        <Text size="small" muted>
          Space Grotesk (display) · Geist (interface e corpo) · IBM Plex Mono (metadados).
        </Text>
      </Block>

      <Block index="04" label="Componentes" title="Base reutilizável">
        <ComponentSet />
        <div className="grid gap-grid md:grid-cols-2">
          <TextField label="Nome" hint="Como prefere ser chamado." autoComplete="name" />
          <TextField label="Campo desabilitado" disabled defaultValue="Indisponível" />
          <TextField
            multiline
            className="md:col-span-2"
            label="Descreva a necessidade"
            hint="Placeholder não substitui o label."
          />
        </div>
      </Block>

      <Block index="05" label="Layout" title="Grid 4 / 8 / 12" theme="dark">
        <div className="grid-editorial gap-y-grid">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={cn(
                'flex h-24 items-end bg-surface p-2 font-mono text-label text-muted',
                i >= 4 && i < 8 && 'hidden md:flex',
                i >= 8 && 'hidden lg:flex',
              )}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
          ))}
        </div>
        <ul className="flex flex-col gap-3">
          {tokens.spacing.tokens.map((space) => (
            <li key={space.name} className="flex items-center gap-4">
              <span className="w-24 shrink-0 font-mono text-label text-muted uppercase">
                {space.name}
              </span>
              <span className="h-2 bg-blue-light" style={{ width: `var(--${space.name})` }} />
              <span className="font-mono text-label text-muted">{space.usage}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block index="06" label="Motion" title="Duração e curva" theme="signal">
        <ul className="grid gap-grid md:grid-cols-2 lg:grid-cols-4">
          {tokens.duration.tokens.map((d) => (
            <li key={d.name} className="group flex flex-col gap-4 border border-line p-6">
              <span className="font-mono text-label uppercase">
                --{d.name} · {d.value}
              </span>
              <span className="relative block h-px bg-line">
                <span
                  className="absolute top-1/2 left-0 size-3 -translate-y-1/2 rounded-pill bg-paper transition-[left] ease-out group-hover:left-[calc(100%-0.75rem)]"
                  style={{ transitionDuration: `var(--${d.name})` }}
                />
              </span>
              <span className="text-small text-muted">{d.usage}</span>
            </li>
          ))}
        </ul>
        <Text size="small" muted>
          Curva principal <code className="font-mono">--ease-out</code>: cubic-bezier(.22, 1, .36,
          1). Passe o cursor sobre os cartões. Com prefers-reduced-motion, as durações vão a 0 ms.
        </Text>
      </Block>
    </>
  );
}
