import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import CartaImagen from '../components/CartaImagen';
import ContadorGemas from '../components/ContadorGemas';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { CARTA_POR_ID } from '../content/cartas/meta';
import { useTextos } from '../hooks/useTextos';
import { tirarCruz, type CartaTirada } from '../lib/tirarCruz';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pregunta'>;
};

// Relación alto/ancho del arte (480×860).
const RATIO_H = 860 / 480;
// Aire desde el marco dorado (pantalla con borde → más separación). Manda el
// ancho: este valor define cuánto respiran las cartas desde el borde.
const AIRE = 36;
// Alturas reservadas, en dp: encabezado (gemas/✕), pie (botones) y respiros.
const ALTO_ENCABEZADO = 52;
const ALTO_PIE = 66;
const RESPIRO = 16;
// Cadencia de la animación de entrada.
const PASO_MS = 170;

export default function PreguntaScreen({ navigation }: Props) {
  const t = useTextos();
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  // Un reparto por entrada a la pantalla (una tirada por pregunta).
  const [cartas] = useState<CartaTirada[]>(() => tirarCruz());

  // Una animación por slot (0=pos1 … 4=pos5). El orden del array define el
  // orden de entrada: 1→2→3→4→5.
  const anims = useRef([0, 1, 2, 3, 4].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    anims.forEach((a) => a.setValue(0));
    Animated.stagger(
      PASO_MS,
      anims.map((a) =>
        Animated.timing(a, { toValue: 1, duration: 300, useNativeDriver: true }),
      ),
    ).start();
  }, [cartas, anims]);

  // Tamaño de carta: el mayor que entre respetando ancho (3 columnas) y alto
  // (3 filas), dejando lugar para encabezado y pie. Proporcional/responsive.
  const gap = Math.round(width * 0.022);
  const anchoDisp = width - AIRE * 2;
  const altoDisp =
    height - insets.top - insets.bottom - ALTO_ENCABEZADO - ALTO_PIE - RESPIRO * 2;
  const anchoPorAncho = (anchoDisp - gap * 2) / 3;
  const anchoPorAlto = (altoDisp - gap * 2) / (3 * RATIO_H);
  const cartaW = Math.floor(Math.min(anchoPorAncho, anchoPorAlto));
  const cartaH = cartaW * RATIO_H;

  const renderCarta = (slot: number) => {
    const carta = cartas[slot];
    const meta = CARTA_POR_ID[carta.id];
    const anim = anims[slot];
    return (
      <Animated.View
        style={{
          opacity: anim,
          transform: [
            { scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.7, 1] }) },
          ],
        }}
      >
        <View style={carta.posicion === 'invertida' ? styles.invertida : undefined}>
          <CartaImagen meta={meta} width={cartaW} radio={6} />
        </View>
      </Animated.View>
    );
  };

  const filaAltura = { height: cartaH, marginBottom: gap };

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <ContadorGemas />
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        {/* La cruz arriba. */}
        <View style={styles.cruz}>
          <View style={{ width: cartaW * 3 + gap * 2 }}>
            <View style={[styles.filaCentrada, filaAltura]}>{renderCarta(3)}</View>
            <View style={[styles.filaRenglon, filaAltura, { gap }]}>
              {renderCarta(0)}
              {renderCarta(1)}
              {renderCarta(2)}
            </View>
            <View style={[styles.filaCentrada, { height: cartaH }]}>{renderCarta(4)}</View>
          </View>
        </View>

        <View style={styles.espaciador} />

        {/* Un solo botón al pie: ver la lectura (acción principal). "Hacer otra
            pregunta" vive en la pantalla de lectura, no acá. */}
        <View style={styles.pie}>
          <Pressable
            style={[styles.boton, styles.botonEnfasis]}
            onPress={() => navigation.navigate('Lectura', { cartas })}
          >
            <Text style={styles.botonTexto} numberOfLines={1}>
              {t.pregunta.verLectura}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORES.fondo,
  },
  safeArea: {
    flex: 1,
    paddingTop: 32,
    paddingBottom: RESPIRO,
  },
  encabezado: {
    height: ALTO_ENCABEZADO,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // Arriba ambos (las gemas usan alignSelf flex-start): así la ✕ queda a la
    // misma altura que el contador y no desalineada.
    alignItems: 'flex-start',
    paddingHorizontal: AIRE,
  },
  cruz: {
    alignItems: 'center',
    marginTop: RESPIRO,
  },
  espaciador: {
    flex: 1,
  },
  filaCentrada: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  filaRenglon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  invertida: {
    transform: [{ rotate: '180deg' }],
  },
  pie: {
    height: ALTO_PIE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boton: {
    borderRadius: 14,
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonEnfasis: {
    backgroundColor: 'rgba(201, 162, 39, 0.18)',
    borderColor: COLORES.oro,
  },
  botonTexto: {
    color: COLORES.marfil,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
