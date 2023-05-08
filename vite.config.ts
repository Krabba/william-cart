import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import livereload from 'rollup-plugin-livereload';

const DEVELOPMENT = process.env.DEVELOPMENT === 'true';

// https://vitejs.dev/config/
export default defineConfig({
  mode: DEVELOPMENT ? 'development' : 'production',
  plugins: [
    svelte({
      emitCss: false,
    }),
  ],
  build: {
    minify: DEVELOPMENT,
    rollupOptions: {
      plugins: [
        DEVELOPMENT &&
          livereload({
            clientUrl: 'http://localhost:35729/livereload.js?snipver=1',
            watch: 'dist',
            delay: 0,
          }),
      ],
      input: './src/main.ts',
      preserveEntrySignatures: 'strict',
      output: {
        entryFileNames: '[name].js',
        format: 'systemjs',
        name: null, // ensure anonymous System.register
        dir: 'dist',
      },
    },
  },
});
