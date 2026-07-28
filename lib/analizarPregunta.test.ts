import { describe, expect, it } from 'vitest';
import { analizarPregunta } from './analizarPregunta';

describe('analizarPregunta — señal / validez', () => {
  it('marca inválidas las entradas de ruido o vacías', () => {
    for (const basura of ['', '  ', 'x', 'aa', '??', '...', 'aaaa', '1 2 3']) {
      expect(analizarPregunta(basura, 'es').senal).toBe('invalida');
    }
  });

  it('acepta una sola palabra si es un tema real', () => {
    expect(analizarPregunta('amor', 'es').senal).toBe('rica');
    expect(analizarPregunta('dinero', 'es').senal).toBe('rica');
  });

  it('marca flaca lo válido pero escueto y sin señal', () => {
    expect(analizarPregunta('hola como estas', 'es').senal).toBe('flaca');
    expect(analizarPregunta('asdf', 'es').senal).toBe('flaca');
  });

  it('marca rica una consulta con varias palabras', () => {
    expect(analizarPregunta('qué me depara este año que arranca', 'es').senal).toBe('rica');
  });
});

describe('analizarPregunta — tono', () => {
  it('detecta preocupación', () => {
    expect(analizarPregunta('tengo miedo de que no funcione', 'es').tono).toBe('preocupacion');
  });

  it('detecta impulso', () => {
    expect(analizarPregunta('tengo muchas ganas de empezar algo nuevo', 'es').tono).toBe('impulso');
  });

  it('la preocupación pesa más que el impulso en una pregunta mixta', () => {
    expect(analizarPregunta('tengo ganas pero también miedo', 'es').tono).toBe('preocupacion');
  });

  it('cae en neutro sin marcas', () => {
    expect(analizarPregunta('cómo viene el mes', 'es').tono).toBe('neutro');
  });
});

describe('analizarPregunta — tiempo', () => {
  it('detecta futuro', () => {
    expect(analizarPregunta('¿me va a ir bien?', 'es').tiempo).toBe('futuro');
  });

  it('detecta pasado', () => {
    expect(analizarPregunta('¿por qué mi ex se fue así?', 'es').tiempo).toBe('pasado');
  });

  it('cae en presente sin marca temporal', () => {
    expect(analizarPregunta('cómo estoy hoy en el amor', 'es').tiempo).toBe('presente');
  });
});

describe('analizarPregunta — tercero', () => {
  it('detecta la mención de otra persona por vínculo', () => {
    expect(analizarPregunta('¿mi jefe confía en mí?', 'es').mencionaTercero).toBe(true);
    expect(analizarPregunta('¿volveré con mi ex?', 'es').mencionaTercero).toBe(true);
  });

  it('no marca tercero cuando la pregunta es solo sobre uno mismo', () => {
    expect(analizarPregunta('¿qué necesito trabajar de mí?', 'es').mencionaTercero).toBe(false);
  });
});

describe('analizarPregunta — inglés', () => {
  it('detects tone, time and third party in English', () => {
    expect(analizarPregunta('I am scared it will not work out', 'en').tono).toBe('preocupacion');
    expect(analizarPregunta('I really want to start something new', 'en').tono).toBe('impulso');
    expect(analizarPregunta('is my boss going to trust me?', 'en').mencionaTercero).toBe(true);
    expect(analizarPregunta('will it get better?', 'en').tiempo).toBe('futuro');
  });

  it('accepts a single real topic word and rejects noise, in English mode', () => {
    expect(analizarPregunta('love', 'en').senal).toBe('rica');
    expect(analizarPregunta('x', 'en').senal).toBe('invalida');
  });
});
