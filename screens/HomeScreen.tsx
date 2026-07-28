import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContadorGemas from '../components/ContadorGemas';
import { COLORES } from '../constants/colores';
import { FUENTE_TITULOS } from '../constants/tipografia';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

// Marfil del título — misma tipografía que Runas (MetalGothic) pero con
// identidad propia: cálido y luminoso para despegarse del dorado del fondo,
// que es la escena recargada de arcanos. El contorno oscuro (textShadow) lo
// separa de la textura de la ilustración.
const MARFIL = '#F5EFE0';

export default function HomeScreen({ navigation }: Props) {
  const t = useTextos();

  // El gate de gemas vive en la pantalla de pregunta (al tirar), como en Runas.
  const onPresionarPregunta = () => navigation.navigate('Pregunta');

  return (
    <ImageBackground
      source={require('../assets/bg-home.webp')}
      style={styles.background}
      resizeMode="cover"
    >
      {/* Scrim superior: oscurece el cielo para que las gemas, el config y el
          título marfil se lean sobre la parte más clara de la escena. */}
      <LinearGradient
        colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0.15)', 'transparent']}
        style={styles.scrimSuperior}
        pointerEvents="none"
      />
      {/* Scrim inferior: asienta los tres botones sobre el piso de mosaico,
          la zona menos protagonista de la ilustración. */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.55)', 'rgba(0,0,0,0.82)']}
        style={styles.scrimInferior}
        pointerEvents="none"
      />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.filaSuperior}>
          <ContadorGemas />
          <Pressable
            style={styles.botonAjustes}
            onPress={() => navigation.navigate('Ajustes')}
            hitSlop={8}
          >
            <Text style={styles.botonAjustesTexto}>⚙</Text>
          </Pressable>
        </View>

        <Text style={styles.titulo}>TAROT</Text>

        <View style={styles.espaciador} />

        <View style={styles.botonera}>
          <Pressable style={styles.boton} onPress={onPresionarPregunta}>
            <MaterialCommunityIcons name="crystal-ball" size={22} color={MARFIL} />
            <Text style={styles.botonTexto}>{t.home.pregunta}</Text>
          </Pressable>

          <Pressable style={styles.boton} onPress={() => navigation.navigate('Wiki')}>
            <MaterialCommunityIcons name="book-open-variant" size={22} color={MARFIL} />
            <Text style={styles.botonTexto}>{t.home.wiki}</Text>
          </Pressable>

          <Pressable
            style={styles.boton}
            onPress={() => navigation.navigate('ConsejoDelDia')}
          >
            <MaterialCommunityIcons name="lightbulb-on-outline" size={22} color={MARFIL} />
            <Text style={styles.botonTexto}>{t.home.consejoDelDia}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scrimSuperior: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '28%',
  },
  scrimInferior: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '42%',
  },
  safeArea: {
    flex: 1,
  },
  filaSuperior: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // Home no tiene marco dorado: padding chico, pegado al borde de pantalla.
    paddingTop: 10,
    paddingHorizontal: 24,
  },
  botonAjustes: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonAjustesTexto: {
    color: '#fff',
    fontSize: 20,
  },
  titulo: {
    fontFamily: FUENTE_TITULOS,
    fontWeight: 'normal',
    fontStyle: 'normal',
    color: MARFIL,
    fontSize: 76,
    textAlign: 'center',
    marginTop: 12,
    // Halo bordó reforzado para despegar el marfil del fondo cálido.
    textShadowColor: COLORES.bordo,
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 22,
  },
  espaciador: {
    flex: 1,
  },
  botonera: {
    paddingHorizontal: 24,
    paddingBottom: 26,
    gap: 14,
  },
  boton: {
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.9)',
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  botonTexto: {
    color: MARFIL,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
