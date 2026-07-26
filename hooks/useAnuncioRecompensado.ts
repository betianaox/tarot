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
    const cancelarRecompensa = anuncio.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      () => {
        onRecompensa();
        cancelarRecompensa();
      },
    );
    anuncio.show();
  }, []);

  return { listo, mostrar };
}
