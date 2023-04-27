import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import legacy from '@vitejs/plugin-legacy';
import proxyServer from './config/proxy';

export default defineConfig(({ command }) => {
  const isProd = command === 'build'; // build 独有配置
  return {
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      host: '0.0.0.0',
      port: 8000,
      proxy: proxyServer,
    },
    preview: {
      proxy: proxyServer,
    },
    plugins: [
      react(),
      tsConfigPaths(),
      isProd &&
        legacy({
          targets: ['defaults', 'not IE 11'],
        }),
      {
        name: 'singleHMR',
        handleHotUpdate({ modules }) {
          modules.map((m) => {
            m.importedModules = new Set();
            m.importers = new Set();
          });

          return modules;
        },
      },
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/style/custom.scss";',
        },
      },
    },
  };
});
