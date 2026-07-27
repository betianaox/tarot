import type { FragmentosDeTema } from '../../types';

// Fragmentos del tema 'general' en español (Capa 3). Cláusulas cortas pensadas
// para encajar tras un conector: "la carta señala {fragmento}". Tres variantes
// por posición para que la misma carta no suene siempre igual.
//
// El tema 'general' es también el escalón de fallback: si una carta no tiene
// fragmentos de amor/trabajo/dinero, la tirada usa los de acá (ver resolverCarta).
export const FRAGMENTOS_GENERAL_ES: FragmentosDeTema = {
  'mayor-00': {
    normal: [
      'un comienzo que pide confianza más que certezas',
      'el impulso de dar el primer paso aunque no se vea el camino entero',
      'una hoja en blanco donde elegir sin arrastrar lo viejo',
    ],
    invertida: [
      'el freno de mirar tanto el abismo que no se arranca',
      'un salto dado sin mirar que conviene revisar',
      'ganas de no arriesgar disfrazadas de prudencia',
    ],
  },
};
