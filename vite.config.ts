import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve, join } from 'path';
import svgLoader from 'vite-svg-loader';
// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, './src/client/'),
  },
  plugins: [
    vue(),
    svgLoader(),
    tsconfigPaths({
      root: join(__dirname, 'vite-ts-config'),
    }),
  ],
});
