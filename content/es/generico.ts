import type { Posicion } from '../types';

// Último escalón del fallback en español: texto seguro para una carta que
// todavía no tiene nada escrito. Nunca deja a la tirada sin nada que decir.
export const GENERICO_ES: Record<Posicion, string> = {
  normal:
    'una energía que te invita a detenerte y mirar con calma qué te está mostrando.',
  invertida:
    'un matiz que pide revisar con cuidado antes de sacar conclusiones.',
};
