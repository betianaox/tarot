import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lectura'>;
};

// Espeja la forma de la pantalla de lectura de Runas (pregunta arriba →
// contenedor de respuesta con scroll y degradé → botón), con los colores de
// Tarot. El motor de lectura (2 párrafos) se conecta en el próximo paso: por
// ahora el contenedor muestra un texto de ejemplo para calibrar la forma.
const PREGUNTA_EJEMPLO = '¿Qué necesito ver de esta situación?';
const PARRAFO_1 =
  'Acá va el primer párrafo: la lectura de las tres cartas del renglón, ' +
  'nombrando cada carta la primera vez y relacionando sus significados con la ' +
  'pregunta. Este texto es de ejemplo para ver cómo se comporta el contenedor: ' +
  'crece, hace scroll si hace falta y se desvanece abajo.';
const PARRAFO_2 =
  'Y acá el segundo párrafo: se suma la carta de arriba (lo que la persona ' +
  'tiene en la cabeza) y la de abajo (el próximo movimiento, el futuro cercano). ' +
  'Cuando conectemos el motor, este bloque se arma solo a partir de las cinco ' +
  'cartas y del análisis de la pregunta.';

export default function LecturaScreen({ navigation }: Props) {
  const t = useTextos();

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contenedor}>
          {/* La pregunta arriba (dorada, como los títulos de Runas). */}
          <Text style={styles.pregunta} numberOfLines={3}>
            {PREGUNTA_EJEMPLO}
          </Text>

          {/* Contenedor de respuesta (mismo comportamiento que en Runas). */}
          <View style={styles.bloqueTexto}>
            <ScrollView
              contentContainerStyle={styles.bloqueTextoScroll}
              showsVerticalScrollIndicator
              persistentScrollbar
              indicatorStyle="white"
            >
              <Text style={styles.textoLectura}>{PARRAFO_1}</Text>
              <Text style={styles.textoLectura}>{PARRAFO_2}</Text>
            </ScrollView>
            <LinearGradient
              colors={['rgba(38, 14, 22, 0)', 'rgba(38, 14, 22, 0.6)']}
              style={styles.degradeInferior}
              pointerEvents="none"
            />
          </View>

          {/* Botón abajo. */}
          <Pressable style={styles.botonPrincipal} onPress={() => navigation.navigate('Pregunta')}>
            <Text style={styles.botonPrincipalTexto} numberOfLines={1}>
              {t.pregunta.hacerOtra}
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
    // Más aire arriba (sobre la pregunta) y abajo (bajo el botón).
    paddingTop: LAYOUT.aireTop + 16,
    paddingBottom: LAYOUT.aireTop,
    paddingHorizontal: LAYOUT.aire,
  },
  contenedor: {
    flex: 1,
    gap: 20,
  },
  pregunta: {
    // Dorada como los títulos de Runas, sin comillas ni negrita.
    color: COLORES.oroClaro,
    fontSize: 21,
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 28,
  },
  bloqueTexto: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.3)',
    borderRadius: 16,
    backgroundColor: 'rgba(245, 239, 224, 0.05)',
  },
  bloqueTextoScroll: {
    flexGrow: 1,
    justifyContent: 'center',
    gap: 20,
    padding: 18,
  },
  degradeInferior: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 28,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  textoLectura: {
    color: COLORES.marfil,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  botonPrincipal: {
    backgroundColor: COLORES.oro,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 44,
    alignItems: 'center',
    // Centrado, al ancho de su contenido (no todo el ancho).
    alignSelf: 'center',
  },
  botonPrincipalTexto: {
    color: '#2A1016',
    fontSize: 17,
    fontWeight: '700',
  },
});
