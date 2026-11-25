import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge precisa conhecer os tamanhos de texto do DS para não
 * confundir `text-h1` (font-size) com `text-fg` (cor) ao mesclar classes.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['hero', 'h1', 'h2', 'h3', 'body-lg', 'body', 'small', 'label'],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
