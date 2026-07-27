import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lectura'>;
};

// Stub: el motor de lectura (2 párrafos, nombre-una-vez, con fallback) se
// construye a continuación. Por ahora recibe las cartas y muestra un placeholder.
export default function LecturaScreen({ navigation }: Props) {
  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.contenido}>
          <Text style={styles.texto}>La lectura va acá. Muy pronto.</Text>
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
  },
  texto: {
    color: 'rgba(245, 239, 224, 0.75)',
    fontSize: 16,
    textAlign: 'center',
  },
});
