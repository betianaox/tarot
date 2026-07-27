import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { FUENTE_TITULOS } from './constants/tipografia';
import { GemasProvider } from './context/GemasContext';
import { IdiomaProvider } from './context/IdiomaContext';
import { UsuarioProvider, cargarNombreGuardado } from './context/UsuarioContext';
import type { RootStackParamList } from './navigation/types';
import AjustesScreen from './screens/AjustesScreen';
import ConsejoDelDiaScreen from './screens/ConsejoDelDiaScreen';
import HomeScreen from './screens/HomeScreen';
import LecturaScreen from './screens/LecturaScreen';
import PreguntaScreen from './screens/PreguntaScreen';
import WikiScreen from './screens/WikiScreen';
import WikiDetalleScreen from './screens/WikiDetalleScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [assetsListos, setAssetsListos] = useState(false);
  const [nombreGuardado, setNombreGuardado] = useState<string | null>(null);
  const [nombreListo, setNombreListo] = useState(false);
  const [fuentesListas, fuenteError] = useFonts({
    [FUENTE_TITULOS]: require('./assets/fonts/MetalGothic-DemoVersion-Regular.ttf'),
  });

  useEffect(() => {
    Asset.loadAsync(require('./assets/bg-home.webp'))
      .catch(() => {})
      .finally(() => setAssetsListos(true));
    cargarNombreGuardado()
      .then(setNombreGuardado)
      .finally(() => setNombreListo(true));
  }, []);

  const isReady = assetsListos && nombreListo && (fuentesListas || !!fuenteError);

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
      <UsuarioProvider nombreInicial={nombreGuardado}>
        <IdiomaProvider>
          <GemasProvider>
            <View style={{ flex: 1 }} onLayout={onLayout}>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Home" component={HomeScreen} />
                  <Stack.Screen name="Pregunta" component={PreguntaScreen} />
                  <Stack.Screen name="Lectura" component={LecturaScreen} />
                  <Stack.Screen name="Wiki" component={WikiScreen} />
                  <Stack.Screen name="WikiDetalle" component={WikiDetalleScreen} />
                  <Stack.Screen name="ConsejoDelDia" component={ConsejoDelDiaScreen} />
                  <Stack.Screen name="Ajustes" component={AjustesScreen} />
                </Stack.Navigator>
              </NavigationContainer>
              <StatusBar style="light" />
            </View>
          </GemasProvider>
        </IdiomaProvider>
      </UsuarioProvider>
    </SafeAreaProvider>
  );
}
