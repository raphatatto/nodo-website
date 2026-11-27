import type { ServiceObjectId } from '@/content/services';
import { ExperienceObject } from './ExperienceObject';
import { FlowObject } from './FlowObject';
import { IntelligenceObject } from './IntelligenceObject';
import { StructureObject } from './StructureObject';

/**
 * Objeto NODO associado a um serviço (DS §07). `scope` diferencia os IDs de gradiente
 * do The Structure quando ele aparece mais de uma vez na página.
 */
export function ServiceObject({ id, scope }: { id: ServiceObjectId; scope: string }) {
  switch (id) {
    case 'experience':
      return <ExperienceObject />;
    case 'structure':
      return <StructureObject id={`structure-${scope}`} />;
    case 'flow':
      return <FlowObject />;
    case 'intelligence':
      return <IntelligenceObject />;
  }
}
