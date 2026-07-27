import type { CartaId } from '../types';

// Consejo del día por carta (español). Parcial: se completa carta por carta,
// como las fichas de la Wiki. Las que falten caen al genérico (ver más abajo),
// así la pantalla nunca queda sin nada que decir.
//
// Tono: un consejo breve, cálido y accionable para hoy — habla de tú/vos neutro,
// reflexivo, nunca adivinatorio.
export const CONSEJOS_ES: Partial<Record<CartaId, string>> = {
  'mayor-00': 'Anímate a dar ese primer paso que vienes posponiendo. No necesitas ver el camino entero: alcanza con empezar con curiosidad y confianza.',
  'mayor-19': 'Deja que las cosas se muestren a plena luz. Hoy es un buen día para celebrar lo simple y compartir tu energía sin apuro.',
};

// Último recurso, para una carta que todavía no tiene su consejo escrito.
export const CONSEJO_GENERICO_ES =
  'Tómate un momento para mirar esta carta con calma y preguntarte qué te está mostrando hoy.';
