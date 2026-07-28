import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { COLORES } from './constants/colores';
import { FUENTE_TITULOS } from './constants/tipografia';
import { DesbloqueosProvider } from './context/DesbloqueosContext';
import { GemasProvider } from './context/GemasContext';
import { IdiomaProvider } from './context/IdiomaContext';
import type { RootStackParamList } from './navigation/types';
import AjustesScreen from './screens/AjustesScreen';
import ConsejoDelDiaScreen from './screens/ConsejoDelDiaScreen';
import HomeScreen from './screens/HomeScreen';
import LecturaScreen from './screens/LecturaScreen';
import PreguntaScreen from './screens/PreguntaScreen';
import TiradaScreen from './screens/TiradaScreen';
import WikiScreen from './screens/WikiScreen';
import WikiDetalleScreen from './screens/WikiDetalleScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

// Tema oscuro para la navegación: el fondo por defecto era blanco y se veía
// detrás de la barra de Android (transparente en edge-to-edge de Expo 57),
// dándole ese gris claro. Con el fondo bordó, la barra queda oscura.
const TEMA_OSCURO = {
  ...DarkTheme,
  colors: { ...DarkTheme.colors, background: COLORES.fondo },
};

export default function App() {
  const [assetsListos, setAssetsListos] = useState(false);
  const [fuentesListas, fuenteError] = useFonts({
    [FUENTE_TITULOS]: require('./assets/fonts/Celtica-Bold.ttf'),
  });

  useEffect(() => {
    // Fondo nativo de la ventana en bordó: es lo que se ve detrás de la barra
    // de Android (transparente en edge-to-edge), para que quede oscura. En el
    // dev client actual el módulo nativo todavía no está (se agrega en el build),
    // así que se protege con try/catch para no romper.
    try {
      SystemUI.setBackgroundColorAsync(COLORES.fondo).catch(() => {});
    } catch {
      // módulo nativo ausente en el dev client
    }
    Asset.loadAsync(require('./assets/bg-home.webp'))
      .catch(() => {})
      .finally(() => setAssetsListos(true));
  }, []);

  const isReady = assetsListos && (fuentesListas || !!fuenteError);

  const onLayout = useCallback(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <IdiomaProvider>
          <GemasProvider>
            <DesbloqueosProvider>
            <View style={{ flex: 1, backgroundColor: COLORES.fondo }} onLayout={onLayout}>
              <NavigationContainer theme={TEMA_OSCURO}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Pregunta" component={PreguntaScreen} />
                  <Stack.Screen name="Tirada" component={TiradaScreen} />
                  <Stack.Screen name="Lectura" component={LecturaScreen} />
                  <Stack.Screen name="Wiki" component={WikiScreen} />
                  <Stack.Screen name="WikiDetalle" component={WikiDetalleScreen} />
                  <Stack.Screen name="ConsejoDelDia" component={ConsejoDelDiaScreen} />
                  <Stack.Screen name="Ajustes" component={AjustesScreen} />
                </Stack.Navigator>
              </NavigationContainer>
              <StatusBar style="light" />
            </View>
            </DesbloqueosProvider>
          </GemasProvider>
      </IdiomaProvider>
    </SafeAreaProvider>
  );
}
