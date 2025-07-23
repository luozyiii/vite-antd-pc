import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsConfigPaths from 'vite-tsconfig-paths';
import legacy from '@vitejs/plugin-legacy';
import proxyServer from './config/proxy';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isProd = command === 'build';

  return {
    resolve: {
      alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    },
    server: {
      host: '0.0.0.0',
      port: 8000,
      proxy: proxyServer,
      open: true, // 自动打开浏览器
    },
    preview: {
      port: 4173,
      proxy: proxyServer,
    },
    build: {
      target: 'es2015',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: !isProd,
      minify: isProd ? 'terser' : false,
      terserOptions: isProd ? {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      } : undefined,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            // 将 node_modules 中的包分离到 vendor chunk
            if (id.includes('node_modules')) {
              // React 相关
              if (id.includes('react') || id.includes('react-dom')) {
                return 'vendor-react';
              }
              // Ant Design 相关
              if (id.includes('antd') || id.includes('@ant-design')) {
                return 'vendor-antd';
              }
              // 路由相关
              if (id.includes('react-router')) {
                return 'vendor-router';
              }
              // 状态管理
              if (id.includes('zustand')) {
                return 'vendor-store';
              }
              // 工具库
              if (id.includes('lodash') || id.includes('dayjs') || id.includes('axios')) {
                return 'vendor-utils';
              }
              // 拖拽相关
              if (id.includes('@dnd-kit')) {
                return 'vendor-dnd';
              }
              // 其他第三方库
              return 'vendor-libs';
            }
          },
        },
      },
      chunkSizeWarningLimit: 1000, // 将警告阈值提高到 1000kb
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
          // 在新版本的 Vite 中，我们不需要手动清理这些属性
          // Vite 会自动处理 HMR 的依赖关系
          return modules;
        },
      },
    ].filter(Boolean),
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/style/custom.scss" as *;',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.REACT_APP_ENV),
    },
  };
});
