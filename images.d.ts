// Permite importar imágenes con sintaxis `import` y tiparlas como el número que
// Metro/React Native devuelve para un asset. Usar import (en vez de require)
// deja que las herramientas de test intercepten el asset por su especificador.
declare module '*.webp' {
  const value: number;
  export default value;
}
