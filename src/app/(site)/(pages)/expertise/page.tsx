import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/content/projects';
import { expertiseIntro, services } from '@/content/services';
import { process } from '@/content/studio';
import { ServiceObject } from '@/components/art/objects/ServiceObject';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { ContactCta } from '@/components/sections/ContactCta';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Tag } from '@/components/ui/Tag';
import { cn } from '@/lib/cn';

export const metadata: Metadata = {
  title: 'Serviços',
  description:
    'Web Experiences, Digital Products, Automation e Artificial Intelligence: o que a NODO constrói, entregáveis e problemas que resolve.',
};

/*
 * /expertise — aprofunda a Expertise da Home: um capítulo por serviço, alternando
 * Paper e Carbon, com o objeto NODO do serviço, entregáveis, necessidade/valor (DS §01),
 * o primeiro passo do processo e o estudo conceitual relacionado.
 */
export default function ExpertisePage() {
  const discover = process.steps[0];

  return (
    <>
      <Section theme="dark" aria-labelledby="expertise-title">
        <Container className="flex flex-col gap-14">
          <div className="grid-editorial items-end gap-y-8">
            <div className="col-span-full flex flex-col gap-8 lg:col-span-8">
              <SectionLabel>Expertise</SectionLabel>
              <h1
                id="expertise-title"
                className="font-display text-[clamp(3.25rem,11vw,11.5rem)] leading-[0.85] font-bold tracking-[-0.055em]"
              >
                Built to solve<span className="text-accent-detail">.</span>
              </h1>
            </div>
            <p className="col-span-full text-body-lg text-muted md:col-span-6 lg:col-span-4 lg:col-start-9 lg:pb-4">
              {expertiseIntro}
            </p>
          </div>
          {/* sumário dos capítulos */}
          <nav aria-label="Serviços nesta página">
            <ol className="grid border-t border-line md:grid-cols-4">
              {services.map((s) => (
                <li key={s.id} className="border-b border-line md:border-r md:last:border-r-0">
                  <a
                    href={`#${s.id}`}
                    className="flex min-h-control flex-col gap-1 py-4 transition-colors duration-fast hover:text-accent-detail md:px-4 md:first:pl-0"
                  >
                    <span className="font-mono text-label text-muted">{s.index}</span>
                    <span className="font-display text-body-lg font-bold">{s.name}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Container>
      </Section>

      {services.map((s, i) => {
        const related = projects.find((p) => p.service === s.name);
        const flip = i % 2 === 1;
        return (
          <Section
            key={s.id}
            id={s.id}
            theme={flip ? 'dark' : 'light'}
            aria-labelledby={`${s.id}-title`}
            className="scroll-mt-0"
          >
            <Container className="grid-editorial items-start gap-y-12">
              <div
                className={cn(
                  'col-span-full flex flex-col gap-8 lg:col-span-6',
                  flip && 'lg:col-start-7 lg:row-start-1',
                )}
              >
                <div className="flex flex-col gap-3">
                  <span className="font-mono text-label text-muted">
                    {s.index} / {String(services.length).padStart(2, '0')}
                  </span>
                  <h2
                    id={`${s.id}-title`}
                    className="font-display text-[clamp(2.5rem,6vw,6rem)] leading-[0.9] font-bold tracking-[-0.05em]"
                  >
                    {s.name}
                  </h2>
                  <p className="font-mono text-label text-muted uppercase">{s.description}</p>
                </div>
                <p className="max-w-xl text-body-lg">{s.summary}</p>

                <dl className="grid max-w-xl grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-y border-line py-5 text-body">
                  <dt className="font-mono text-label text-muted uppercase">Necessidade</dt>
                  <dd>{s.need}</dd>
                  <dt className="font-mono text-label text-muted uppercase">Valor</dt>
                  <dd>{s.value}</dd>
                </dl>

                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-label font-normal text-muted uppercase">
                    Entregáveis
                  </h3>
                  <ul className="flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d}>
                        <Tag>{d}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex max-w-xl flex-col gap-2">
                  <h3 className="font-mono text-label font-normal text-muted uppercase">
                    Como começamos
                  </h3>
                  <p className="text-body">
                    Pelo {discover.name}: {discover.text.toLowerCase().replace(/\.$/, '')} —{' '}
                    {discover.detail.toLowerCase()}
                  </p>
                </div>

                {related ? (
                  <Link
                    href={`/work/${related.slug}`}
                    prefetch
                    className="group/rel flex max-w-xl items-center gap-5 border-t border-line pt-5"
                  >
                    <span className="relative block aspect-[4/3] w-28 shrink-0 overflow-hidden bg-carbon">
                      <Image
                        src={related.cover.src}
                        alt=""
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </span>
                    <span className="flex flex-col gap-1">
                      <span className="font-mono text-label text-muted uppercase">
                        Estudo conceitual relacionado
                      </span>
                      <span className="font-display text-body-lg font-bold transition-colors duration-fast group-hover/rel:text-accent-detail">
                        {related.title} <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                  </Link>
                ) : null}
              </div>

              <figure
                aria-hidden="true"
                className={cn(
                  'col-span-full flex flex-col gap-4 md:col-span-6 lg:sticky lg:top-24 lg:col-span-5',
                  flip ? 'lg:col-start-1 lg:row-start-1' : 'lg:col-start-8',
                )}
              >
                <ServiceObject id={s.object.id} scope={`page-${s.id}`} />
                <figcaption className="flex flex-wrap justify-between gap-x-4 gap-y-1 font-mono text-label text-muted uppercase">
                  <span>
                    Object {s.object.code.slice(1)} — {s.object.name}
                  </span>
                  <span>{s.object.material}</span>
                </figcaption>
              </figure>
            </Container>
          </Section>
        );
      })}

      <ContactCta index={null} />
    </>
  );
}
