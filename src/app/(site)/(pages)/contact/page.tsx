import type { Metadata } from 'next';
import { briefingConfig, briefingDeliveryConfigured } from '@/config/briefing';
import { site } from '@/config/site';
import { ConnectionFigure } from '@/components/art/ConnectionFigure';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { BriefingForm } from './BriefingForm';

export const metadata: Metadata = {
  title: 'Contato',
  description:
    'Conte o que você quer construir: sites, sistemas, automações ou soluções de IA sob medida.',
};

/*
 * /contact — conversão. Faixa Signal com a headline e o formulário de briefing em Paper
 * (legibilidade). A coluna lateral é honesta sobre o estado do recebimento.
 */
export default function ContactPage() {
  const configured = briefingDeliveryConfigured();

  return (
    <>
      <Section
        theme="signal"
        data-motion-section="contact"
        aria-labelledby="contact-title"
        className="overflow-hidden"
      >
        <Container className="flex flex-col gap-12 lg:gap-16">
          <SectionLabel index="07">Contato</SectionLabel>
          <h1
            id="contact-title"
            className="font-display text-[clamp(3.25rem,11vw,11.5rem)] leading-[0.86] font-bold tracking-[-0.06em]"
          >
            <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
              <span data-reveal-line className="block">
                Let’s build
              </span>{' '}
            </span>
            <span className="-my-[0.14em] block overflow-x-visible overflow-y-clip py-[0.14em]">
              <span data-reveal-line className="block">
                something<span className="text-blue-light">.</span>
              </span>
            </span>
          </h1>
          <div className="grid-editorial items-end gap-y-10">
            <div className="col-span-full flex flex-col gap-4 md:col-span-5 lg:col-span-6">
              <p className="font-display text-h3 font-bold">
                Toda grande ideia começa com uma conexão.
              </p>
              <p className="max-w-lg text-body-lg text-muted">
                Conte o que você quer construir ou qual desafio precisa resolver. Quanto mais
                contexto, melhor a primeira conversa.
              </p>
            </div>
            <div className="col-span-3 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10">
              <ConnectionFigure labels={['Sua ideia', 'NODO']} caption="FIG. 007 — Conexão" />
            </div>
          </div>
        </Container>
      </Section>

      <Section theme="light" aria-labelledby="briefing-title">
        <Container className="grid-editorial gap-y-12">
          <aside className="col-span-full flex flex-col gap-8 lg:col-span-4">
            <div className="flex flex-col gap-4">
              <SectionLabel>Briefing</SectionLabel>
              <h2 id="briefing-title" className="font-display text-h2 font-bold">
                Sobre o projeto
              </h2>
            </div>

            {configured ? (
              <p className="text-body text-muted">
                Recebemos o briefing por este formulário e respondemos pelo e-mail informado.
              </p>
            ) : (
              <div className="flex flex-col gap-3 border-l-2 border-accent-detail py-1 pl-4">
                <p className="font-mono text-label text-accent-detail uppercase">
                  Recebimento indisponível no momento
                </p>
                <p className="text-small">
                  Este formulário já valida as informações, mas ainda não as envia nem armazena.
                  Quando o canal de recebimento estiver configurado, este aviso sai do ar.
                </p>
              </div>
            )}

            <dl className="flex flex-col divide-y divide-line border-y border-line text-small">
              <div className="flex flex-col gap-1 py-4">
                <dt className="font-mono text-label text-muted uppercase">O que fazemos</dt>
                <dd>{site.description}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4">
                <dt className="font-mono text-label text-muted uppercase">Seus dados</dt>
                <dd>Usados apenas para responder a este contato.</dd>
              </div>
              <div className="flex flex-col gap-1 py-4">
                <dt className="font-mono text-label text-muted uppercase">Outros canais</dt>
                <dd>
                  {site.contact.email ? (
                    <a href={`mailto:${site.contact.email}`} className="underline">
                      {site.contact.email}
                    </a>
                  ) : (
                    'E-mail e redes em breve.'
                  )}
                </dd>
              </div>
            </dl>
          </aside>

          <div className="col-span-full lg:col-span-7 lg:col-start-6">
            <BriefingForm options={briefingConfig} privacy={site.legal.privacy} />
          </div>
        </Container>
      </Section>
    </>
  );
}
