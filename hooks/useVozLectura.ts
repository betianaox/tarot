import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';

import type { IdiomaConcreto } from '../content/paquete';
import { useIdioma } from '../context/IdiomaContext';

// expo-speech es módulo nativo: en un dev client sin rebuild todavía no existe,
// y un import estático rompería el arranque de toda la app. Se carga defensivo
// para que la app funcione (con el TTS inactivo) hasta el próximo build local;
// una vez rebuildeado, el require encuentra el módulo y la voz anda sola.
const Speech: typeof import('expo-speech') | null = (() => {
  try {
    return require('expo-speech') as typeof import('expo-speech');
  } catch {
    return null;
  }
})();

// Etiqueta de voz por idioma para el TTS del sistema. Es una pista: si el
// teléfono no tiene esa voz instalada, el motor elige la más cercana.
const VOZ: Record<IdiomaConcreto, string> = {
  es: 'es-ES',
  en: 'en-US',
  pt: 'pt-BR',
  it: 'it-IT',
};

// Lee un texto en voz alta con el TTS del sistema (offline, sin servicio) y lo
// CORTA al salir de la pantalla, salga como salga (botón, gesto, back de
// Android): el cleanup de useFocusEffect corre en cada blur y al desmontar.
export function useVozLectura(texto: string) {
  const { idiomaConcreto } = useIdioma();
  const [hablando, setHablando] = useState(false);

  const alternar = () => {
    if (!Speech) {
      return; // módulo nativo ausente (dev client sin rebuild)
    }
    if (hablando) {
      Speech.stop();
      setHablando(false);
      return;
    }
    setHablando(true);
    Speech.speak(texto, {
      language: VOZ[idiomaConcreto],
      onDone: () => setHablando(false),
      onStopped: () => setHablando(false),
      onError: () => setHablando(false),
    });
  };

  useFocusEffect(
    useCallback(
      () => () => {
        Speech?.stop();
      },
      [],
    ),
  );

  return { hablando, alternar };
}
