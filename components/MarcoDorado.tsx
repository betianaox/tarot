import { useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';

const MARGEN = 14;
const RADIO = 20;
const TAMANO_ESQUINA = 34;

// Marco decorativo para las pantallas de fondo plano (Pregunta, Consejo del
// día, Wiki, Ajustes, Bienvenida). Va afuera de SafeAreaView (mide la pantalla
// completa con onLayout) y resta los insets a mano con useSafeAreaInsets,
// porque un elemento position:absolute llena el "padding box" del
// contenedor — meterlo adentro de SafeAreaView no alcanza para que respete
// su padding, hay que restar los insets nosotros mismos.
export default function MarcoDorado() {
  const insets = useSafeAreaInsets();
  const [tamano, setTamano] = useState<{ width: number; height: number } | null>(null);

  const onLayout = (evento: LayoutChangeEvent) => {
    const { width, height } = evento.nativeEvent.layout;
    setTamano({ width, height });
  };

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none" onLayout={onLayout}>
      {tamano && <Marco width={tamano.width} height={tamano.height} insets={insets} />}
    </View>
  );
}

function Marco({
  width,
  height,
  insets,
}: {
  width: number;
  height: number;
  insets: EdgeInsets;
}) {
  const x = MARGEN + insets.left;
  const y = MARGEN + insets.top;
  const w = width - MARGEN * 2 - insets.left - insets.right;
  const h = height - MARGEN * 2 - insets.top - insets.bottom;

  const esquinas = [
    { cx: x, cy: y, rotacion: 0 },
    { cx: x + w, cy: y, rotacion: 90 },
    { cx: x + w, cy: y + h, rotacion: 180 },
    { cx: x, cy: y + h, rotacion: 270 },
  ];

  return (
    <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
      <Defs>
        <LinearGradient id="bisel" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#F3D27A" />
          <Stop offset="0.5" stopColor="#C9A227" />
          <Stop offset="1" stopColor="#8A6A15" />
        </LinearGradient>
      </Defs>

      <Rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={RADIO}
        ry={RADIO}
        stroke="url(#bisel)"
        strokeWidth={2.5}
        fill="none"
      />

      {esquinas.map((esquina, indice) => (
        <Path
          key={indice}
          d={`M2,${TAMANO_ESQUINA} L2,14 Q2,2 14,2 L${TAMANO_ESQUINA},2 M8,${TAMANO_ESQUINA - 10} Q8,8 ${TAMANO_ESQUINA - 10},8`}
          stroke="#D9B94A"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          transform={`translate(${esquina.cx}, ${esquina.cy}) rotate(${esquina.rotacion})`}
        />
      ))}
    </Svg>
  );
}
