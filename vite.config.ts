import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve, join } from 'path';
import svgLoader from 'vite-svg-loader';
// https://vitejs.dev/config/
export default defineConfig({
  alias: {
    '@': resolve(__dirname, './src/client/'),
  },
  plugins: [vue(), svgLoader()],
});
