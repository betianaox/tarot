// Medidas de layout compartidas por las pantallas CON marco dorado, para que
// el aire desde el borde sea consistente en todas. La Home NO usa esto: no
// tiene marco, así que va con padding más chico, pegada al borde de pantalla.
export const LAYOUT = {
  aire: 32, // padding horizontal desde el marco (✕, contenido, botones)
  aireTop: 30, // padding superior desde el marco (✕ / contador de gemas)
} as const;
