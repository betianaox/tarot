import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AvisoPreguntaCorta from '../components/AvisoPreguntaCorta';
import ContadorGemas from '../components/ContadorGemas';
import MarcoDorado from '../components/MarcoDorado';
import OverlaySinGemas from '../components/OverlaySinGemas';
import { COLORES } from '../constants/colores';
import { LAYOUT } from '../constants/layout';
import type { Tema } from '../content/types';
import { useGemas } from '../context/GemasContext';
import { useIdioma } from '../context/IdiomaContext';
import { useTextos } from '../hooks/useTextos';
import { analizarPregunta } from '../lib/analizarPregunta';
import type { RootStackParamList } from '../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Pregunta'>;
};

// General primero y como default: si la pregunta no permite detectar un tema,
// se queda en general (respuesta genérica) en vez de contestar de amor a algo
// que no lo es. El autoajuste solo cambia el chip cuando detecta otro tema.
const TEMAS: Tema[] = ['general', 'amor', 'trabajo', 'dinero'];

const PADDING_HORIZONTAL = 24;

// Espeja la pantalla de preguntar de Runas (título, chips de tópico con
// autoajuste, input, botón con pill de costo) con los colores de Tarot. La
// diferencia de flujo: al tirar no revela acá, sino que abre la Tirada (la
// cruz); la gema se consume al entrar a esa pantalla, no antes.
export default function PreguntaScreen({ navigation }: Props) {
  const { gemas } = useGemas();
  const { idiomaConcreto } = useIdioma();
  const t = useTextos();
  const [temaElegido, setTemaElegido] = useState<Tema>('general');
  const [pregunta, setPregunta] = useState('');
  const [mostrarOverlaySinGemas, setMostrarOverlaySinGemas] = useState(false);
  const [mostrarAvisoCorta, setMostrarAvisoCorta] = useState(false);
  // Una vez que la persona toca un chip a mano, respetamos su elección y
  // dejamos de autoajustar el tema por lo que escribe.
  const [temaTocadoManual, setTemaTocadoManual] = useState(false);

  const analisis = useMemo(
    () => analizarPregunta(pregunta, idiomaConcreto),
    [pregunta, idiomaConcreto],
  );
  const preguntaEsValida = analisis.senal !== 'invalida';
  const mostrarHintCorta = pregunta.trim().length > 0 && analisis.senal === 'invalida';

  // Autoajuste de tema: si el texto parece de otro tema (y no es 'general'),
  // cambiamos el chip solo. Los chips siguen ahí para corregir a mano; en
  // cuanto la persona toca uno, dejamos de pisarle la elección.
  useEffect(() => {
    if (temaTocadoManual) {
      return;
    }
    if (analisis.temaTexto !== 'general' && analisis.temaTexto !== temaElegido) {
      setTemaElegido(analisis.temaTexto);
    }
  }, [analisis.temaTexto, temaTocadoManual, temaElegido]);

  // "Nueva pregunta" (el 🔮 de la Tirada/Lectura) vuelve acá en blanco: al
  // recuperar foco, reseteamos texto y tópico para empezar de cero.
  useEffect(() => {
    const quitar = navigation.addListener('focus', () => {
      setPregunta('');
      setTemaElegido('general');
      setTemaTocadoManual(false);
    });
    return quitar;
  }, [navigation]);

  // Paso de validación: decide si abre la tirada directo, avisa por pregunta
  // flaca, o manda al overlay de gemas. La gema se gasta recién en la Tirada.
  const onTirarLasCartas = () => {
    if (analisis.senal === 'invalida') {
      return;
    }
    if (gemas <= 0) {
      setMostrarOverlaySinGemas(true);
      return;
    }
    if (analisis.senal === 'flaca') {
      setMostrarAvisoCorta(true);
      return;
    }
    irALaTirada();
  };

  const irALaTirada = () => {
    navigation.navigate('Tirada', { pregunta: pregunta.trim(), tema: temaElegido });
  };

  return (
    <View style={styles.background}>
      <MarcoDorado />
      <SafeAreaView style={styles.safeArea}>
        <ContadorGemas />

        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          <Text style={styles.titulo}>{t.pregunta.titulo}</Text>

          <View style={styles.filaChips}>
            {TEMAS.map((tema) => {
              const seleccionado = tema === temaElegido;
              return (
                <Pressable
                  key={tema}
                  onPress={() => {
                    setTemaElegido(tema);
                    setTemaTocadoManual(true);
                  }}
                  style={[styles.chip, seleccionado && styles.chipSeleccionado]}
                >
                  <Text
                    style={[styles.chipTexto, seleccionado && styles.chipTextoSeleccionado]}
                    numberOfLines={1}
                  >
                    {t.pregunta.chips[tema]}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <TextInput
            style={styles.input}
            placeholder={t.pregunta.placeholder}
            placeholderTextColor="rgba(245, 239, 224, 0.5)"
            value={pregunta}
            onChangeText={setPregunta}
            multiline
            numberOfLines={4}
          />

          {mostrarHintCorta && <Text style={styles.hintCorta}>{t.pregunta.hintCorta}</Text>}

          <Pressable
            style={[
              styles.botonPrincipal,
              styles.botonConPill,
              !preguntaEsValida && styles.botonDeshabilitado,
            ]}
            onPress={onTirarLasCartas}
            disabled={!preguntaEsValida}
          >
            <Text style={styles.botonPrincipalTexto} numberOfLines={1}>
              {t.pregunta.tirar}
            </Text>
            <View style={styles.pillCosto}>
              <Text style={styles.pillCostoTexto} numberOfLines={1}>
                💎 1
              </Text>
            </View>
          </Pressable>
        </ScrollView>
      </SafeAreaView>

      <OverlaySinGemas
        visible={mostrarOverlaySinGemas}
        onCerrar={() => setMostrarOverlaySinGemas(false)}
      />

      <AvisoPreguntaCorta
        visible={mostrarAvisoCorta}
        onEscribirMas={() => setMostrarAvisoCorta(false)}
        onTirarIgual={() => {
          setMostrarAvisoCorta(false);
          irALaTirada();
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
    // Aire respecto del marco dorado, arriba y abajo (la home no lleva marco).
    paddingTop: LAYOUT.aireTop,
    paddingBottom: 14,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: PADDING_HORIZONTAL,
    paddingVertical: 24,
    gap: 24,
  },
  titulo: {
    color: COLORES.oroClaro,
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
  filaChips: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  chip: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(245, 239, 224, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 224, 0.3)',
    alignItems: 'center',
  },
  chipSeleccionado: {
    backgroundColor: COLORES.oro,
    borderColor: COLORES.oro,
  },
  chipTexto: {
    color: COLORES.marfil,
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextoSeleccionado: {
    color: '#1a1a2e',
  },
  input: {
    backgroundColor: 'rgba(245, 239, 224, 0.12)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(245, 239, 224, 0.3)',
    color: COLORES.marfil,
    fontSize: 16,
    padding: 20,
    minHeight: 140,
    marginVertical: 4,
    textAlignVertical: 'top',
  },
  hintCorta: {
    color: 'rgba(245, 239, 224, 0.75)',
    fontSize: 13,
    textAlign: 'center',
    marginTop: -8,
  },
  botonPrincipal: {
    backgroundColor: COLORES.oro,
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
  botonConPill: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  botonPrincipalTexto: {
    color: '#1a1a2e',
    fontSize: 17,
    fontWeight: '700',
  },
  pillCosto: {
    backgroundColor: 'rgba(0, 0, 0, 0.18)',
    borderRadius: 999,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  pillCostoTexto: {
    color: '#1a1a2e',
    fontSize: 14,
    fontWeight: '700',
  },
});
