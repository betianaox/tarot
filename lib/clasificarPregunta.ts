import type { IdiomaConcreto } from '../content/paquete';
import type { Modo, Tema } from '../content/types';
import { obtenerDeteccion } from './bancosDeteccion';

const DIACRITICOS = /[̀-ͯ]/g;

export function normalizar(texto: string): string {
  const sinTildes = texto.toLowerCase().normalize('NFD').replace(DIACRITICOS, '');
  return ` ${sinTildes} `; // bordes con espacios para matchear palabras sueltas, no substrings de otras palabras
}

export function clasificarTema(pregunta: string, idioma: IdiomaConcreto): Tema {
  const texto = normalizar(pregunta);
  const banco = obtenerDeteccion(idioma).tema;
  let mejorTema: Tema = 'general';
  let mejorPuntaje = 0;

  for (const [tema, palabras] of Object.entries(banco)) {
    const puntaje = palabras.filter((palabra) => texto.includes(normalizar(palabra).trim())).length;
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejorTema = tema as Tema;
    }
  }

  return mejorTema;
}

export function clasificarModo(pregunta: string, idioma: IdiomaConcreto): Modo {
  const texto = normalizar(pregunta);
  const marcas = obtenerDeteccion(idioma).modoCerrada;
  const esCerrada = marcas.some((marca) => texto.includes(normalizar(marca).trim()));
  return esCerrada ? 'cerrada' : 'abierta';
}

export interface Clasificacion {
  tema: Tema;
  modo: Modo;
}

export function clasificarPregunta(pregunta: string, idioma: IdiomaConcreto): Clasificacion {
  return {
    tema: clasificarTema(pregunta, idioma),
    modo: clasificarModo(pregunta, idioma),
  };
}
