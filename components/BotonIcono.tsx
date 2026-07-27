import type { ReactNode } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { COLORES } from '../constants/colores';

// Botón circular con un ícono. Mismo estilo translúcido + borde dorado que el
// botón principal, en formato redondo. Los dos íconos recíprocos (tirada ⇄
// lectura) usan este mismo botón para leerse como un par.
export default function BotonIcono({
  children,
  onPress,
  accessibilityLabel,
}: {
  children: ReactNode;
  onPress: () => void;
  accessibilityLabel: string;
}) {
  return (
    <Pressable
      style={styles.boton}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderWidth: 1,
    borderColor: COLORES.oro,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
