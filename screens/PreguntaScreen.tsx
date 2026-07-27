import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import MarcoDorado from '../components/MarcoDorado';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pregunta'>;
};

// Stub: la tirada propia (cruz de 5 cartas con animación y lectura en otra
// pantalla) se construye a continuación.
export default function PreguntaScreen({ navigation }: Props) {
  const t = useTextos();

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{t.pregunta.titulo}</Text>
          <Text style={styles.texto}>Muy pronto vas a poder hacer tu tirada aquí.</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#17100A',
  },
  safeArea: {
    flex: 1,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 32,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 6,
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  titulo: {
    color: '#F5EFE0',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  texto: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
});
