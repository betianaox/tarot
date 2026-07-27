import type {
  CartaId,
  CartaMayorId,
  CartaMeta,
  Elemento,
  Palo,
  RangoMenor,
  RespuestaSiNo,
} from '../types';
import { IMAGENES } from './imagenes';

// ── Arcanos Mayores ────────────────────────────────────────────────────────
// Datos estructurales fijos (número, correspondencia astrológica, respuesta
// sí/no orientativa). El sí/no sigue convenciones tradicionales y es ajustable.

interface DatosMayor {
  astro: string;
  siNo: RespuestaSiNo;
  elemento?: Elemento;
}

// Índice 0–21 → datos del Mayor correspondiente.
const MAYORES: DatosMayor[] = [
  { astro: 'urano', siNo: 'depende', elemento: 'aire' }, // 00 El Loco
  { astro: 'mercurio', siNo: 'si' }, // 01 El Mago
  { astro: 'luna', siNo: 'depende' }, // 02 La Sacerdotisa
  { astro: 'venus', siNo: 'si' }, // 03 La Emperatriz
  { astro: 'aries', siNo: 'si' }, // 04 El Emperador
  { astro: 'tauro', siNo: 'si' }, // 05 El Hierofante
  { astro: 'geminis', siNo: 'si' }, // 06 Los Enamorados
  { astro: 'cancer', siNo: 'si' }, // 07 El Carro
  { astro: 'leo', siNo: 'si' }, // 08 La Fuerza
  { astro: 'virgo', siNo: 'no' }, // 09 El Ermitaño
  { astro: 'jupiter', siNo: 'si' }, // 10 La Rueda de la Fortuna
  { astro: 'libra', siNo: 'depende' }, // 11 La Justicia
  { astro: 'neptuno', siNo: 'no', elemento: 'agua' }, // 12 El Colgado
  { astro: 'escorpio', siNo: 'no' }, // 13 La Muerte
  { astro: 'sagitario', siNo: 'depende' }, // 14 La Templanza
  { astro: 'capricornio', siNo: 'no' }, // 15 El Diablo
  { astro: 'marte', siNo: 'no' }, // 16 La Torre
  { astro: 'acuario', siNo: 'si' }, // 17 La Estrella
  { astro: 'piscis', siNo: 'no' }, // 18 La Luna
  { astro: 'sol', siNo: 'si' }, // 19 El Sol
  { astro: 'pluton', siNo: 'si', elemento: 'fuego' }, // 20 El Juicio
  { astro: 'saturno', siNo: 'si' }, // 21 El Mundo
];

function idMayor(n: number): CartaMayorId {
  return `mayor-${String(n).padStart(2, '0')}` as CartaMayorId;
}

const metaMayores: CartaMeta[] = MAYORES.map((datos, numero) => {
  const id = idMayor(numero);
  return {
    id,
    arcano: 'mayor',
    numero,
    elemento: datos.elemento,
    astro: datos.astro,
    siNo: datos.siNo,
    imagen: IMAGENES[id] ?? null,
  };
});

// ── Arcanos Menores ────────────────────────────────────────────────────────
// Se generan por combinación palo × rango. El elemento se deriva del palo y el
// número del rango. Ninguno tiene arte todavía → imagen null (dorso).

const ELEMENTO_DE_PALO: Record<Palo, Elemento> = {
  bastos: 'fuego',
  copas: 'agua',
  espadas: 'aire',
  oros: 'tierra',
};

const PALOS: Palo[] = ['bastos', 'copas', 'espadas', 'oros'];

// Orden = número de la carta (as=1 … diez=10, sota=11 … rey=14).
const RANGOS: RangoMenor[] = [
  'as',
  'dos',
  'tres',
  'cuatro',
  'cinco',
  'seis',
  'siete',
  'ocho',
  'nueve',
  'diez',
  'sota',
  'caballo',
  'reina',
  'rey',
];

const metaMenores: CartaMeta[] = PALOS.flatMap((palo) =>
  RANGOS.map((rango, indice): CartaMeta => {
    const id = `${palo}-${rango}` as CartaId;
    return {
      id,
      arcano: 'menor',
      numero: indice + 1,
      palo,
      rango,
      elemento: ELEMENTO_DE_PALO[palo],
      imagen: IMAGENES[id] ?? null,
    };
  }),
);

// ── Baraja completa ────────────────────────────────────────────────────────

export const CARTAS: CartaMeta[] = [...metaMayores, ...metaMenores];

// Índice por id para búsquedas O(1) desde el motor y las pantallas.
export const CARTA_POR_ID: Record<CartaId, CartaMeta> = Object.fromEntries(
  CARTAS.map((carta) => [carta.id, carta]),
) as Record<CartaId, CartaMeta>;
