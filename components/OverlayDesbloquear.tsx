import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { useAnuncioRecompensado } from '../hooks/useAnuncioRecompensado';
import { useTextos } from '../hooks/useTextos';

interface Props {
  // La sección ofrecida (id para desbloquear, título para mostrar), o null si el
  // overlay está cerrado. `visible` se deriva de esto.
  seccion: { id: string; titulo: string } | null;
  onCerrar: () => void;
  onDesbloquear: (id: string) => void;
}

// Ofrece abrir toda una sección de la Wiki a cambio de un video corto. Solo
// desbloquea en el callback de recompensa: si el usuario cierra el video antes
// de terminarlo, no pasa nada.
export default function OverlayDesbloquear({ seccion, onCerrar, onDesbloquear }: Props) {
  const { listo, mostrar } = useAnuncioRecompensado();
  const t = useTextos();

  const onVerVideo = () => {
    if (!listo || !seccion) {
      return;
    }
    // Se captura el id ANTES de cerrar: onCerrar pone la sección en null, y la
    // recompensa llega después. Sin esta copia, desbloquearíamos "null".
    const id = seccion.id;
    onCerrar();
    mostrar(() => onDesbloquear(id));
  };

  return (
    <Modal
      visible={seccion !== null}
      transparent
      animationType="fade"
      onRequestClose={onCerrar}
    >
      <View style={styles.overlayFondo}>
        <View style={styles.overlayCard}>
          <Text style={styles.overlayTitulo}>{seccion?.titulo}</Text>
          <Text style={styles.overlayTexto}>{t.wiki.desbloquear}</Text>
          <Pressable
            style={[styles.botonVideo, !listo && styles.botonVideoDeshabilitado]}
            onPress={onVerVideo}
            disabled={!listo}
          >
            <Text style={styles.botonVideoTexto}>
              {listo ? t.overlaySinGemas.verVideo : t.overlaySinGemas.cargando}
            </Text>
          </Pressable>
          <Pressable onPress={onCerrar}>
            <Text style={styles.overlayCerrar}>{t.overlaySinGemas.ahoraNo}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlayFondo: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  overlayCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 28,
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  overlayTitulo: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  overlayTexto: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
  },
  botonVideo: {
    backgroundColor: '#2E7D32',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    marginTop: 4,
  },
  botonVideoDeshabilitado: {
    opacity: 0.4,
  },
  botonVideoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  overlayCerrar: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
});
