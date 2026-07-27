import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConsejoDelDia'>;
};

// Stub: el Consejo del día (tres cartas boca abajo, elegir una, animación de
// dar vuelta y mostrarla grande con su consejo) se construye a continuación.
export default function ConsejoDelDiaScreen({ navigation }: Props) {
  const t = useTextos();

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{t.consejoDelDia.titulo}</Text>
          <Text style={styles.texto}>Tu carta del día te espera. Muy pronto.</Text>
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
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  titulo: {
    color: COLORES.marfil,
    fontSize: 30,
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
