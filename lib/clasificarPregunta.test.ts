import { describe, expect, it } from 'vitest';
import { clasificarModo, clasificarPregunta, clasificarTema } from './clasificarPregunta';

describe('clasificarTema (es)', () => {
  it('detecta amor con o sin tildes', () => {
    expect(clasificarTema('¿Va a volver mi ex?', 'es')).toBe('amor');
    expect(clasificarTema('¿Voy a encontrar el amor este año?', 'es')).toBe('amor');
  });

  it('detecta trabajo', () => {
    expect(clasificarTema('¿Me conviene renunciar a mi trabajo?', 'es')).toBe('trabajo');
  });

  it('detecta dinero', () => {
    expect(clasificarTema('¿Voy a poder pagar mis deudas?', 'es')).toBe('dinero');
  });

  it('cae en general si no hay coincidencias', () => {
    expect(clasificarTema('¿Qué energía me rodea hoy?', 'es')).toBe('general');
  });
});

describe('clasificarTema (en)', () => {
  it('detects love', () => {
    expect(clasificarTema('Will my ex come back?', 'en')).toBe('amor');
  });

  it('detects work', () => {
    expect(clasificarTema('Should I quit my job?', 'en')).toBe('trabajo');
  });

  it('detects money', () => {
    expect(clasificarTema('Will I be able to pay my debts?', 'en')).toBe('dinero');
  });

  it('falls back to general', () => {
    expect(clasificarTema('What energy surrounds me today?', 'en')).toBe('general');
  });
});

describe('clasificarModo', () => {
  it('detecta preguntas cerradas (es)', () => {
    expect(clasificarModo('¿Va a volver mi ex?', 'es')).toBe('cerrada');
    expect(clasificarModo('¿Me conviene cambiar de trabajo?', 'es')).toBe('cerrada');
  });

  it('detecta preguntas abiertas (es)', () => {
    expect(clasificarModo('¿Qué necesito saber sobre esta etapa?', 'es')).toBe('abierta');
    expect(clasificarModo('¿Cómo estoy en el amor ahora mismo?', 'es')).toBe('abierta');
  });

  it('detects closed and open questions (en)', () => {
    expect(clasificarModo('Will he come back?', 'en')).toBe('cerrada');
    expect(clasificarModo('What do I need to see about this stage?', 'en')).toBe('abierta');
  });
});

describe('clasificarPregunta', () => {
  it('combina tema y modo', () => {
    expect(clasificarPregunta('¿Va a volver mi ex?', 'es')).toEqual({ tema: 'amor', modo: 'cerrada' });
  });
});
