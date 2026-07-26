// Idioma "concreto": el que realmente se sirve. La preferencia guardada puede
// ser 'auto' (seguir el sistema); resolverIdioma() la traduce a uno de estos.
export type IdiomaConcreto = 'es' | 'en' | 'pt' | 'it';

// NOTA (Fase 2): acá vivirá el PaqueteContenido del motor de lecturas de tarot
// (fragmentos por carta × posición × tema, aperturas, conectores, consejos),
// análogo al de Runas pero con el modelo de las 78 cartas. Por ahora solo se
// necesita el tipo de idioma para la UI.
