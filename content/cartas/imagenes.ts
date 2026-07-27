import type { CartaId } from '../types';

import i0 from '../../assets/cards/00-the-fool.webp';
import i1 from '../../assets/cards/01-the-magician.webp';
import i2 from '../../assets/cards/02-the-high-priestess.webp';
import i3 from '../../assets/cards/03-the-empress.webp';
import i4 from '../../assets/cards/04-the-emperor.webp';
import i5 from '../../assets/cards/05-the-hierophant.webp';
import i6 from '../../assets/cards/06-the-lovers.webp';
import i7 from '../../assets/cards/07-the-chariot.webp';
import i8 from '../../assets/cards/08-strength.webp';
import i9 from '../../assets/cards/09-the-hermit.webp';
import i10 from '../../assets/cards/10-the-wheel-of-fortune.webp';
import i11 from '../../assets/cards/11-justice.webp';
import i12 from '../../assets/cards/12-the-hanged-man.webp';
import i13 from '../../assets/cards/13-death.webp';
import i14 from '../../assets/cards/14-temperance.webp';
import i15 from '../../assets/cards/15-the-devil.webp';
import i16 from '../../assets/cards/16-the-tower.webp';
import i17 from '../../assets/cards/17-the-star.webp';
import i18 from '../../assets/cards/18-the-moon.webp';
import i19 from '../../assets/cards/19-the-sun.webp';
import i20 from '../../assets/cards/20-judgement.webp';
import i21 from '../../assets/cards/21-the-world.webp';
import i22 from '../../assets/cards/copas-as.webp';
import i23 from '../../assets/cards/copas-dos.webp';
import i24 from '../../assets/cards/copas-tres.webp';
import i25 from '../../assets/cards/copas-cuatro.webp';
import i26 from '../../assets/cards/copas-cinco.webp';
import i27 from '../../assets/cards/copas-seis.webp';
import i28 from '../../assets/cards/copas-siete.webp';
import i29 from '../../assets/cards/copas-ocho.webp';
import i30 from '../../assets/cards/copas-nueve.webp';
import i31 from '../../assets/cards/copas-diez.webp';
import i32 from '../../assets/cards/copas-sota.webp';
import i33 from '../../assets/cards/copas-caballo.webp';
import i34 from '../../assets/cards/copas-reina.webp';
import i35 from '../../assets/cards/copas-rey.webp';
import i36 from '../../assets/cards/oros-as.webp';
import i37 from '../../assets/cards/oros-dos.webp';
import i38 from '../../assets/cards/oros-tres.webp';
import i39 from '../../assets/cards/oros-cuatro.webp';
import i40 from '../../assets/cards/oros-cinco.webp';
import i41 from '../../assets/cards/oros-seis.webp';
import i42 from '../../assets/cards/oros-siete.webp';
import i43 from '../../assets/cards/oros-ocho.webp';
import i44 from '../../assets/cards/oros-nueve.webp';
import i45 from '../../assets/cards/oros-diez.webp';
import i46 from '../../assets/cards/oros-sota.webp';
import i47 from '../../assets/cards/oros-caballo.webp';
import i48 from '../../assets/cards/oros-reina.webp';
import i49 from '../../assets/cards/oros-rey.webp';
import i50 from '../../assets/cards/espadas-as.webp';
import i51 from '../../assets/cards/espadas-dos.webp';
import i52 from '../../assets/cards/espadas-tres.webp';
import i53 from '../../assets/cards/espadas-cuatro.webp';
import i54 from '../../assets/cards/espadas-cinco.webp';
import i55 from '../../assets/cards/espadas-seis.webp';
import i56 from '../../assets/cards/espadas-siete.webp';
import i57 from '../../assets/cards/espadas-ocho.webp';
import i58 from '../../assets/cards/espadas-nueve.webp';
import i59 from '../../assets/cards/espadas-diez.webp';
import i60 from '../../assets/cards/espadas-sota.webp';
import i61 from '../../assets/cards/espadas-caballo.webp';
import i62 from '../../assets/cards/espadas-reina.webp';
import i63 from '../../assets/cards/espadas-rey.webp';
import i64 from '../../assets/cards/bastos-as.webp';
import i65 from '../../assets/cards/bastos-dos.webp';
import i66 from '../../assets/cards/bastos-tres.webp';
import i67 from '../../assets/cards/bastos-cuatro.webp';
import i68 from '../../assets/cards/bastos-cinco.webp';
import i69 from '../../assets/cards/bastos-seis.webp';
import i70 from '../../assets/cards/bastos-siete.webp';
import i71 from '../../assets/cards/bastos-ocho.webp';
import i72 from '../../assets/cards/bastos-nueve.webp';
import i73 from '../../assets/cards/bastos-diez.webp';
import i74 from '../../assets/cards/bastos-sota.webp';
import i75 from '../../assets/cards/bastos-caballo.webp';
import i76 from '../../assets/cards/bastos-reina.webp';
import i77 from '../../assets/cards/bastos-rey.webp';
import reverso from '../../assets/cards/reverso.webp';

// Generado a partir de assets/cards. React Native exige rutas estáticas en los
// imports de assets, así que esto es una tabla explícita id -> arte.
// El dorso de la carta (para la tirada y como fallback visual).
export const DORSO = reverso;

export const IMAGENES: Record<CartaId, number> = {
  'mayor-00': i0,
  'mayor-01': i1,
  'mayor-02': i2,
  'mayor-03': i3,
  'mayor-04': i4,
  'mayor-05': i5,
  'mayor-06': i6,
  'mayor-07': i7,
  'mayor-08': i8,
  'mayor-09': i9,
  'mayor-10': i10,
  'mayor-11': i11,
  'mayor-12': i12,
  'mayor-13': i13,
  'mayor-14': i14,
  'mayor-15': i15,
  'mayor-16': i16,
  'mayor-17': i17,
  'mayor-18': i18,
  'mayor-19': i19,
  'mayor-20': i20,
  'mayor-21': i21,
  'copas-as': i22,
  'copas-dos': i23,
  'copas-tres': i24,
  'copas-cuatro': i25,
  'copas-cinco': i26,
  'copas-seis': i27,
  'copas-siete': i28,
  'copas-ocho': i29,
  'copas-nueve': i30,
  'copas-diez': i31,
  'copas-sota': i32,
  'copas-caballo': i33,
  'copas-reina': i34,
  'copas-rey': i35,
  'oros-as': i36,
  'oros-dos': i37,
  'oros-tres': i38,
  'oros-cuatro': i39,
  'oros-cinco': i40,
  'oros-seis': i41,
  'oros-siete': i42,
  'oros-ocho': i43,
  'oros-nueve': i44,
  'oros-diez': i45,
  'oros-sota': i46,
  'oros-caballo': i47,
  'oros-reina': i48,
  'oros-rey': i49,
  'espadas-as': i50,
  'espadas-dos': i51,
  'espadas-tres': i52,
  'espadas-cuatro': i53,
  'espadas-cinco': i54,
  'espadas-seis': i55,
  'espadas-siete': i56,
  'espadas-ocho': i57,
  'espadas-nueve': i58,
  'espadas-diez': i59,
  'espadas-sota': i60,
  'espadas-caballo': i61,
  'espadas-reina': i62,
  'espadas-rey': i63,
  'bastos-as': i64,
  'bastos-dos': i65,
  'bastos-tres': i66,
  'bastos-cuatro': i67,
  'bastos-cinco': i68,
  'bastos-seis': i69,
  'bastos-siete': i70,
  'bastos-ocho': i71,
  'bastos-nueve': i72,
  'bastos-diez': i73,
  'bastos-sota': i74,
  'bastos-caballo': i75,
  'bastos-reina': i76,
  'bastos-rey': i77,
};
