import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Lectura'>;
};

const AIRE = 30;

// Stub: el motor de lectura (2 párrafos, nombre-una-vez, con fallback) se
// construye a continuación. Por ahora recibe las cartas y muestra un placeholder.
// "Hacer otra pregunta" vive acá (no en la tirada): desde la lectura la persona
// arranca una consulta nueva.
export default function LecturaScreen({ navigation }: Props) {
  const t = useTextos();

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
        <View style={styles.pie}>
          <Pressable style={styles.boton} onPress={() => navigation.navigate('Pregunta')}>
            <Text style={styles.botonTexto} numberOfLines={1}>
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
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: AIRE,
  },
  encabezado: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
  pie: {
    flexDirection: 'row',
  },
  boton: {
    flex: 1,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.55)',
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botonTexto: {
    color: 'rgba(245, 239, 224, 0.85)',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
});
