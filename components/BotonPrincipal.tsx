import { Pressable, StyleSheet, Text } from 'react-native';

import { COLORES } from '../constants/colores';

// Botón principal (acción primaria) compartido por todas las pantallas, para
// que todos se vean iguales: dorado sólido, centrado, al ancho de su contenido.
export default function BotonPrincipal({
  etiqueta,
  onPress,
}: {
  etiqueta: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.boton} onPress={onPress}>
      <Text style={styles.texto} numberOfLines={1}>
        {etiqueta}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Mismo look que los botones de la Home: translúcido oscuro + borde dorado +
  // texto marfil. Centrado y al ancho de su contenido.
  boton: {
    backgroundColor: 'rgba(15, 10, 4, 0.66)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORES.oro,
    paddingVertical: 16,
    paddingHorizontal: 44,
    alignItems: 'center',
    alignSelf: 'center',
  },
  texto: {
    color: COLORES.marfil,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
