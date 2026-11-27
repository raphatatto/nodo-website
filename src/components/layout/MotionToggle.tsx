'use client';

import { useSyncExternalStore } from 'react';
import { MOTION_STORAGE_KEY as KEY } from '@/lib/motion';

/**
 * Controle global "Reduzir movimento" (WCAG 2.2.2): pausa as animações contínuas
 * (flutuação do objeto, órbitas, espécime) e zera as durações dos tokens.
 * Grava em localStorage e aplica `html[data-motion="reduced"]`; o script inline do
 * layout raiz (`motionPreferenceScript`, src/lib/motion.ts) reaplica antes da pintura.
 */

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-motion'],
  });
  return () => observer.disconnect();
}

const getSnapshot = () => document.documentElement.dataset.motion === 'reduced';
const getServerSnapshot = () => false;

export function MotionToggle() {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = !reduced;
    if (next) document.documentElement.dataset.motion = 'reduced';
    else delete document.documentElement.dataset.motion;
    try {
      if (next) localStorage.setItem(KEY, 'reduced');
      else localStorage.removeItem(KEY);
    } catch {
      // armazenamento indisponível: vale só para esta visita
    }
  };

  return (
    <button
      type="button"
      aria-pressed={reduced}
      onClick={toggle}
      className="inline-flex min-h-control items-center gap-2 font-mono text-label text-muted uppercase transition-colors duration-fast hover:text-fg"
    >
      <span
        aria-hidden="true"
        className="relative inline-block h-3 w-6 rounded-pill border border-control"
      >
        <span
          className={`absolute top-1/2 size-1.5 -translate-y-1/2 rounded-pill bg-fg transition-[left] duration-fast ${reduced ? 'left-[calc(100%-0.5rem)]' : 'left-0.5'}`}
        />
      </span>
      Reduzir movimento
    </button>
  );
}
