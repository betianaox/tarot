import Svg, { Rect } from 'react-native-svg';

import { COLORES } from '../constants/colores';

interface IconoProps {
  size?: number;
  color?: string;
}

// Ícono de la tirada: la cruz de 5 cartas (mini). Representa "ir/volver a las
// cartas". Es el recíproco del ícono de lectura.
export function IconoTirada({ size = 26, color = COLORES.marfil }: IconoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Renglón 1-2-3 */}
      <Rect x={3.5} y={9} width={4} height={6} rx={1} fill={color} />
      <Rect x={10} y={9} width={4} height={6} rx={1} fill={color} />
      <Rect x={16.5} y={9} width={4} height={6} rx={1} fill={color} />
      {/* Carta de arriba y de abajo */}
      <Rect x={10} y={1.5} width={4} height={6} rx={1} fill={color} />
      <Rect x={10} y={16.5} width={4} height={6} rx={1} fill={color} />
    </Svg>
  );
}
