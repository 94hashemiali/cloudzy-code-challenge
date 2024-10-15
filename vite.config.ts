import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import topLevelAwait from "vite-plugin-top-level-await";
import { viteRequire } from 'vite-require';
import VitePluginVueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePluginVueDevTools(),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: i => `__tla_${i}`
    }),
    viteRequire(/* options */)
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.vue', '.json', '.scss'],
    alias: {
      '@': resolve(dirname(fileURLToPath(import.meta.url)), 'src')
    }
  },
})