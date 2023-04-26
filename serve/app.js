const path = require('path');
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const { port, projectPath, entryHtml, proxyOptions } = require('./config');

const app = express();

// 根路由
app.get('/', (req, res) => {
  res.sendFile(path.join(projectPath, entryHtml));
});

// 代理转发路由
const apiProxy = createProxyMiddleware(proxyOptions);
app.use('/api', apiProxy);

// 静态资源路由
const staticMiddleware = express.static(projectPath);
app.use(staticMiddleware);

// 未匹配的路由
app.get('*', (req, res) => {
  res.sendFile(path.join(projectPath, entryHtml));
});

app.listen(port, () => {
  console.log(`服务已启动，http://localhost:${port}`);
});
