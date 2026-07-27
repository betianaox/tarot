import { CARTAS } from '../content/cartas/meta';
import type { CartaId, Posicion } from '../content/types';

// Una carta tal como sale en la tirada: su identidad y si cayó derecha o
// invertida (la orientación cambia el texto de la lectura).
export interface CartaTirada {
  id: CartaId;
  posicion: Posicion;
}

// Las invertidas salen menos seguido, para que no aparezcan demasiadas juntas.
const PROB_INVERTIDA = 0.25;

// Reparte las 5 cartas de la cruz: únicas y en orden de slot
// (0=pos1, 1=pos2, 2=pos3, 3=pos4 arriba, 4=pos5 abajo). `aleatorio` se
// inyecta para poder testear de forma determinista.
export function tirarCruz(aleatorio: () => number = Math.random): CartaTirada[] {
  const ids: CartaId[] = CARTAS.map((c) => c.id);

  // Fisher-Yates parcial: mezcla solo lo necesario para sacar 5 únicas.
  for (let i = 0; i < 5; i++) {
    const j = i + Math.floor(aleatorio() * (ids.length - i));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }

  return ids.slice(0, 5).map((id): CartaTirada => ({
    id,
    posicion: aleatorio() < PROB_INVERTIDA ? 'invertida' : 'normal',
  }));
}
