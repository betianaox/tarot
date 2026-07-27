import type { IdiomaConcreto } from './paquete';
import type { CartaId, NombresPack, WikiPorCarta } from './types';
import { CONSEJOS_ES, CONSEJO_GENERICO_ES } from './es/consejos';
import { NOMBRES_ES } from './es/nombres';
import { WIKI_MAYORES_ES } from './es/wiki/mayores';

// Todo el contenido de cartas que depende de idioma, para la Wiki y el Consejo
// del día: nombres, fichas y consejos. El motor de lecturas usa su propio
// ensamblado (content/es/index.ts).
export interface PaqueteCartas {
  nombres: NombresPack;
  wiki: WikiPorCarta;
  // Consejo del día por carta (parcial); las que falten usan consejoGenerico.
  consejos: Partial<Record<CartaId, string>>;
  consejoGenerico: string;
}

const es: PaqueteCartas = {
  nombres: NOMBRES_ES,
  wiki: { ...WIKI_MAYORES_ES },
  consejos: CONSEJOS_ES,
  consejoGenerico: CONSEJO_GENERICO_ES,
};

// en/it/pt caen a español hasta que se traduzcan.
const PAQUETES: Partial<Record<IdiomaConcreto, PaqueteCartas>> = { es };

export function paqueteCartas(idioma: IdiomaConcreto): PaqueteCartas {
  return PAQUETES[idioma] ?? es;
}
