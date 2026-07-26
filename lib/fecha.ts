// Fecha del dispositivo en formato YYYY-MM-DD (hora local, no UTC) — sirve
// como clave de "día calendario" para resetear gemas y Consejo del día.
// Comparable como string (2026-07-21 < 2026-07-22) sin parsear.
export function fechaDeHoy(): string {
  const ahora = new Date();
  const anio = ahora.getFullYear();
  const mes = String(ahora.getMonth() + 1).padStart(2, '0');
  const dia = String(ahora.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}
