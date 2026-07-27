import { Image, StyleSheet, Text, View } from 'react-native';

import type { CartaMeta } from '../content/types';

// Relación alto/ancho del arte (480×860). Se calcula el alto desde el ancho.
const RATIO = 860 / 480;

interface Props {
  meta: CartaMeta;
  // Ancho en px de layout. Ojo con la regla de no superar el 100%: el arte es
  // 480 px de ancho, así que en pantallas 3x conviene no pasar de ~160 dp.
  width: number;
  radio?: number;
}

// Muestra el arte de la carta, o un placeholder con el dorso (marco dorado +
// numeral) cuando todavía no está dibujada. El placeholder es el fallback
// visual, análogo al fallback de texto del motor de lecturas.
export default function CartaImagen({ meta, width, radio = 8 }: Props) {
  const height = width * RATIO;
  const dimensiones = { width, height, borderRadius: radio };

  if (meta.imagen != null) {
    return <Image source={meta.imagen} style={dimensiones} resizeMode="cover" />;
  }

  return (
    <View style={[styles.placeholder, dimensiones]}>
      <View style={[styles.placeholderMarco, { borderRadius: radio - 3 }]}>
        <Text style={styles.placeholderNumero}>{meta.numero}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: '#241a10',
    borderWidth: 1.5,
    borderColor: 'rgba(201, 162, 39, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  placeholderMarco: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'rgba(201, 162, 39, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderNumero: {
    color: 'rgba(245, 239, 224, 0.65)',
    fontSize: 22,
    fontWeight: '700',
  },
});
