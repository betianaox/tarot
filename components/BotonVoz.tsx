import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORES } from '../constants/colores';
import { useVozLectura } from '../hooks/useVozLectura';
import BotonIcono from './BotonIcono';

// Botón de parlante que lee una lectura en voz alta (TTS del sistema). Comparte
// el look redondo de BotonIcono; alterna a "detener" mientras habla. Corta solo
// al salir de la pantalla (ver useVozLectura).
export default function BotonVoz({ texto }: { texto: string }) {
  const { hablando, alternar } = useVozLectura(texto);
  return (
    <BotonIcono accessibilityLabel={hablando ? 'Detener' : 'Escuchar'} onPress={alternar}>
      <MaterialCommunityIcons
        name={hablando ? 'stop' : 'volume-high'}
        size={26}
        color={COLORES.marfil}
      />
    </BotonIcono>
  );
}
