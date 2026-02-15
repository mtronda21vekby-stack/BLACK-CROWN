import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@blackcrown/assets': resolve(__dirname, '../../packages/assets/src'),
      '@blackcrown/core':   resolve(__dirname, '../../packages/core/src'),
      '@blackcrown/ui':     resolve(__dirname, '../../packages/ui/src'),
    },
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
  },
  server: { port: 5173 },
});
