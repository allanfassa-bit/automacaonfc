import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    root: process.cwd(),
    base: '/',
    plugins: [
      {
        name: 'ensure-dist',
        apply: 'build',
        buildStart() {
          fs.mkdirSync(path.resolve(process.cwd(), 'dist'), { recursive: true });
        },
        generateBundle() {
          fs.mkdirSync(path.resolve(process.cwd(), 'dist'), { recursive: true });
        }
      },
      react(), 
      tailwindcss(),
    ],
    build: {
      outDir: path.resolve(process.cwd(), 'dist'),
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
    },
    resolve: {
      alias: {
        '@': path.resolve(process.cwd(), '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
