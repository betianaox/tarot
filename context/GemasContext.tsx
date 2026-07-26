import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { fechaDeHoy } from '../lib/fecha';

const GEMAS_POR_DIA = 3;
const CLAVE_ALMACENAMIENTO = 'tarot:gemas';

interface GemasGuardadas {
  fecha: string;
  gemas: number;
}

interface GemasContextValor {
  gemas: number;
  gastarGema: () => void;
  ganarGema: () => void;
}

const GemasContext = createContext<GemasContextValor | null>(null);

export function GemasProvider({ children }: { children: ReactNode }) {
  const [gemas, setGemas] = useState(GEMAS_POR_DIA);
  // Fecha bajo la que se guarda el valor actual — normalmente "hoy", pero
  // si el reloj del dispositivo retrocedió queda la fecha vieja hasta que
  // el reloj la alcance de nuevo (anti-cheat sin servidor).
  const fechaVigente = useRef(fechaDeHoy());

  useEffect(() => {
    (async () => {
      const hoy = fechaDeHoy();
      const guardado = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);

      if (guardado) {
        const estado: GemasGuardadas = JSON.parse(guardado);
        if (estado.fecha === hoy || hoy < estado.fecha) {
          fechaVigente.current = estado.fecha;
          setGemas(estado.gemas);
          return;
        }
      }

      // No había nada guardado, o pasó un día real de verdad: reset.
      fechaVigente.current = hoy;
      setGemas(GEMAS_POR_DIA);
      await AsyncStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify({ fecha: hoy, gemas: GEMAS_POR_DIA }),
      );
    })();
  }, []);

  const persistir = (nuevoValor: number) => {
    AsyncStorage.setItem(
      CLAVE_ALMACENAMIENTO,
      JSON.stringify({ fecha: fechaVigente.current, gemas: nuevoValor }),
    );
  };

  const gastarGema = () =>
    setGemas((actual) => {
      const siguiente = Math.max(0, actual - 1);
      persistir(siguiente);
      return siguiente;
    });

  const ganarGema = () =>
    setGemas((actual) => {
      const siguiente = actual + 1;
      persistir(siguiente);
      return siguiente;
    });

  return (
    <GemasContext.Provider value={{ gemas, gastarGema, ganarGema }}>
      {children}
    </GemasContext.Provider>
  );
}

export function useGemas(): GemasContextValor {
  const contexto = useContext(GemasContext);
  if (!contexto) {
    throw new Error('useGemas debe usarse dentro de <GemasProvider>');
  }
  return contexto;
}
