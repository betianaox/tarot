// ─────────────────────────────────────────────────────────────────────────
// Modelo de datos de las 78 cartas. Tres capas atadas a un mismo CartaId:
//   1. CartaMeta   — estructura neutra de idioma (número, palo, imagen, datos).
//   2. FichaWiki   — contenido de aprendizaje por idioma (nombre, significados).
//   3. Fragmentos  — motor de lecturas por idioma (tema × posición × variantes).
// El texto de una tirada se resuelve con una escalera de fallback (ver
// lib/resolverCarta.ts) para que la app nunca se rompa con contenido a medias.
// ─────────────────────────────────────────────────────────────────────────

// Ejes temáticos de una consulta. Los mismos cuatro mundos que en Runas.
export type Tema = 'amor' | 'trabajo' | 'dinero' | 'general';

// cerrada = la pregunta busca un resultado o un sí/no ("¿va a volver?",
// "¿me conviene?"). abierta = busca reflexión ("¿qué necesito ver de esto?").
// Se detecta por patrones de la pregunta y modula qué apertura/consejo se elige
// para acompañar la tirada (no cambia el significado de cada carta).
export type Modo = 'cerrada' | 'abierta';

// Tono con el que la persona formuló la pregunta. Es su estado, no el de la
// carta: tiñe las piezas que le hablan a ella (aperturas, consejos, eco), nunca
// los fragmentos que describen el significado de cada carta. 'neutro' es el
// default y el fallback cuando no hay contenido específico.
export type Tono = 'preocupacion' | 'impulso' | 'neutro';

// Orientación temporal de la consulta: hacia atrás ("mi ex", "lo que pasó"),
// hacia adelante ("va a", "conviene") o sin marca temporal fuerte.
export type Tiempo = 'pasado' | 'presente' | 'futuro';

// Posición en la que sale la carta. Las invertidas tienen significado propio.
export type Posicion = 'normal' | 'invertida';

export type Arcano = 'mayor' | 'menor';

// Palos en nomenclatura de baraja española (la más reconocible en LatAm).
export type Palo = 'bastos' | 'copas' | 'espadas' | 'oros';

// 14 rangos por palo: diez numerales + cuatro figuras (Sota/Caballo/Reina/Rey).
export type RangoMenor =
  | 'as'
  | 'dos'
  | 'tres'
  | 'cuatro'
  | 'cinco'
  | 'seis'
  | 'siete'
  | 'ocho'
  | 'nueve'
  | 'diez'
  | 'sota'
  | 'caballo'
  | 'reina'
  | 'rey';

// Elemento asociado. En los Menores se deriva del palo; en algunos Mayores es
// opcional (no todos tienen una asignación elemental clara).
export type Elemento = 'fuego' | 'agua' | 'aire' | 'tierra';

// Respuesta orientativa para preguntas de sí/no (dato extra de la Wiki).
export type RespuestaSiNo = 'si' | 'no' | 'depende';

// ── Identidad de carta (78 ids literales, neutros de idioma) ───────────────

export type CartaMayorId =
  | 'mayor-00'
  | 'mayor-01'
  | 'mayor-02'
  | 'mayor-03'
  | 'mayor-04'
  | 'mayor-05'
  | 'mayor-06'
  | 'mayor-07'
  | 'mayor-08'
  | 'mayor-09'
  | 'mayor-10'
  | 'mayor-11'
  | 'mayor-12'
  | 'mayor-13'
  | 'mayor-14'
  | 'mayor-15'
  | 'mayor-16'
  | 'mayor-17'
  | 'mayor-18'
  | 'mayor-19'
  | 'mayor-20'
  | 'mayor-21';

// Los 56 ids de Menores se generan por combinación palo-rango.
export type CartaMenorId = `${Palo}-${RangoMenor}`;

export type CartaId = CartaMayorId | CartaMenorId;

// ── Capa 1: estructura (una sola vez, no depende de idioma) ────────────────

export interface CartaMeta {
  id: CartaId;
  arcano: Arcano;
  // 0–21 en Mayores; 1–14 en Menores (11=Sota, 12=Caballo, 13=Reina, 14=Rey).
  numero: number;
  palo?: Palo; // solo Menores
  rango?: RangoMenor; // solo Menores
  elemento?: Elemento;
  // Código neutro de planeta/signo (ej. 'venus', 'aries'). La etiqueta visible
  // se localiza aparte al construir la Wiki; acá va el código estable.
  astro?: string;
  siNo?: RespuestaSiNo;
  // require(...) del webp, o null si todavía no está dibujada → la app muestra
  // el dorso. Es el fallback visual, análogo al fallback de texto.
  imagen: number | null;
}

// ── Capa 2: Wiki / aprendizaje (por idioma) ────────────────────────────────

export interface FichaWiki {
  nombre: string; // "El Loco" / "The Fool" — lo pone la app, no el arte
  palabrasClave: {
    normal: string[];
    invertida: string[];
  };
  significado: {
    normal: string;
    invertida: string;
  };
  simbolismo: string; // qué mirar en la imagen y por qué
}

// Fichas de un idioma, parciales para permitir carga incremental (Mayores
// primero, Menores después) sin romper el tipado.
export type WikiPorCarta = Partial<Record<CartaId, FichaWiki>>;

// ── Capa 3: motor de lecturas (por idioma) ─────────────────────────────────

// Cláusula corta pensada para encajar en una plantilla de conector, igual que
// en Runas: "la carta X señala {fragmento}".
export type Fragmento = string;

// Tres variantes por posición, para que la misma carta no suene siempre igual.
export type VariantesFragmento = [Fragmento, Fragmento, Fragmento];

// Fragmentos de un tema: parciales por carta (fallback) y completos por
// posición (una carta que exista trae siempre normal e invertida).
export type FragmentosDeTema = Partial<
  Record<CartaId, Record<Posicion, VariantesFragmento>>
>;

// ── Nombres y etiquetas de carta (por idioma) ──────────────────────────────
// Permite mostrar el nombre de cualquiera de las 78 cartas aunque su ficha Wiki
// no esté escrita: los Mayores por número, los Menores construidos con rango +
// palo (ej. "Sota de Copas"). Ver lib/nombreCarta.ts.
export interface NombresPack {
  mayores: Record<number, string>; // 0–21 → nombre del Arcano Mayor
  palos: Record<Palo, string>;
  rangos: Record<RangoMenor, string>;
  elementos: Record<Elemento, string>;
}
