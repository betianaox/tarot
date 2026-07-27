import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import CartaImagen from '../components/CartaImagen';
import MarcoDorado from '../components/MarcoDorado';
import { CARTAS } from '../content/cartas/meta';
import type { CartaMeta, Palo } from '../content/types';
import { useCartas } from '../hooks/useCartas';
import { useTextos } from '../hooks/useTextos';
import { nombreDeCarta } from '../lib/nombreCarta';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Wiki'>;
};

const COLUMNAS = 3;
const PADDING = 20;
const GAP = 12;
const PALOS: Palo[] = ['bastos', 'copas', 'espadas', 'oros'];

export default function WikiScreen({ navigation }: Props) {
  const t = useTextos();
  const { nombres, wiki } = useCartas();
  const { width } = useWindowDimensions();

  // Ancho de cada miniatura para una grilla de 3 columnas. Queda bien por
  // debajo del ancho nativo del arte (480 px), así que nunca se agranda.
  const anchoItem = (width - PADDING * 2 - GAP * (COLUMNAS - 1)) / COLUMNAS;

  const mayores = CARTAS.filter((c) => c.arcano === 'mayor');
  const secciones: { titulo: string; cartas: CartaMeta[] }[] = [
    { titulo: t.wiki.arcanosMayores, cartas: mayores },
    ...PALOS.map((palo) => ({
      titulo: nombres.palos[palo],
      cartas: CARTAS.filter((c) => c.palo === palo),
    })),
  ];

  const renderCarta = (meta: CartaMeta) => {
    const nombre = nombreDeCarta(meta, nombres, wiki[meta.id]?.nombre);
    return (
      <Pressable
        key={meta.id}
        style={[styles.item, { width: anchoItem }]}
        onPress={() => navigation.navigate('WikiDetalle', { cartaId: meta.id })}
      >
        <CartaImagen meta={meta} width={anchoItem} />
        <Text style={styles.itemNombre} numberOfLines={2}>
          {nombre}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          <Text style={styles.titulo}>{t.wiki.titulo}</Text>
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          {secciones.map((seccion) => (
            <View key={seccion.titulo} style={styles.seccion}>
              <Text style={styles.seccionTitulo}>{seccion.titulo}</Text>
              <View style={styles.grilla}>{seccion.cartas.map(renderCarta)}</View>
            </View>
          ))}
        </ScrollView>
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
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 6,
  },
  titulo: {
    color: '#F5EFE0',
    fontSize: 24,
    fontWeight: '700',
  },
  scroll: {
    paddingHorizontal: PADDING,
    paddingTop: 12,
    paddingBottom: 28,
  },
  seccion: {
    marginTop: 20,
  },
  seccionTitulo: {
    color: '#D9B94A',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  grilla: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  item: {
    marginBottom: 4,
  },
  itemNombre: {
    color: 'rgba(245, 239, 224, 0.9)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },
});
