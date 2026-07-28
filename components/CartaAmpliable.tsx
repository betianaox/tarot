import { MaterialCommunityIcons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Modal, Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';

import type { CartaMeta, Posicion } from '../content/types';
import CartaImagen from './CartaImagen';

const RATIO_H = 860 / 480;

// Envuelve la vista normal de una carta (`children`) y, al tocarla, abre un
// visor a pantalla completa con la carta lo más grande que entre (respetando el
// ratio). Se toca de nuevo para volver. Sirve para lucir el arte, que en el
// teléfono se ve chico. Mantiene la orientación (invertida) en el visor.
export default function CartaAmpliable({
  meta,
  posicion = 'normal',
  children,
}: {
  meta: CartaMeta;
  posicion?: Posicion;
  children: ReactNode;
}) {
  const [abierta, setAbierta] = useState(false);
  const { width, height } = useWindowDimensions();
  const invertida = posicion === 'invertida';

  // El mayor ancho que entra en pantalla respetando el ratio (alto manda en
  // cartas tan verticales).
  const anchoMax = Math.floor(Math.min(width * 0.94, (height * 0.86) / RATIO_H));

  return (
    <>
      <Pressable onPress={() => setAbierta(true)}>
        {children}
        {/* Avisa que la carta se agranda al tocarla: sin esto, nadie que no lo
            pruebe se entera. Botón redondo transparente (calcado del de cerrar)
            centrado sobre la carta. Va sobre el Pressable y no sobre el contenido
            para que en las cartas invertidas quede derecho, no de cabeza.
            pointerEvents none: el toque sigue siendo de la carta entera. */}
        <View style={styles.lupaCapa} pointerEvents="none">
          <View style={styles.lupaBoton}>
            <MaterialCommunityIcons name="magnify-plus-outline" size={20} color="#fff" />
          </View>
        </View>
      </Pressable>

      <Modal
        visible={abierta}
        transparent
        animationType="fade"
        onRequestClose={() => setAbierta(false)}
        statusBarTranslucent
      >
        <Pressable style={styles.fondo} onPress={() => setAbierta(false)}>
          <View style={invertida ? styles.invertida : undefined}>
            <CartaImagen meta={meta} width={anchoMax} radio={16} />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  invertida: {
    transform: [{ rotate: '180deg' }],
  },
  // Capa que centra el botón sobre la carta.
  lupaCapa: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Botón redondo transparente, mismo lenguaje que el de cerrar.
  lupaBoton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
