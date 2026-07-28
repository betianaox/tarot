import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { DORSO } from '../content/cartas/imagenes';
import type { CartaMeta } from '../content/types';
import CartaImagen from './CartaImagen';

// Relación alto/ancho del arte (480×860), igual que CartaImagen.
const RATIO = 860 / 480;

// Una carta de la grilla que puede estar dada vuelta (dorso) o revelada (arte).
// Cuando pasa de dorso a revelada Y `animar` es true, hace el giro de volteo;
// si no, aparece directamente en la cara que corresponde (sin animación, para
// no voltear en cada apertura las secciones que ya estaban abiertas).
export default function CartaFlip({
  meta,
  width,
  revelada,
  animar,
  retardo = 0,
}: {
  meta: CartaMeta;
  width: number;
  revelada: boolean;
  animar: boolean;
  retardo?: number;
}) {
  // 0 = dorso, 1 = frente.
  const giro = useRef(new Animated.Value(revelada ? 1 : 0)).current;
  const yaRevelada = useRef(revelada);

  useEffect(() => {
    if (revelada && !yaRevelada.current) {
      if (animar) {
        Animated.timing(giro, {
          toValue: 1,
          duration: 450,
          delay: retardo,
          useNativeDriver: true,
        }).start();
      } else {
        giro.setValue(1);
      }
    } else if (!revelada && yaRevelada.current) {
      giro.setValue(0);
    }
    yaRevelada.current = revelada;
  }, [revelada, animar, retardo, giro]);

  const height = width * RATIO;
  const rotDorso = giro.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });
  const rotFrente = giro.interpolate({ inputRange: [0, 1], outputRange: ['180deg', '360deg'] });

  return (
    <View style={{ width, height }}>
      <Animated.View
        style={[styles.cara, { transform: [{ perspective: 900 }, { rotateY: rotDorso }] }]}
      >
        <Image
          source={DORSO}
          style={{ width, height, borderRadius: 8 }}
          resizeMode="cover"
        />
      </Animated.View>
      <Animated.View
        style={[styles.cara, { transform: [{ perspective: 900 }, { rotateY: rotFrente }] }]}
      >
        <CartaImagen meta={meta} width={width} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Las dos caras ocupan el mismo lugar; backfaceVisibility oculta la que mira
  // hacia atrás en cada momento del giro.
  cara: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
});
