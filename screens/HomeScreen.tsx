import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { ImageBackground, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ContadorGemas from '../components/ContadorGemas';
import OverlaySinGemas from '../components/OverlaySinGemas';
import { FUENTE_TITULOS } from '../constants/tipografia';
import { useGemas } from '../context/GemasContext';
import { useUsuario } from '../context/UsuarioContext';
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
  const { gemas } = useGemas();
  const { nombre, establecerNombre } = useUsuario();
  const t = useTextos();
  const [mostrarOverlaySinGemas, setMostrarOverlaySinGemas] = useState(false);
  const [nombreIngresado, setNombreIngresado] = useState('');

  const onContinuarBienvenida = () => {
    if (!nombreIngresado.trim()) {
      return;
    }
    establecerNombre(nombreIngresado);
  };

  const onPresionarPregunta = () => {
    if (gemas > 0) {
      navigation.navigate('Pregunta');
    } else {
      setMostrarOverlaySinGemas(true);
    }
  };

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

        <Text style={styles.titulo}>Tarot</Text>

        <View style={styles.espaciador} />

        <View style={styles.botonera}>
          <Pressable style={styles.boton} onPress={onPresionarPregunta}>
            <Text style={styles.botonTexto}>{t.home.pregunta}</Text>
          </Pressable>

          <Pressable style={styles.boton} onPress={() => navigation.navigate('Wiki')}>
            <Text style={styles.botonTexto}>{t.home.wiki}</Text>
          </Pressable>

          <Pressable
            style={styles.boton}
            onPress={() => navigation.navigate('ConsejoDelDia')}
          >
            <Text style={styles.botonTexto}>{t.home.consejoDelDia}</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      <OverlaySinGemas
        visible={mostrarOverlaySinGemas}
        onCerrar={() => setMostrarOverlaySinGemas(false)}
      />

      <Modal visible={!nombre} transparent animationType="fade">
        <View style={styles.overlayFondo}>
          <View style={styles.overlayCard}>
            <Text style={styles.overlayTitulo}>{t.home.bienvenidoTitulo}</Text>
            <Text style={styles.overlayTexto}>{t.home.bienvenidoPregunta}</Text>
            <TextInput
              style={styles.inputNombre}
              placeholder={t.home.nombrePlaceholder}
              placeholderTextColor="rgba(0,0,0,0.4)"
              value={nombreIngresado}
              onChangeText={setNombreIngresado}
              autoFocus
              maxLength={30}
            />
            <Pressable
              style={[styles.botonContinuar, !nombreIngresado.trim() && styles.botonDeshabilitado]}
              onPress={onContinuarBienvenida}
              disabled={!nombreIngresado.trim()}
            >
              <Text style={styles.botonContinuarTexto}>{t.home.continuar}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  },
  botonAjustes: {
    marginTop: 10,
    marginRight: 28,
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
    fontSize: 92,
    textAlign: 'center',
    marginTop: 12,
    // Contorno/halo oscuro para despegar el marfil del fondo cálido.
    textShadowColor: 'rgba(0, 0, 0, 0.85)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 14,
  },
  espaciador: {
    flex: 1,
  },
  botonera: {
    paddingHorizontal: 24,
    paddingBottom: 12,
    gap: 14,
  },
  boton: {
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.9)',
    paddingVertical: 18,
    alignItems: 'center',
  },
  botonTexto: {
    color: MARFIL,
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  overlayFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  overlayCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  overlayTitulo: {
    fontSize: 20,
    fontWeight: '700',
  },
  overlayTexto: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
  },
  botonContinuar: {
    backgroundColor: '#C9A227',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 4,
    width: '100%',
    alignItems: 'center',
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  botonContinuarTexto: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: '700',
  },
  inputNombre: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1a1a2e',
  },
});
