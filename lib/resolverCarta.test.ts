import { describe, expect, it } from 'vitest';

import { FUENTES_ES } from '../content/es';
import type { FragmentosDeTema, WikiPorCarta } from '../content/types';
import { resolverTextoLectura, type FuentesLectura } from './resolverCarta';

// Elección determinista: siempre la primera variante.
const primera = () => 0;

describe('resolverTextoLectura — escalera de fallback', () => {
  const wiki: WikiPorCarta = {
    'mayor-05': {
      nombre: 'El Hierofante',
      palabrasClave: { normal: ['tradición'], invertida: ['rebeldía'] },
      significado: { normal: 'SIGNIFICADO NORMAL', invertida: 'SIGNIFICADO INVERTIDO' },
      simbolismo: '',
    },
  };

  const fragmentosAmor: FragmentosDeTema = {
    'mayor-01': { normal: ['AMOR-N-1', 'AMOR-N-2', 'AMOR-N-3'], invertida: ['AMOR-I', 'x', 'y'] },
  };
  const fragmentosGeneral: FragmentosDeTema = {
    'mayor-01': { normal: ['GEN-N', 'x', 'y'], invertida: ['GEN-I', 'x', 'y'] },
  };

  const fuentes: FuentesLectura = {
    fragmentos: { amor: fragmentosAmor, general: fragmentosGeneral },
    wiki,
    generico: { normal: 'GENERICO-N', invertida: 'GENERICO-I' },
  };

  it('1) usa el fragmento específico del tema cuando existe', () => {
    expect(resolverTextoLectura(fuentes, 'mayor-01', 'amor', 'normal', primera)).toBe('AMOR-N-1');
  });

  it('2) cae al tema general cuando el tema pedido no tiene esa carta', () => {
    // No hay 'mayor-01' en trabajo → usa general.
    expect(resolverTextoLectura(fuentes, 'mayor-01', 'trabajo', 'normal', primera)).toBe('GEN-N');
  });

  it('3) cae al significado de la Wiki cuando la carta no tiene fragmentos', () => {
    expect(resolverTextoLectura(fuentes, 'mayor-05', 'amor', 'invertida', primera)).toBe(
      'SIGNIFICADO INVERTIDO',
    );
  });

  it('4) cae al genérico cuando no hay nada escrito para la carta', () => {
    expect(resolverTextoLectura(fuentes, 'oros-rey', 'dinero', 'normal', primera)).toBe(
      'GENERICO-N',
    );
  });
});

describe('resolverTextoLectura — con el contenido real en español', () => {
  it('El Loco en un tema sin escribir cae a su fragmento general', () => {
    // 'amor' no está sembrado aún → usa el general de El Loco.
    const texto = resolverTextoLectura(FUENTES_ES, 'mayor-00', 'amor', 'normal', primera);
    expect(texto).toBe('un comienzo que pide confianza más que certezas');
  });

  it('Una carta sin ningún contenido cae al genérico en español', () => {
    const texto = resolverTextoLectura(FUENTES_ES, 'espadas-siete', 'general', 'invertida', primera);
    expect(texto).toBe(FUENTES_ES.generico.invertida);
  });
});
