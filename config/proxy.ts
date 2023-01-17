const urlPaths: any = {
  dev: 'https://dev.abc.cn', // 开发环境
  test: 'https://qa.abc.cn', // 测试环境
  prod: 'https://abc.cn', // 正式环境
};
const baseUrl = urlPaths[process.env.REACT_APP_ENV];
export default {
  '/api/**': {
    target: baseUrl,
    secure: false,
    changeOrigin: true,
  },
};
