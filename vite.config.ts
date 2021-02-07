import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve, join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, './src/client/'),
  },
  plugins: [
    vue(),
    tsconfigPaths({
      root: join(__dirname, 'vite-ts-config'),
    }),
  ],
});
