import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import CartaImagen from '../components/CartaImagen';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { CARTA_POR_ID } from '../content/cartas/meta';
import { tirarCruz, type CartaTirada } from '../lib/tirarCruz';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pregunta'>;
};

// Relación alto/ancho del arte (480×860).
const RATIO_H = 860 / 480;
// Alto reservado para el encabezado (✕) y el pie (botones), en dp.
const ALTO_ENCABEZADO = 52;
const ALTO_PIE = 92;
// Cadencia de la animación de entrada.
const PASO_MS = 170;

export default function PreguntaScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const [cartas, setCartas] = useState<CartaTirada[]>(() => tirarCruz());

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
  // (3 filas). Proporcional para adaptarse a distintas resoluciones.
  const gap = Math.round(width * 0.022);
  const padH = 16;
  const anchoDisp = width - padH * 2;
  const altoDisp =
    height - insets.top - insets.bottom - ALTO_ENCABEZADO - ALTO_PIE;
  const anchoPorAncho = (anchoDisp - gap * 2) / 3;
  const anchoPorAlto = (altoDisp - gap * 2) / (3 * RATIO_H);
  const cartaW = Math.floor(Math.min(anchoPorAncho, anchoPorAlto));
  const cartaH = cartaW * RATIO_H;

  const verLectura = () => navigation.navigate('Lectura', { cartas });

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
        <View
          style={carta.posicion === 'invertida' ? styles.invertida : undefined}
        >
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
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        <View style={styles.centro}>
          <View style={{ width: cartaW * 3 + gap * 2 }}>
            {/* Arriba de la 2: slot 3 (pos4). */}
            <View style={[styles.filaCentrada, filaAltura]}>{renderCarta(3)}</View>
            {/* Renglón 1-2-3. */}
            <View style={[styles.filaRenglon, filaAltura, { gap }]}>
              {renderCarta(0)}
              {renderCarta(1)}
              {renderCarta(2)}
            </View>
            {/* Abajo de la 2: slot 4 (pos5). Sin margen inferior. */}
            <View style={[styles.filaCentrada, { height: cartaH }]}>
              {renderCarta(4)}
            </View>
          </View>
        </View>

        <View style={styles.pie}>
          <Pressable style={styles.botonLectura} onPress={verLectura}>
            <Text style={styles.botonLecturaTexto}>Ver la lectura</Text>
          </Pressable>
          <Pressable onPress={() => setCartas(tirarCruz())} hitSlop={8}>
            <Text style={styles.barajar}>Barajar de nuevo</Text>
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
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 16,
  },
  encabezado: {
    height: ALTO_ENCABEZADO,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 8,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    gap: 10,
  },
  botonLectura: {
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORES.oro,
    paddingVertical: 15,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  botonLecturaTexto: {
    color: COLORES.marfil,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  barajar: {
    color: 'rgba(245, 239, 224, 0.5)',
    fontSize: 13,
  },
});
