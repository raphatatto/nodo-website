import { SiteChrome } from '@/components/layout/SiteChrome';
import { Container } from '@/components/layout/Container';
import { Section } from '@/components/layout/Section';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { Text } from '@/components/ui/Text';

export default function NotFound() {
  return (
    <SiteChrome>
      <Section theme="light" className="flex min-h-[70svh] items-center">
        <Container className="flex flex-col gap-8">
          <SectionLabel index="404">Página não encontrada</SectionLabel>
          <Heading as="h1" size="h1">
            Esta conexão não existe.
          </Heading>
          <Text size="lg" muted>
            O endereço pode ter mudado ou a página ainda não foi publicada.
          </Text>
          <div>
            <Button href="/" arrow>
              Voltar ao início
            </Button>
          </div>
        </Container>
      </Section>
    </SiteChrome>
  );
}
