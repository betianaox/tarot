import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonIcono from '../components/BotonIcono';
import BotonVoz from '../components/BotonVoz';
import ContadorGemas from '../components/ContadorGemas';
import { IconoTirada } from '../components/iconos';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { PARRAFOS_EJEMPLO, TEXTO_LECTURA_DEMO } from '../content/demoLectura';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lectura'>;
  route: RouteProp<RootStackParamList, 'Lectura'>;
};

// Espeja la forma de la pantalla de lectura de Runas (pregunta arriba →
// contenedor de respuesta con scroll y degradé → botones), con los colores de
// Tarot. El motor de lectura se conecta en el próximo paso: por ahora el
// contenedor muestra un texto de ejemplo (ver content/demoLectura).
export default function LecturaScreen({ navigation, route }: Props) {
  const t = useTextos();
  const { pregunta } = route.params;

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <ContadorGemas />
        <View style={styles.contenedor}>
          {/* La pregunta arriba (dorada, como los títulos de Runas). */}
          <Text style={styles.pregunta} numberOfLines={3}>
            {pregunta}
          </Text>

          {/* Contenedor de respuesta (mismo comportamiento que en Runas). */}
          <View style={styles.bloqueTexto}>
            <ScrollView
              contentContainerStyle={styles.bloqueTextoScroll}
              showsVerticalScrollIndicator
              persistentScrollbar
              indicatorStyle="white"
            >
              {PARRAFOS_EJEMPLO.map((parrafo, indice) => (
                <Text key={indice} style={styles.textoLectura}>
                  {parrafo}
                </Text>
              ))}
            </ScrollView>
            <LinearGradient
              colors={['rgba(38, 14, 22, 0)', 'rgba(38, 14, 22, 0.6)']}
              style={styles.degradeInferior}
              pointerEvents="none"
            />
          </View>

          {/* Abajo, tres íconos en fila: volver a la tirada · escuchar · nueva
              pregunta. */}
          <View style={styles.pie}>
            <BotonIcono
              accessibilityLabel={t.pregunta.verTirada}
              onPress={() => navigation.goBack()}
            >
              <IconoTirada />
            </BotonIcono>
            <BotonVoz texto={TEXTO_LECTURA_DEMO} />
            <BotonIcono
              accessibilityLabel={t.pregunta.hacerOtra}
              onPress={() => navigation.navigate('Pregunta')}
            >
              <MaterialCommunityIcons name="crystal-ball" size={26} color={COLORES.marfil} />
            </BotonIcono>
          </View>
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
    paddingTop: LAYOUT.aireTop,
    paddingBottom: LAYOUT.aireTop,
    paddingHorizontal: LAYOUT.aire,
  },
  contenedor: {
    flex: 1,
    gap: 20,
    // Aire entre el contador de gemas y la pregunta.
    marginTop: 16,
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
  pie: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
});
