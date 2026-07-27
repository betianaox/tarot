import type { WikiPorCarta } from '../../types';

// Wiki de los Arcanos Mayores en español. Parcial: se completa carta por carta.
// El Loco queda como referencia de tono — reflexivo y didáctico (enseña a leer
// la imagen), nunca adivinatorio, en línea con el disclaimer de la app.
export const WIKI_MAYORES_ES: WikiPorCarta = {
  'mayor-00': {
    nombre: 'El Loco',
    palabrasClave: {
      normal: ['comienzos', 'libertad', 'espontaneidad', 'fe', 'aventura'],
      invertida: ['imprudencia', 'miedo al cambio', 'dispersión', 'ingenuidad'],
    },
    significado: {
      normal:
        'El Loco marca el instante antes del primer paso: un comienzo que se ' +
        'anima sin garantías, con más confianza que certezas. Invita a soltar ' +
        'el equipaje viejo y a caminar con curiosidad, aceptando que no se puede ' +
        'ver el camino entero antes de empezar.',
      invertida:
        'Del revés, El Loco habla del salto dado sin mirar —o del salto que no ' +
        'te atreves a dar—. Puede señalar dispersión, entusiasmo que no aterriza, ' +
        'o el miedo que se disfraza de prudencia para no arriesgar nada.',
    },
    simbolismo:
      'Mira el precipicio a sus pies: no lo ve, o no le importa. La rosa blanca ' +
      'en su mano es la pureza de la intención; el perro que salta a su lado, el ' +
      'instinto que lo acompaña y lo advierte. El sol de fondo alumbra un viaje ' +
      'que recién arranca.',
  },
};
