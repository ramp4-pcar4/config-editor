import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig((viteConfig) => {
  const { command, mode } = viteConfig;
  if (command === 'build' && mode.includes('lib')) {
    return libConfig;
  } else {
    return regConfig;
  }
});

const libConfig = {
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  },
  define: {
    _global: {}
  },
  build: {
    target: 'esnext',
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Ramp4Editor',
      // the name of the output files when the build is run
      fileName: 'ramp4-editor'
    },
    rollupOptions: {
      external: ['ramp-pcar'],
      output: {
        inlineDynamicImports: true,
        globals: {
          vue: 'Vue'
        },
        dir: 'dist'
      }
    }
  }
};

const regConfig = {
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
};
