// 后端接口服务配置
interface ProxyConfig {
  [key: string]: string;
}

const urlPaths: ProxyConfig = {
  dev: 'https://dev.api.cn', // 开发环境
  test: 'https://qa.api.cn', // 测试环境
  prod: 'https://api.cn', // 正式环境
};

const env = process.env.REACT_APP_ENV || 'dev';
const baseUrl = urlPaths[env] || urlPaths.dev;

export default {
  '/api': {
    target: baseUrl,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(/^\/api/, ''),
    configure: (proxy: any, _options: any) => {
      proxy.on('error', (err: any, _req: any, _res: any) => {
        console.log('proxy error', err);
      });
      proxy.on('proxyReq', (proxyReq: any, req: any, _res: any) => {
        console.log('Sending Request to the Target:', req.method, req.url);
      });
      proxy.on('proxyRes', (proxyRes: any, req: any, _res: any) => {
        console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
      });
    },
  },
};
