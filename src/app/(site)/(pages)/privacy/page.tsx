import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { briefingDeliveryConfigured } from '@/config/briefing';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { SectionLabel } from '@/components/ui/SectionLabel';

export const metadata: Metadata = {
  title: 'Privacidade',
  description: 'Como o site da NODO trata dados pessoais — versão preliminar.',
  // Preliminar: fora dos buscadores até a validação jurídica.
  robots: { index: false, follow: true },
};

/*
 * /privacy — política PRELIMINAR, descrita a partir do funcionamento real do site (Etapa 4):
 * sem analytics nem cookies de rastreamento; fontes servidas pelo próprio site (next/font);
 * hospedagem Vercel; briefing sem envio enquanto BRIEFING_WEBHOOK_URL não existir;
 * preferência "Reduzir movimento" só no localStorage. Itens jurídicos marcados [a confirmar].
 */

function Pending({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded-sm bg-border-light px-1 font-mono text-[0.85em] text-carbon">
      [a confirmar: {children}]
    </mark>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid-editorial gap-y-4 border-t border-line pt-8">
      <h2 className="col-span-full font-display text-h3 font-bold md:col-span-3 lg:col-span-4">
        {title}
      </h2>
      <div className="col-span-full flex max-w-2xl flex-col gap-4 text-body md:col-span-5 lg:col-span-7 lg:col-start-6">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  const delivery = briefingDeliveryConfigured();

  return (
    <Section theme="light" aria-labelledby="privacy-title">
      <Container className="flex flex-col gap-14">
        <div className="flex flex-col gap-8">
          <SectionLabel>Legal</SectionLabel>
          <h1
            id="privacy-title"
            className="font-display text-[clamp(2.75rem,7vw,7rem)] leading-[0.9] font-bold tracking-[-0.05em]"
          >
            Política de Privacidade<span className="text-navy">.</span>
          </h1>
          <p className="max-w-3xl border-l-2 border-accent-detail py-1 pl-4 text-body">
            <strong className="font-medium">
              Versão preliminar, pendente de validação jurídica.
            </strong>{' '}
            Este texto descreve como o site funciona hoje. Os dados do responsável pelo tratamento,
            a base legal, os prazos e os serviços de recebimento ainda precisam ser confirmados
            antes de esta política ser considerada definitiva.
          </p>
        </div>

        <Block title="Quem somos">
          <p>
            Este site pertence à NODO, estúdio independente de tecnologia. Responsável pelo
            tratamento: <Pending>razão social e CNPJ</Pending>. Contato para assuntos de
            privacidade: <Pending>e-mail do encarregado</Pending>.
          </p>
        </Block>

        <Block title="Navegação">
          <p>
            O site não usa ferramentas de analytics, pixels de publicidade nem cookies de
            rastreamento. As fontes são servidas pelo próprio site, sem chamadas a serviços de
            terceiros durante a navegação.
          </p>
          <p>
            A hospedagem é feita pela Vercel, que pode registrar dados técnicos das requisições
            (como endereço IP e navegador) para operação e segurança, conforme a política da própria
            Vercel.
          </p>
          <p>
            A preferência “Reduzir movimento”, quando ativada, fica salva apenas no seu navegador
            (armazenamento local) e não é enviada a nós.
          </p>
        </Block>

        <Block title="Formulário de briefing">
          <p>
            Em{' '}
            <Link href="/contact" className="underline underline-offset-4">
              Contato
            </Link>
            , você pode informar nome, empresa (opcional), e-mail, tipo de projeto, orçamento e
            prazo (opcionais) e a descrição do projeto. Esses dados servem apenas para responder ao
            seu contato e preparar uma proposta.
          </p>
          {delivery ? (
            <p>
              Os dados enviados são encaminhados para <Pending>serviço de recebimento</Pending> e
              não são usados para outra finalidade.
            </p>
          ) : (
            <p>
              <strong className="font-medium">
                Hoje, o formulário não envia nem armazena dados:
              </strong>{' '}
              as informações são validadas e descartadas, e o site informa que o recebimento ainda
              não está disponível. Quando o recebimento for ativado, esta seção indicará o serviço
              utilizado.
            </p>
          )}
          <p>
            Base legal do tratamento: <Pending>base legal (LGPD, art. 7º)</Pending>. Prazo de
            guarda: <Pending>retenção</Pending>.
          </p>
        </Block>

        <Block title="Compartilhamento">
          <p>
            Não vendemos dados pessoais. Os dados podem ser tratados por fornecedores que operam o
            site — hospedagem (Vercel) e, quando ativado, o serviço de recebimento do briefing —{' '}
            <Pending>lista de operadores</Pending>.
          </p>
        </Block>

        <Block title="Seus direitos">
          <p>
            Pela Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação do
            tratamento, acesso, correção, anonimização ou eliminação dos seus dados, além de
            informações sobre compartilhamento e revogação de consentimento, quando aplicável.
          </p>
          <p>
            Para exercer esses direitos: <Pending>canal de atendimento</Pending>.
          </p>
        </Block>

        <Block title="Alterações">
          <p>
            Esta política será atualizada quando o funcionamento do site mudar — por exemplo, ao
            ativar o recebimento do briefing ou adotar novas ferramentas. Última revisão:{' '}
            <Pending>data de publicação</Pending>.
          </p>
        </Block>
      </Container>
    </Section>
  );
}
