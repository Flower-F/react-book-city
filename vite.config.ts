import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://106.14.223.52',
        changeOrigin: true,
      },
      '/public': {
        target: 'http://106.14.223.52',
        changeOrigin: true,
      },
    },
  },
});
