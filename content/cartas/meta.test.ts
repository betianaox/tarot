import { describe, expect, it } from 'vitest';

import { CARTAS, CARTA_POR_ID } from './meta';

describe('baraja (CARTAS)', () => {
  it('tiene 78 cartas', () => {
    expect(CARTAS).toHaveLength(78);
  });

  it('tiene 22 Mayores y 56 Menores', () => {
    expect(CARTAS.filter((c) => c.arcano === 'mayor')).toHaveLength(22);
    expect(CARTAS.filter((c) => c.arcano === 'menor')).toHaveLength(56);
  });

  it('todos los ids son únicos', () => {
    const ids = new Set(CARTAS.map((c) => c.id));
    expect(ids.size).toBe(78);
  });

  it('cada palo aporta 14 Menores', () => {
    for (const palo of ['bastos', 'copas', 'espadas', 'oros'] as const) {
      expect(CARTAS.filter((c) => c.palo === palo)).toHaveLength(14);
    }
  });

  it('los Menores derivan bien elemento y número', () => {
    expect(CARTA_POR_ID['bastos-as']).toMatchObject({ elemento: 'fuego', numero: 1 });
    expect(CARTA_POR_ID['copas-rey']).toMatchObject({ elemento: 'agua', numero: 14 });
    expect(CARTA_POR_ID['espadas-sota']).toMatchObject({ elemento: 'aire', numero: 11 });
    expect(CARTA_POR_ID['oros-diez']).toMatchObject({ elemento: 'tierra', numero: 10 });
  });

  it('las cartas dibujadas tienen imagen y las no dibujadas quedan en null', () => {
    // 00–04 ya tienen arte.
    expect(CARTA_POR_ID['mayor-00'].imagen).not.toBeNull();
    expect(CARTA_POR_ID['mayor-04'].imagen).not.toBeNull();
    // El resto todavía no.
    expect(CARTA_POR_ID['mayor-05'].imagen).toBeNull();
    expect(CARTA_POR_ID['oros-rey'].imagen).toBeNull();
  });
});
