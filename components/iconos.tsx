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

// Ícono de la lectura: una página con renglones de texto. Representa "ir a la
// lectura". Es el recíproco del ícono de la tirada.
export function IconoLectura({ size = 26, color = COLORES.marfil }: IconoProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={5}
        y={3.5}
        width={14}
        height={17}
        rx={2}
        stroke={color}
        strokeWidth={1.6}
        fill="none"
      />
      <Rect x={8} y={7.5} width={8} height={1.6} rx={0.8} fill={color} />
      <Rect x={8} y={11.2} width={8} height={1.6} rx={0.8} fill={color} />
      <Rect x={8} y={14.9} width={5} height={1.6} rx={0.8} fill={color} />
    </Svg>
  );
}
