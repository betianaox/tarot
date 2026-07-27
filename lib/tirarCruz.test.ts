import { describe, expect, it } from 'vitest';

import { tirarCruz } from './tirarCruz';

// RNG determinista: recorre una secuencia dada, cíclica.
function rngSecuencia(valores: number[]): () => number {
  let i = 0;
  return () => valores[i++ % valores.length];
}

describe('tirarCruz', () => {
  it('reparte 5 cartas', () => {
    expect(tirarCruz(rngSecuencia([0.1, 0.9]))).toHaveLength(5);
  });

  it('las 5 cartas son únicas', () => {
    for (let intento = 0; intento < 50; intento++) {
      const ids = tirarCruz().map((c) => c.id);
      expect(new Set(ids).size).toBe(5);
    }
  });

  it('cada carta cae derecha o invertida', () => {
    for (const carta of tirarCruz()) {
      expect(['normal', 'invertida']).toContain(carta.posicion);
    }
  });

  it('con rng bajo salen todas invertidas; con rng alto, todas derechas', () => {
    // Los valores de orientación se consumen intercalados con los de mezcla,
    // pero con una constante el resultado es uniforme.
    const todasInvertidas = tirarCruz(() => 0.0);
    expect(todasInvertidas.every((c) => c.posicion === 'invertida')).toBe(true);
    const todasDerechas = tirarCruz(() => 0.99);
    expect(todasDerechas.every((c) => c.posicion === 'normal')).toBe(true);
  });
});
