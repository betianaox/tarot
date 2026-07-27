import { Pressable, StyleSheet, Text } from 'react-native';

// Botón de cierre estándar: una ✕ arriba a la derecha. Reemplaza a los enlaces
// "Volver" en todas las pantallas para que el cierre quede consistente.
export default function BotonCerrar({ onPress }: { onPress: () => void }) {
  return (
    <Pressable
      style={styles.boton}
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel="Cerrar"
    >
      <Text style={styles.texto}>✕</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
