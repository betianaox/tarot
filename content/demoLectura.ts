// Texto de muestra para calibrar la forma de la lectura y probar el TTS antes de
// conectar el motor de lecturas real (paso siguiente). Vive aparte para
// compartirlo entre la pantalla de la cruz y la de lectura.
export const PREGUNTA_EJEMPLO = '¿Qué necesito ver de esta situación?';

export const PARRAFOS_EJEMPLO = [
  'Primer párrafo: la lectura de las tres cartas del renglón, nombrando cada ' +
    'carta la primera vez y relacionando sus significados con la pregunta.',
  'Segundo párrafo: integra esas tres cartas —cómo se combinan y qué dicen ' +
    'juntas—, ya sin repetir los nombres (como el párrafo integrador de Runas).',
  'Tercer párrafo: suma la carta de arriba —lo que la persona tiene en la ' +
    'cabeza— y la de abajo —el próximo movimiento, el futuro cercano—. Cuando ' +
    'conectemos el motor, todo esto se arma solo a partir de las cinco cartas y ' +
    'del análisis de la pregunta.',
];

// Lo que se lee en voz alta: SOLO la respuesta (los párrafos), sin la pregunta.
// Separados para que el TTS haga una pausa entre cada bloque.
export const TEXTO_LECTURA_DEMO = PARRAFOS_EJEMPLO.join('\n\n');
