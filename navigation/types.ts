import type { CartaId } from '../content/types';

export type RootStackParamList = {
  Home: undefined;
  Pregunta: undefined;
  Wiki: undefined;
  WikiDetalle: { cartaId: CartaId };
  ConsejoDelDia: undefined;
  Ajustes: undefined;
};
