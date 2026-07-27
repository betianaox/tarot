import { describe, expect, it } from 'vitest';

import { textoConsejo, tresParaConsejo } from './consejoDelDia';

describe('tresParaConsejo', () => {
  it('ofrece 3 cartas distintas', () => {
    for (let intento = 0; intento < 50; intento++) {
      const cartas = tresParaConsejo();
      expect(cartas).toHaveLength(3);
      expect(new Set(cartas).size).toBe(3);
    }
  });
});

describe('textoConsejo', () => {
  it('usa el consejo de la carta si está escrito', () => {
    expect(textoConsejo('mayor-00', { 'mayor-00': 'HOLA' }, 'GENERICO')).toBe('HOLA');
  });

  it('cae al genérico si la carta no tiene consejo', () => {
    expect(textoConsejo('oros-rey', {}, 'GENERICO')).toBe('GENERICO');
  });
});
