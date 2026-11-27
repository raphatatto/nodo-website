import { ContactCta } from '@/components/sections/ContactCta';
import { Expertise } from '@/components/sections/Expertise';
import { Hero } from '@/components/sections/hero/Hero';
import { Introduction } from '@/components/sections/Introduction';
import { Labs } from '@/components/sections/Labs';
import { Process } from '@/components/sections/Process';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { Studio } from '@/components/sections/Studio';

/**
 * Home — Etapa 4. Ordem e temas (página de revista):
 * 00 Hero (Carbon) · 01 Introduction (Paper) · 02 Selected Work (Paper) · 03 Expertise (Carbon) ·
 * 04 Process (Paper) · 05 Labs (Carbon) · 06 Studio (Paper) · 07 Contact (Navy) · Footer (Carbon).
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <SelectedWork />
      <Expertise />
      <Process />
      <Labs />
      <Studio />
      <ContactCta />
    </>
  );
}
