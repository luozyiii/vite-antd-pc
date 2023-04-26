const path = require('path');

const port = 3001; // 端口

// 当前项目地址
const projectPath = path.join(__dirname, '../dist');
const entryHtml = 'index.html'; // 入口html

// 代理
const proxyOptions = {
  // target: "https://api.com", // target host
  target: 'http://xxx.com/api',
  changeOrigin: true, // needed for virtual hosted sites
  ws: true, // proxy websockets
  pathRewrite: {
    '^/api': '',
    // "^/api/remove/path": "/path",
  },
  router: {
    'dev.localhost:3000': 'http://localhost:8000',
  },
};

module.exports = {
  port,
  projectPath,
  entryHtml,
  proxyOptions,
};
