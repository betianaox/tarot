import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

import { fechaDeHoy } from '../lib/fecha';

const CLAVE_ALMACENAMIENTO = 'tarot:desbloqueos';

// Qué secciones de la Wiki están abiertas HOY. Se abren mirando un video corto y
// se vuelven a cerrar cuando cambia el día calendario — el mismo modelo "por día"
// que las gemas (ver GemasContext), con el mismo anti-cheat de reloj sin servidor.
interface DesbloqueosGuardados {
  fecha: string;
  secciones: string[];
}

interface DesbloqueosContextValor {
  estaDesbloqueada: (seccion: string) => boolean;
  desbloquear: (seccion: string) => void;
}

const DesbloqueosContext = createContext<DesbloqueosContextValor | null>(null);

export function DesbloqueosProvider({ children }: { children: ReactNode }) {
  const [secciones, setSecciones] = useState<string[]>([]);
  // Fecha bajo la que valen estos desbloqueos. Si el reloj retrocede, queda la
  // fecha vieja hasta que el reloj la alcance: atrasar el reloj no regala un día.
  const fechaVigente = useRef(fechaDeHoy());

  useEffect(() => {
    (async () => {
      const hoy = fechaDeHoy();
      const guardado = await AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);

      if (guardado) {
        const estado: DesbloqueosGuardados = JSON.parse(guardado);
        if (estado.fecha === hoy || hoy < estado.fecha) {
          fechaVigente.current = estado.fecha;
          setSecciones(estado.secciones);
          return;
        }
      }

      // No había nada, o pasó un día real: todo vuelve a bloquearse.
      fechaVigente.current = hoy;
      setSecciones([]);
      await AsyncStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify({ fecha: hoy, secciones: [] }),
      );
    })();
  }, []);

  const estaDesbloqueada = (seccion: string) => secciones.includes(seccion);

  const desbloquear = (seccion: string) =>
    setSecciones((actual) => {
      if (actual.includes(seccion)) return actual;
      const siguiente = [...actual, seccion];
      AsyncStorage.setItem(
        CLAVE_ALMACENAMIENTO,
        JSON.stringify({ fecha: fechaVigente.current, secciones: siguiente }),
      );
      return siguiente;
    });

  return (
    <DesbloqueosContext.Provider value={{ estaDesbloqueada, desbloquear }}>
      {children}
    </DesbloqueosContext.Provider>
  );
}

export function useDesbloqueos(): DesbloqueosContextValor {
  const contexto = useContext(DesbloqueosContext);
  if (!contexto) {
    throw new Error('useDesbloqueos debe usarse dentro de <DesbloqueosProvider>');
  }
  return contexto;
}
