// 后端接口服务
const urlPaths: any = {
  dev: 'https://dev.api.cn', // 开发环境
  test: 'https://qa.api.cn', // 测试环境
  prod: 'https://api.cn', // 正式环境
};
const baseUrl = urlPaths[process.env.REACT_APP_ENV] || 'https://api.cn';
export default {
  '/api': {
    target: baseUrl,
    changeOrigin: true,
  },
};
