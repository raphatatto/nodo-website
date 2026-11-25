import type { MetadataRoute } from 'next';
import { INTERNAL_ROUTES } from '@/lib/internal';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [...INTERNAL_ROUTES],
    },
  };
}
