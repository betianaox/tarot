import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import type { IdiomaConcreto } from '../content/paquete';

const CLAVE_ALMACENAMIENTO = 'tarot:idioma';

// "auto" = seguir el idioma del sistema. La preferencia se guarda tal cual; el
// contenido se sirve según el idioma *concreto* que devuelve resolverIdioma().
export type Idioma = 'auto' | 'es' | 'en' | 'pt' | 'it';

const IDIOMAS_SOPORTADOS: IdiomaConcreto[] = ['es', 'en', 'pt', 'it'];

// Traduce la preferencia a un idioma concreto servible. 'auto' lee el idioma
// del sistema (expo-localization) y lo mapea a es/en/pt/it; cualquier otro
// idioma del dispositivo cae a español, que es el idioma de referencia.
export function resolverIdioma(idioma: Idioma): IdiomaConcreto {
  if (idioma !== 'auto') {
    return idioma;
  }
  try {
    const codigo = getLocales()[0]?.languageCode as IdiomaConcreto | undefined;
    if (codigo && IDIOMAS_SOPORTADOS.includes(codigo)) {
      return codigo;
    }
  } catch {
    // Si el módulo nativo no está disponible (p. ej. en tests), caemos a es.
  }
  return 'es';
}

interface IdiomaContextValor {
  idioma: Idioma;
  idiomaConcreto: IdiomaConcreto;
  establecerIdioma: (idioma: Idioma) => void;
}

const IdiomaContext = createContext<IdiomaContextValor | null>(null);

export function IdiomaProvider({ children }: { children: ReactNode }) {
  const [idioma, setIdioma] = useState<Idioma>('auto');

  useEffect(() => {
    AsyncStorage.getItem(CLAVE_ALMACENAMIENTO).then((guardado) => {
      if (guardado) {
        setIdioma(guardado as Idioma);
      }
    });
  }, []);

  const establecerIdioma = (nuevoIdioma: Idioma) => {
    setIdioma(nuevoIdioma);
    AsyncStorage.setItem(CLAVE_ALMACENAMIENTO, nuevoIdioma);
  };

  return (
    <IdiomaContext.Provider
      value={{ idioma, idiomaConcreto: resolverIdioma(idioma), establecerIdioma }}
    >
      {children}
    </IdiomaContext.Provider>
  );
}

export function useIdioma(): IdiomaContextValor {
  const contexto = useContext(IdiomaContext);
  if (!contexto) {
    throw new Error('useIdioma debe usarse dentro de <IdiomaProvider>');
  }
  return contexto;
}
