import AsyncStorage from '@react-native-async-storage/async-storage';

import { CARTAS } from '../content/cartas/meta';
import type { CartaId } from '../content/types';
import { fechaDeHoy } from './fecha';

const CLAVE_ALMACENAMIENTO = 'tarot:consejoDelDia';

interface ConsejoGuardado {
  fecha: string;
  cartaId: CartaId;
}

// Carta del consejo de hoy si ya fue elegida (quemada), o null si todavía se
// puede elegir. Mismo anti-atraso-de-reloj que las gemas: si el reloj del
// dispositivo retrocedió, sigue contando como el mismo día ya guardado.
export async function cartaDelConsejoDeHoy(): Promise<CartaId | null> {
  const hoy = fechaDeHoy();
  const guardado = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);
  if (guardado) {
    const estado: ConsejoGuardado = JSON.parse(guardado);
    if (estado.fecha === hoy || hoy < estado.fecha) {
      return estado.cartaId;
    }
  }
  return null;
}

// Fija la carta elegida como el consejo de hoy (queda "quemada" hasta mañana).
export async function guardarConsejoDeHoy(cartaId: CartaId): Promise<void> {
  await AsyncStorage.setItem(
    CLAVE_ALMACENAMIENTO,
    JSON.stringify({ fecha: fechaDeHoy(), cartaId }),
  );
}

// Tres cartas distintas al azar para ofrecer a elegir. `aleatorio` se inyecta
// para poder testear de forma determinista.
export function tresParaConsejo(aleatorio: () => number = Math.random): CartaId[] {
  const ids: CartaId[] = CARTAS.map((c) => c.id);
  for (let i = 0; i < 3; i++) {
    const j = i + Math.floor(aleatorio() * (ids.length - i));
    [ids[i], ids[j]] = [ids[j], ids[i]];
  }
  return ids.slice(0, 3);
}

// Texto del consejo de una carta, con fallback al genérico si aún no está escrito.
export function textoConsejo(
  cartaId: CartaId,
  consejos: Partial<Record<CartaId, string>>,
  generico: string,
): string {
  return consejos[cartaId] ?? generico;
}
