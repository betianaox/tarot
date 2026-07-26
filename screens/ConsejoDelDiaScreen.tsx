import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MarcoDorado from '../components/MarcoDorado';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ConsejoDelDia'>;
};

// Stub de Fase 1: el Consejo del día (una carta diaria, gratis y persistida por
// fecha como en Runas) se construye en la Fase 3, sobre el modelo de la Fase 2.
export default function ConsejoDelDiaScreen({ navigation }: Props) {
  const t = useTextos();

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contenido}>
          <Text style={styles.titulo}>{t.consejoDelDia.titulo}</Text>
          <Text style={styles.texto}>Tu carta del día te espera. Muy pronto.</Text>
        </View>
        <Pressable style={styles.botonVolver} onPress={() => navigation.goBack()}>
          <Text style={styles.botonVolverTexto}>{t.consejoDelDia.volver}</Text>
        </Pressable>
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
  contenido: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 18,
  },
  titulo: {
    color: '#F5EFE0',
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
  botonVolver: {
    alignSelf: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.9)',
    backgroundColor: 'rgba(15, 10, 4, 0.5)',
    paddingVertical: 14,
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  botonVolverTexto: {
    color: '#F5EFE0',
    fontSize: 16,
    fontWeight: '600',
  },
});
