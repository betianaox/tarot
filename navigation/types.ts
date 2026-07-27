import type { CartaId } from '../content/types';
import type { CartaTirada } from '../lib/tirarCruz';

export type RootStackParamList = {
  Home: undefined;
  Pregunta: undefined;
  Lectura: { cartas: CartaTirada[] };
  Wiki: undefined;
  WikiDetalle: { cartaId: CartaId };
  ConsejoDelDia: undefined;
  Ajustes: undefined;
};
