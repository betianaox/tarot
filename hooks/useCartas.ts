import { paqueteCartas, type PaqueteCartas } from '../content/idiomaCartas';
import { useIdioma } from '../context/IdiomaContext';

// Devuelve el paquete de cartas (nombres + fichas Wiki) en el idioma activo.
export function useCartas(): PaqueteCartas {
  return paqueteCartas(useIdioma().idiomaConcreto);
}
