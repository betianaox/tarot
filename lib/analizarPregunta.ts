import type { IdiomaConcreto } from '../content/paquete';
import type { Modo, Tema, Tiempo, Tono } from '../content/types';
import { obtenerDeteccion } from './bancosDeteccion';
import { clasificarModo, clasificarTema, normalizar } from './clasificarPregunta';

// Cuánta "señal" trae la pregunta escrita:
//  - invalida: ruido de teclado o vacío (bloquea la tirada).
//  - flaca:    válida pero muy escueta (deja tirar, pero avisa antes).
//  - rica:     trae tema, tono, mención de alguien o suficientes palabras.
export type Senal = 'invalida' | 'flaca' | 'rica';

export interface AnalisisPregunta {
  senal: Senal;
  temaTexto: Tema; // tema detectado SOLO del texto (independiente del chip)
  modo: Modo;
  tono: Tono;
  tiempo: Tiempo;
  mencionaTercero: boolean;
}

function contieneAlguna(textoNormalizado: string, marcas: string[]): boolean {
  return marcas.some((marca) => textoNormalizado.includes(normalizar(marca).trim()));
}

// Piso liviano de validez: no intenta detectar gibberish (imposible sin un
// modelo), solo descarta lo evidente para no dejar tirar con un carácter suelto.
function esInvalida(textoCrudo: string): boolean {
  const texto = textoCrudo.trim();
  if (texto.length < 3) {
    return true;
  }
  const soloLetras = texto.replace(/[^a-záéíóúñü]/gi, '');
  if (soloLetras.length < 3) {
    return true; // "??", "1 2", "...ok" → no llega a tres letras
  }
  const sinEspacios = texto.replace(/\s/g, '').toLowerCase();
  if (new Set(sinEspacios).size === 1) {
    return true; // "aaaa", "!!!!"
  }
  return false;
}

export function analizarPregunta(pregunta: string, idioma: IdiomaConcreto): AnalisisPregunta {
  const textoNormalizado = normalizar(pregunta);
  const banco = obtenerDeteccion(idioma);
  const temaTexto = clasificarTema(pregunta, idioma);
  const modo = clasificarModo(pregunta, idioma);

  // Preocupación pesa más que impulso: si alguien escribe "tengo ganas pero
  // me da miedo", conviene recibirlo desde la contención antes que del envión.
  const tono: Tono = contieneAlguna(textoNormalizado, banco.preocupacion)
    ? 'preocupacion'
    : contieneAlguna(textoNormalizado, banco.impulso)
      ? 'impulso'
      : 'neutro';

  // Futuro pesa más que pasado ante una pregunta mixta.
  const tiempo: Tiempo = contieneAlguna(textoNormalizado, banco.futuro)
    ? 'futuro'
    : contieneAlguna(textoNormalizado, banco.pasado)
      ? 'pasado'
      : 'presente';

  const mencionaTercero = contieneAlguna(textoNormalizado, banco.tercero);

  let senal: Senal;
  if (esInvalida(pregunta)) {
    senal = 'invalida';
  } else {
    const palabras = pregunta.trim().split(/\s+/).filter(Boolean);
    const traeSeñal =
      palabras.length >= 4 ||
      temaTexto !== 'general' ||
      modo === 'cerrada' ||
      tono !== 'neutro' ||
      mencionaTercero;
    senal = traeSeñal ? 'rica' : 'flaca';
  }

  return { senal, temaTexto, modo, tono, tiempo, mencionaTercero };
}
