import { defineConfig } from 'vitest/config';

const ASSET = /\.(webp|png|jpe?g|gif|ttf|otf)(\?.*)?$/i;
const VIRTUAL = '\0stub-asset';

// Los assets binarios (imágenes, fuentes) no se pueden cargar en Node. Este
// plugin desvía cualquier import/require de un asset a un módulo virtual que
// exporta un número, para poder importar módulos que hacen require() de webp
// (p. ej. content/cartas/meta.ts) sin que vitest intente parsear el binario.
export default defineConfig({
  plugins: [
    {
      name: 'stub-assets',
      enforce: 'pre',
      resolveId(source) {
        if (ASSET.test(source)) {
          return VIRTUAL;
        }
        return null;
      },
      load(id) {
        if (id === VIRTUAL) {
          return 'export default 1;';
        }
        return null;
      },
    },
  ],
  test: {
    environment: 'node',
  },
});
