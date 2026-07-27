import type {
  CartaId,
  FragmentosDeTema,
  Posicion,
  Tema,
  WikiPorCarta,
} from '../content/types';

// Todo lo que el motor necesita de un idioma para resolver el texto de una
// carta en una tirada. Se arma con el paquete del idioma activo; el resolver no
// sabe en qué idioma trabaja.
export interface FuentesLectura {
  // Capa 3: fragmentos por tema (parciales por carta).
  fragmentos: Partial<Record<Tema, FragmentosDeTema>>;
  // Capa 2: fichas de Wiki, para caer al significado general si no hay fragmento.
  wiki: WikiPorCarta;
  // Último recurso, por posición, cuando una carta no tiene nada escrito aún.
  generico: Record<Posicion, string>;
}

// Elige un índice 0..n-1. Se inyecta para poder testear de forma determinista
// (en producción, azar).
export type Elegir = (n: number) => number;

const azar: Elegir = (n) => Math.floor(Math.random() * n);

// Escalera de fallback: baja hasta encontrar el mejor texto disponible, para
// que la app nunca quede sin nada que decir aunque el contenido esté a medias.
//   1. Fragmento específico del tema consultado (lo mejor).
//   2. Fragmento del tema 'general' (misma carta, encuadre neutro).
//   3. Significado de la Wiki para esa posición (bueno, más enciclopédico).
//   4. Texto genérico seguro (nunca se rompe).
export function resolverTextoLectura(
  fuentes: FuentesLectura,
  carta: CartaId,
  tema: Tema,
  posicion: Posicion,
  elegir: Elegir = azar,
): string {
  const especifico = fuentes.fragmentos[tema]?.[carta]?.[posicion];
  if (especifico && especifico.length > 0) {
    return especifico[elegir(especifico.length)];
  }

  const general = fuentes.fragmentos.general?.[carta]?.[posicion];
  if (general && general.length > 0) {
    return general[elegir(general.length)];
  }

  const ficha = fuentes.wiki[carta];
  if (ficha) {
    return ficha.significado[posicion];
  }

  return fuentes.generico[posicion];
}
