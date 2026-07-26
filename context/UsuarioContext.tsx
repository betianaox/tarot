import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useState, type ReactNode } from 'react';

const CLAVE_ALMACENAMIENTO = 'tarot:nombre';

interface UsuarioContextValor {
  nombre: string | null;
  establecerNombre: (nombre: string) => void;
}

const UsuarioContext = createContext<UsuarioContextValor | null>(null);

// El nombre inicial se carga una sola vez en App.tsx (antes de decidir qué
// pantalla mostrar primero) y se pasa acá para no leer AsyncStorage dos veces.
export function UsuarioProvider({
  nombreInicial,
  children,
}: {
  nombreInicial: string | null;
  children: ReactNode;
}) {
  const [nombre, setNombre] = useState(nombreInicial);

  const establecerNombre = (nuevoNombre: string) => {
    const limpio = nuevoNombre.trim();
    setNombre(limpio);
    AsyncStorage.setItem(CLAVE_ALMACENAMIENTO, limpio);
  };

  return (
    <UsuarioContext.Provider value={{ nombre, establecerNombre }}>
      {children}
    </UsuarioContext.Provider>
  );
}

export function useUsuario(): UsuarioContextValor {
  const contexto = useContext(UsuarioContext);
  if (!contexto) {
    throw new Error('useUsuario debe usarse dentro de <UsuarioProvider>');
  }
  return contexto;
}

export async function cargarNombreGuardado(): Promise<string | null> {
  return AsyncStorage.getItem(CLAVE_ALMACENAMIENTO);
}
