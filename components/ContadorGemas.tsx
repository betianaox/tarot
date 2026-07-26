import { StyleSheet, Text, View } from 'react-native';
import { useGemas } from '../context/GemasContext';

export default function ContadorGemas() {
  const { gemas } = useGemas();

  return (
    <View style={styles.contador}>
      <Text style={styles.texto}>💎 {gemas}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contador: {
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 28,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  texto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
