import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import BotonCerrar from '../components/BotonCerrar';
import CartaFlip from '../components/CartaFlip';
import MarcoDorado from '../components/MarcoDorado';
import OverlayDesbloquear from '../components/OverlayDesbloquear';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import { useDesbloqueos } from '../context/DesbloqueosContext';
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
const PADDING = LAYOUT.aire;
const GAP = 12;
const PALOS: Palo[] = ['bastos', 'copas', 'espadas', 'oros'];
// Cuántas cartas de cada sección se ven gratis, como muestra del día. El resto
// se abre mirando un video. No importa cuáles: un video abre la sección entera.
const CARTAS_GRATIS = 2;

export default function WikiScreen({ navigation }: Props) {
  const t = useTextos();
  const { nombres, wiki } = useCartas();
  const { width } = useWindowDimensions();
  const { estaDesbloqueada, desbloquear } = useDesbloqueos();

  // La sección ofrecida en el overlay de "mirá un video", o null si está cerrado.
  const [seccionAOfrecer, setSeccionAOfrecer] = useState<{ id: string; titulo: string } | null>(
    null,
  );
  // La sección que se acaba de desbloquear con un video: sus cartas hacen el
  // giro al revelarse. Solo esa se anima (las que ya estaban abiertas al abrir
  // la Wiki aparecen directo, sin voltear).
  const [seccionAnimada, setSeccionAnimada] = useState<string | null>(null);

  // Ancho de cada miniatura para una grilla de SIEMPRE 3 columnas, en cualquier
  // resolución. Math.floor deja unos px de holgura para que la suma de las 3 +
  // los gaps nunca supere el contenedor por redondeo (si no, la 3ª se va abajo).
  const anchoItem = Math.floor((width - PADDING * 2 - GAP * (COLUMNAS - 1)) / COLUMNAS);

  const mayores = CARTAS.filter((c) => c.arcano === 'mayor');
  const secciones: { id: string; titulo: string; cartas: CartaMeta[] }[] = [
    { id: 'mayores', titulo: t.wiki.arcanosMayores, cartas: mayores },
    ...PALOS.map((palo) => ({
      id: palo,
      titulo: nombres.palos[palo],
      cartas: CARTAS.filter((c) => c.palo === palo),
    })),
  ];

  // Una carta se puede abrir si su sección está desbloqueada, o si es una de las
  // primeras `CARTAS_GRATIS` (la muestra del día). El resto se ve de dorso y, al
  // tocarla, ofrece el video que abre toda la sección.
  const renderCarta = (
    meta: CartaMeta,
    indice: number,
    seccion: { id: string; titulo: string },
    desbloqueada: boolean,
  ) => {
    const nombre = nombreDeCarta(meta, nombres, wiki[meta.id]?.nombre);
    const accesible = desbloqueada || indice < CARTAS_GRATIS;
    const animar = seccion.id === seccionAnimada;

    return (
      <Pressable
        key={meta.id}
        style={[styles.item, { width: anchoItem }]}
        onPress={() =>
          accesible
            ? navigation.navigate('WikiDetalle', { cartaId: meta.id })
            : setSeccionAOfrecer({ id: seccion.id, titulo: seccion.titulo })
        }
      >
        <CartaFlip
          meta={meta}
          width={anchoItem}
          revelada={accesible}
          animar={animar}
          // Cascadeo: las cartas de la sección voltean en secuencia, no todas de
          // golpe. Solo cuenta para las que estaban bloqueadas (las gratis no giran).
          retardo={Math.max(0, indice - CARTAS_GRATIS) * 35}
        />
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
          {secciones.map((seccion) => {
            const desbloqueada = estaDesbloqueada(seccion.id);
            return (
              <View key={seccion.id} style={styles.seccion}>
                <Text style={styles.seccionTitulo}>{seccion.titulo}</Text>
                {!desbloqueada && (
                  <Pressable
                    style={styles.botonDesbloquear}
                    onPress={() =>
                      setSeccionAOfrecer({ id: seccion.id, titulo: seccion.titulo })
                    }
                  >
                    <Text style={styles.botonDesbloquearTexto} numberOfLines={2}>
                      🎬 {t.wiki.desbloquear.replace('{seccion}', seccion.titulo)}
                    </Text>
                  </Pressable>
                )}
                <View style={styles.grilla}>
                  {seccion.cartas.map((meta, i) => renderCarta(meta, i, seccion, desbloqueada))}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>

      <OverlayDesbloquear
        seccion={seccionAOfrecer}
        onCerrar={() => setSeccionAOfrecer(null)}
        onDesbloquear={(id) => {
          // Marcar la sección para que sus cartas hagan el giro, y abrirla.
          setSeccionAnimada(id);
          desbloquear(id);
        }}
      />
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
  titulo: {
    color: COLORES.marfil,
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
    color: COLORES.oroClaro,
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
  botonDesbloquear: {
    marginBottom: 14,
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.9)',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  botonDesbloquearTexto: {
    color: COLORES.marfil,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
});
