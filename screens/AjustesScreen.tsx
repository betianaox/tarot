import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { useIdioma, type Idioma } from '../context/IdiomaContext';
import { useTextos } from '../hooks/useTextos';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Ajustes'>;
};

export default function AjustesScreen({ navigation }: Props) {
  const { idioma, establecerIdioma } = useIdioma();
  const t = useTextos();

  // Automático primero, y debajo todas las lenguas explícitas (incluido
  // Español) para que se puedan elegir aunque el automático ya sea una de ellas.
  const idiomas: { id: Idioma; etiqueta: string }[] = [
    { id: 'auto', etiqueta: t.ajustes.idiomaAuto },
    { id: 'es', etiqueta: 'Español' },
    { id: 'en', etiqueta: 'English' },
    { id: 'pt', etiqueta: 'Português' },
    { id: 'it', etiqueta: 'Italiano' },
  ];

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{t.ajustes.titulo}</Text>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <Text style={styles.seccionTitulo}>{t.ajustes.seccionIdioma}</Text>
          <View style={styles.listaIdiomas}>
            {idiomas.map((opcion) => {
              const seleccionado = opcion.id === idioma;
              return (
                <Pressable
                  key={opcion.id}
                  style={[styles.opcionIdioma, seleccionado && styles.opcionIdiomaSeleccionada]}
                  onPress={() => establecerIdioma(opcion.id)}
                >
                  <Text style={styles.opcionIdiomaTexto}>{opcion.etiqueta}</Text>
                  {seleccionado && <Text style={styles.opcionIdiomaCheck}>✓</Text>}
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.seccionTitulo}>{t.ajustes.seccionSobre}</Text>
          <Text style={styles.disclaimer}>{t.ajustes.disclaimer}</Text>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    // Bordó muy oscuro (identidad de Tarot). El marco y los acentos dorados resaltan.
    backgroundColor: COLORES.fondo,
  },
  safeArea: {
    flex: 1,
    // Aire desde el marco dorado (consistente con las demás pantallas).
    paddingTop: LAYOUT.aireTop,
    paddingBottom: LAYOUT.aireTop,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.aire,
  },
  titulo: {
    color: COLORES.marfil,
    fontSize: 24,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: LAYOUT.aire,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 12,
  },
  seccionTitulo: {
    color: COLORES.oroClaro,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 12,
  },
  listaIdiomas: {
    gap: 10,
  },
  opcionIdioma: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 18,
  },
  opcionIdiomaSeleccionada: {
    borderColor: '#C9A227',
    backgroundColor: 'rgba(201, 162, 39, 0.15)',
  },
  opcionIdiomaTexto: {
    color: '#fff',
    fontSize: 16,
  },
  opcionIdiomaCheck: {
    color: '#D9B94A',
    fontSize: 16,
    fontWeight: '700',
  },
  disclaimer: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 14,
    lineHeight: 21,
  },
});
