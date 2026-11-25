import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { internalRoutesEnabled } from '@/lib/internal';

/**
 * Rotas internas de validação e experimentação.
 * - Nunca indexadas (noindex + Disallow em robots.ts).
 * - Em produção retornam 404, salvo ENABLE_INTERNAL_ROUTES=true.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function InternalLayout({ children }: { children: React.ReactNode }) {
  if (!internalRoutesEnabled()) notFound();
  return children;
}
