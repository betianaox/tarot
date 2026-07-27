import type { CartaId } from '../types';

import mayor00 from '../../assets/cards/00-the-fool.webp';
import mayor01 from '../../assets/cards/01-the-magician.webp';
import mayor02 from '../../assets/cards/02-the-high-priestess.webp';
import mayor03 from '../../assets/cards/03-the-empress.webp';
import mayor04 from '../../assets/cards/04-the-emperor.webp';

// Mapa id → asset de la carta. Se usan imports estáticos (no require) para que
// las herramientas de test puedan interceptar el asset por su especificador.
//
// Parcial a propósito: solo las cartas ya dibujadas están acá. Las que faltan
// no tienen entrada y CartaMeta.imagen queda en null → la app muestra el dorso.
// A medida que entran los webp (mismos nombres NN-en-ingles), se agregan líneas.
export const IMAGENES: Partial<Record<CartaId, number>> = {
  'mayor-00': mayor00,
  'mayor-01': mayor01,
  'mayor-02': mayor02,
  'mayor-03': mayor03,
  'mayor-04': mayor04,
};
