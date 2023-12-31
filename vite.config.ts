import { fileURLToPath } from 'node:url';
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
        icon: 'https://avatars.githubusercontent.com/u/35656100',
        namespace: 'npm/vite-plugin-monkey',
        match: ['*://*/*'],
        'run-at': 'document-body',
        description: 'Some useful tools, all in one',
        noframes: true,
        homepage: 'https://github.com/juckz/one-tampermonkey',
        downloadURL: 'https://github.com/JuckZ/one-tampermonkey/raw/gh-pages/one-tampermonkey.user.js',
        updateURL: 'https://github.com/JuckZ/one-tampermonkey/raw/gh-pages/one-tampermonkey.user.js',
        license: 'MIT',
        supportURL: 'https://github.com/JuckZ/one-tampermonkey/issues/new',
        icon64: 'https://avatars.githubusercontent.com/u/35656100',
      },
      clientAlias: '$',
      build: {
        externalGlobals: {
          vue: cdn.jsdelivr('Vue', 'dist/vue.global.prod.js'),
        },
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
    ],
  }
});
