import { obtenerTextos, type Textos } from '../content/textos';
import { useIdioma } from '../context/IdiomaContext';

// Devuelve los textos de UI en el idioma activo. Azúcar sobre
// obtenerTextos(idiomaConcreto) para no repetirlo en cada pantalla.
export function useTextos(): Textos {
  return obtenerTextos(useIdioma().idiomaConcreto);
}
