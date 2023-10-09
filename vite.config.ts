import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monkey, { cdn, util } from 'vite-plugin-monkey';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
  },
  plugins: [
    AutoImport({
      imports: [util.unimportPreset],
    }),
    vue(),
    monkey({
      entry: 'src/main.ts',
      userscript: {
        name: 'OneMonkey',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*/*'],
        "run-at": 'document-body',
        noframes: true,
        icon64URL: 'https://avatars.githubusercontent.com/u/35656100',
        icon64: 'https://avatars.githubusercontent.com/u/35656100',
        iconURL: 'https://avatars.githubusercontent.com/u/35656100'
      },
      clientAlias: '$',
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
});
