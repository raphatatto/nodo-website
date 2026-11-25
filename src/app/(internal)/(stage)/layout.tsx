import { ProposalSwitcher } from '@/experiments/shared/ProposalSwitcher';
import '@/experiments/shared/experiments.css';

/**
 * Palco das propostas de Hero: sem o Header/Footer do site, para que cada
 * direção controle a própria composição da primeira dobra.
 */
export default function StageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <ProposalSwitcher />
    </>
  );
}
