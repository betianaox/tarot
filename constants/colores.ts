// Paleta central de Tarot. Usar estas constantes en vez de literales sueltos,
// así el tema se ajusta desde un solo lugar y queda parejo entre pantallas.
export const COLORES = {
  fondo: '#17100A', // oscuro cálido de las pantallas de fondo plano
  marfil: '#F5EFE0', // títulos y texto principal
  oro: '#C9A227', // acento dorado (bordes de botones/cartas)
  oroClaro: '#D9B94A', // acento dorado claro (etiquetas de sección)
  // Bordó del dorso del mazo, para superficies con identidad de tarot.
  bordo: '#5A1B2B',
  bordoOscuro: '#3A0E18',
} as const;
