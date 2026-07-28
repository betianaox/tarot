import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import BotonVoz from '../components/BotonVoz';
import CartaAmpliable from '../components/CartaAmpliable';
import CartaImagen from '../components/CartaImagen';
import MarcoDorado from '../components/MarcoDorado';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { CARTA_POR_ID } from '../content/cartas/meta';
import { useCartas } from '../hooks/useCartas';
import { useTextos } from '../hooks/useTextos';
import { nombreDeCarta } from '../lib/nombreCarta';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WikiDetalle'>;
  route: RouteProp<RootStackParamList, 'WikiDetalle'>;
};

export default function WikiDetalleScreen({ navigation, route }: Props) {
  const t = useTextos();
  const { nombres, wiki } = useCartas();
  const { width } = useWindowDimensions();

  const meta = CARTA_POR_ID[route.params.cartaId];
  const ficha = wiki[meta.id];
  const nombre = nombreDeCarta(meta, nombres, ficha?.nombre);

  // Lo que lee el TTS: el nombre y los significados de la ficha (sin las listas
  // de palabras clave, que sueltas suenan raras). Solo hay algo para leer si la
  // ficha está escrita.
  const textoFicha = ficha
    ? [
        nombre,
        `${t.wiki.derecho}. ${ficha.significado.normal}`,
        `${t.wiki.invertido}. ${ficha.significado.invertida}`,
        `${t.wiki.simbolismo}. ${ficha.simbolismo}`,
      ].join('\n\n')
    : '';

  // Cap del ancho para no superar el 100% del arte (480 px nativos).
  const anchoCarta = Math.min(width * 0.5, 160);

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.encabezado}>
          {/* Escuchar la ficha (solo si hay ficha escrita); se corta al salir. */}
          {ficha ? <BotonVoz texto={textoFicha} /> : <View />}
          <BotonCerrar onPress={() => navigation.goBack()} />
        </View>

        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.cabecera}>
            <CartaAmpliable meta={meta}>
              <CartaImagen meta={meta} width={anchoCarta} radio={10} />
            </CartaAmpliable>
            <Text style={styles.nombre}>{nombre}</Text>
          </View>

          {/* Datos estructurales (siempre disponibles). */}
          <View style={styles.datos}>
            <Dato etiqueta={t.wiki.numero} valor={String(meta.numero)} />
            {meta.elemento && (
              <Dato etiqueta={t.wiki.elemento} valor={nombres.elementos[meta.elemento]} />
            )}
            {meta.palo && <Dato etiqueta="Palo" valor={nombres.palos[meta.palo]} />}
          </View>

          {ficha ? (
            <>
              <Seccion titulo={t.wiki.palabrasClave}>
                <View style={styles.chips}>
                  <Text style={styles.chipEtiqueta}>{t.wiki.derecho}:</Text>
                  <Text style={styles.chipTexto}>{ficha.palabrasClave.normal.join(' · ')}</Text>
                </View>
                <View style={styles.chips}>
                  <Text style={styles.chipEtiqueta}>{t.wiki.invertido}:</Text>
                  <Text style={styles.chipTexto}>{ficha.palabrasClave.invertida.join(' · ')}</Text>
                </View>
              </Seccion>

              <Seccion titulo={t.wiki.derecho}>
                <Text style={styles.parrafo}>{ficha.significado.normal}</Text>
              </Seccion>

              <Seccion titulo={t.wiki.invertido}>
                <Text style={styles.parrafo}>{ficha.significado.invertida}</Text>
              </Seccion>

              <Seccion titulo={t.wiki.simbolismo}>
                <Text style={styles.parrafo}>{ficha.simbolismo}</Text>
              </Seccion>
            </>
          ) : (
            <Text style={styles.proximamente}>{t.wiki.proximamente}</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

function Dato({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <View style={styles.dato}>
      <Text style={styles.datoEtiqueta}>{etiqueta}</Text>
      <Text style={styles.datoValor}>{valor}</Text>
    </View>
  );
}

function Seccion({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <View style={styles.seccion}>
      <Text style={styles.seccionTitulo}>{titulo}</Text>
      {children}
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
    paddingBottom: 14,
  },
  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: LAYOUT.aire,
  },
  scroll: {
    paddingHorizontal: LAYOUT.aire,
    paddingTop: 8,
    paddingBottom: 32,
  },
  cabecera: {
    alignItems: 'center',
    gap: 14,
  },
  nombre: {
    color: COLORES.marfil,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 22,
    marginTop: 20,
    marginBottom: 4,
  },
  dato: {
    alignItems: 'center',
  },
  datoEtiqueta: {
    color: COLORES.oroClaro,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  datoValor: {
    color: COLORES.marfil,
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  seccion: {
    marginTop: 24,
  },
  seccionTitulo: {
    color: COLORES.oroClaro,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  parrafo: {
    color: 'rgba(245, 239, 224, 0.85)',
    fontSize: 15,
    lineHeight: 23,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 6,
    gap: 6,
  },
  chipEtiqueta: {
    color: 'rgba(245, 239, 224, 0.55)',
    fontSize: 14,
    fontWeight: '600',
  },
  chipTexto: {
    color: 'rgba(245, 239, 224, 0.85)',
    fontSize: 14,
    flexShrink: 1,
  },
  proximamente: {
    color: 'rgba(245, 239, 224, 0.55)',
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 40,
  },
});
