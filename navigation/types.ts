import type { CartaId, Tema } from '../content/types';
import type { CartaTirada } from '../lib/tirarCruz';

export type RootStackParamList = {
  Home: undefined;
  // La pregunta escrita y el tópico elegido viajan por el flujo para que la
  // lectura (cuando se conecte el motor) los tenga a mano.
  Pregunta: undefined;
  Tirada: { pregunta: string; tema: Tema };
  Lectura: { cartas: CartaTirada[]; pregunta: string };
  Wiki: undefined;
  WikiDetalle: { cartaId: CartaId };
  ConsejoDelDia: undefined;
  Ajustes: undefined;
};
