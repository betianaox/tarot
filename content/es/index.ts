import type { FuentesLectura } from '../../lib/resolverCarta';
import { FRAGMENTOS_GENERAL_ES } from './fragmentos/general';
import { GENERICO_ES } from './generico';
import { WIKI_MAYORES_ES } from './wiki/mayores';

// Paquete de contenido en español: reúne las tres fuentes que el motor necesita.
// A medida que se sumen temas (amor/trabajo/dinero) y grupos de Wiki (menores,
// por palo), se agregan acá sin tocar el motor.
export const FUENTES_ES: FuentesLectura = {
  fragmentos: {
    general: FRAGMENTOS_GENERAL_ES,
  },
  wiki: {
    ...WIKI_MAYORES_ES,
  },
  generico: GENERICO_ES,
};
