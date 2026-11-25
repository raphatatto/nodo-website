/**
 * Rotas internas (/design-system, /playground) ficam disponíveis em desenvolvimento.
 * Em produção, só com ENABLE_INTERNAL_ROUTES=true (ex.: em um preview protegido).
 */
export function internalRoutesEnabled(): boolean {
  return process.env.NODE_ENV !== 'production' || process.env.ENABLE_INTERNAL_ROUTES === 'true';
}

export const INTERNAL_ROUTES = ['/design-system', '/playground'] as const;
