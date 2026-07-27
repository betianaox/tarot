import type { IdiomaConcreto } from './paquete';
import type { NombresPack, WikiPorCarta } from './types';
import { NOMBRES_ES } from './es/nombres';
import { WIKI_MAYORES_ES } from './es/wiki/mayores';

// Todo el contenido de cartas que dependen de idioma, para la Wiki: nombres +
// fichas. El motor de lecturas usa su propio ensamblado (content/es/index.ts).
export interface PaqueteCartas {
  nombres: NombresPack;
  wiki: WikiPorCarta;
}

const es: PaqueteCartas = {
  nombres: NOMBRES_ES,
  wiki: { ...WIKI_MAYORES_ES },
};

// en/it/pt caen a español hasta que se traduzcan.
const PAQUETES: Partial<Record<IdiomaConcreto, PaqueteCartas>> = { es };

export function paqueteCartas(idioma: IdiomaConcreto): PaqueteCartas {
  return PAQUETES[idioma] ?? es;
}
