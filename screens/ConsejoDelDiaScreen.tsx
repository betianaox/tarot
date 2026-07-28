import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  PixelRatio,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import CartaAmpliable from '../components/CartaAmpliable';
import CartaImagen from '../components/CartaImagen';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { DORSO } from '../content/cartas/imagenes';
import { CARTA_POR_ID } from '../content/cartas/meta';
import type { CartaId } from '../content/types';
import { useCartas } from '../hooks/useCartas';
import { useTextos } from '../hooks/useTextos';
import {
  cartaDelConsejoDeHoy,
  guardarConsejoDeHoy,
  textoConsejo,
  tresParaConsejo,
} from '../lib/consejoDelDia';
import { nombreDeCarta } from '../lib/nombreCarta';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConsejoDelDia'>;
};

const RATIO_H = 860 / 480;

export default function ConsejoDelDiaScreen({ navigation }: Props) {
  const t = useTextos();
  const { consejos, consejoGenerico, nombres, wiki } = useCartas();
  const { width } = useWindowDimensions();

  const [cargando, setCargando] = useState(true);
  const [ofrecidas, setOfrecidas] = useState<CartaId[]>([]);
  const [elegida, setElegida] = useState<CartaId | null>(null);

  const flip = useRef(new Animated.Value(0)).current; // 0 = dorso, 1 = frente
  const opacidadConsejo = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    cartaDelConsejoDeHoy().then((carta) => {
      if (carta) {
        // Ya eligió hoy: se muestra la carta dada vuelta, sin volver a elegir.
        setElegida(carta);
        flip.setValue(1);
        opacidadConsejo.setValue(1);
      } else {
        setOfrecidas(tresParaConsejo());
      }
      setCargando(false);
    });
  }, [flip, opacidadConsejo]);

  const elegir = (carta: CartaId) => {
    setElegida(carta);
    guardarConsejoDeHoy(carta);
    flip.setValue(0);
    opacidadConsejo.setValue(0);
    Animated.sequence([
      Animated.timing(flip, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.timing(opacidadConsejo, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  };

  // La carta grande no supera el 100% del arte (480 px nativos) → no pixela.
  const anchoCarta = Math.min(width * 0.5, 480 / PixelRatio.get());
  const altoCarta = anchoCarta * RATIO_H;
  const anchoBack = Math.floor((width - LAYOUT.aire * 2 - 24) / 3);
  const altoBack = anchoBack * RATIO_H;

  const rotDorso = flip.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const rotFrente = flip.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{t.consejoDelDia.titulo}</Text>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        {!cargando && !elegida && (
          <View style={styles.centro}>
            <Text style={styles.prompt}>{t.consejoDelDia.elegir}</Text>
            <View style={styles.filaBacks}>
              {ofrecidas.map((id) => (
                <Pressable key={id} onPress={() => elegir(id)}>
                  <Image
                    source={DORSO}
                    style={{ width: anchoBack, height: altoBack, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                </Pressable>
              ))}
            </View>
          </View>
        )}

        {!cargando && elegida && (
          <ScrollView contentContainerStyle={styles.resultado}>
            <CartaAmpliable meta={CARTA_POR_ID[elegida]}>
              <View style={{ width: anchoCarta, height: altoCarta }}>
                <Animated.View
                  style={[styles.cara, { transform: [{ perspective: 900 }, { rotateY: rotDorso }] }]}
                >
                  <Image
                    source={DORSO}
                    style={{ width: anchoCarta, height: altoCarta, borderRadius: 10 }}
                    resizeMode="cover"
                  />
                </Animated.View>
                <Animated.View
                  style={[styles.cara, { transform: [{ perspective: 900 }, { rotateY: rotFrente }] }]}
                >
                  <CartaImagen meta={CARTA_POR_ID[elegida]} width={anchoCarta} radio={10} />
                </Animated.View>
              </View>
            </CartaAmpliable>

            <Animated.View style={[styles.bloqueConsejo, { opacity: opacidadConsejo }]}>
              <Text style={styles.nombre}>
                {nombreDeCarta(CARTA_POR_ID[elegida], nombres, wiki[elegida]?.nombre)}
              </Text>
              <Text style={styles.consejo}>{textoConsejo(elegida, consejos, consejoGenerico)}</Text>
              <Text style={styles.vuelveManana}>{t.consejoDelDia.vuelveManana}</Text>
            </Animated.View>
          </ScrollView>
        )}
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
    paddingTop: LAYOUT.aireTop,
    paddingBottom: LAYOUT.aireTop,
    paddingHorizontal: LAYOUT.aire,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titulo: {
    color: COLORES.marfil,
    fontSize: 24,
    fontWeight: '700',
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 28,
  },
  prompt: {
    color: COLORES.oroClaro,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 25,
  },
  filaBacks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  resultado: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 8,
    gap: 22,
  },
  cara: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  bloqueConsejo: {
    alignItems: 'center',
    gap: 12,
  },
  nombre: {
    color: COLORES.marfil,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },
  consejo: {
    color: 'rgba(245, 239, 224, 0.9)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  vuelveManana: {
    color: 'rgba(245, 239, 224, 0.5)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
  },
});
