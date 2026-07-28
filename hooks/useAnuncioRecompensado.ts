import { useCallback, useEffect, useRef, useState } from 'react';
import { AdEventType, RewardedAd, RewardedAdEventType } from 'react-native-google-mobile-ads';

import { AD_UNIT_ID_RECOMPENSADO } from '../constants/publicidad';

export function useAnuncioRecompensado() {
  const anuncioRef = useRef(RewardedAd.createForAdRequest(AD_UNIT_ID_RECOMPENSADO));
  const [listo, setListo] = useState(false);

  useEffect(() => {
    const anuncio = anuncioRef.current;

    const cancelarCargado = anuncio.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setListo(true);
    });
    const cancelarCerrado = anuncio.addAdEventListener(AdEventType.CLOSED, () => {
      setListo(false);
      anuncio.load();
    });

    anuncio.load();

    return () => {
      cancelarCargado();
      cancelarCerrado();
    };
  }, []);

  const mostrar = useCallback((onRecompensa: () => void) => {
    const anuncio = anuncioRef.current;
    // La recompensa se OTORGA al cerrar el anuncio (si se ganó), no al ganarla:
    // EARNED_REWARD llega con el anuncio todavía en pantalla, así que cualquier
    // animación disparada ahí quedaría tapada. Al esperar al CLOSED, el efecto
    // (p. ej. el flip de las cartas de la Wiki) se ve al volver a la app.
    let gano = false;
    const cancelarRecompensa = anuncio.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        gano = true;
      },
    );
    const cancelarCerrado = anuncio.addAdEventListener(AdEventType.CLOSED, () => {
      cancelarRecompensa();
      cancelarCerrado();
      if (gano) {
        onRecompensa();
      }
    });
    anuncio.show();
  }, []);

  return { listo, mostrar };
}
