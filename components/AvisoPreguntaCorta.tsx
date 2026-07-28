import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useTextos } from '../hooks/useTextos';

interface Props {
  visible: boolean;
  onTirarIgual: () => void;
  onEscribirMas: () => void;
}

// Aviso suave cuando la pregunta es válida pero muy escueta: no bloquea, solo
// invita a dar más contexto para una lectura más precisa. La decisión queda
// en la persona. Card blanca con botón dorado, como el resto de los modales
// de Tarot (bienvenida, sin gemas).
export default function AvisoPreguntaCorta({ visible, onTirarIgual, onEscribirMas }: Props) {
  const t = useTextos();
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onEscribirMas}>
      <View style={styles.fondo}>
        <View style={styles.card}>
          <Text style={styles.titulo}>{t.avisoCorta.titulo}</Text>
          <Text style={styles.texto}>{t.avisoCorta.texto}</Text>
          <Pressable style={styles.botonPrincipal} onPress={onEscribirMas}>
            <Text style={styles.botonPrincipalTexto}>{t.avisoCorta.escribirMas}</Text>
          </Pressable>
          <Pressable onPress={onTirarIgual}>
            <Text style={styles.botonSecundario}>{t.avisoCorta.tirarIgual}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  titulo: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  texto: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    lineHeight: 21,
  },
  botonPrincipal: {
    backgroundColor: '#C9A227',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 4,
    width: '100%',
    alignItems: 'center',
  },
  botonPrincipalTexto: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: '700',
  },
  botonSecundario: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
});
