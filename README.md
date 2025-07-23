# Vite + React + TypeScript + Ant Design 管理后台

> 🚀 基于现代前端技术栈构建的企业级管理后台模板

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-5.0-1890FF.svg)](https://ant.design/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

## ✨ 特性

- 🚀 **现代技术栈** - Vite 6 + React 19 + TypeScript 5 + Ant Design 5
- 📦 **轻量状态管理** - Zustand 状态管理，支持持久化
- 🛣️ **完整路由系统** - React Router v7，支持权限控制
- 🎨 **企业级 UI** - Ant Design 5，60+ 高质量组件
- 📱 **响应式设计** - 支持多种屏幕尺寸自适应
- 🔧 **开发工具链** - ESLint + Prettier + Husky 代码质量保障
- 📋 **动态表单系统** - 基于配置的表单生成，支持联动和验证
- 📊 **数据表格** - 功能完整的表格组件，支持分页、筛选、排序
- 🌐 **网络请求** - Axios 封装，统一错误处理和拦截器
- 🎯 **TypeScript** - 完整类型定义，更好的开发体验
- 🐳 **容器化支持** - Docker 配置，支持容器化部署
- 🔄 **CI/CD** - GitHub Actions 自动化工作流

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装和启动

```bash
# 克隆项目
git clone <repository-url>
cd vite-antd-pc

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 浏览器访问 http://localhost:8000
```

### 可用脚本

```bash
npm run dev          # 启动开发服务器
npm run build        # 构建生产版本
npm run preview      # 预览构建结果
npm run lint         # 代码检查
npm run lint:fix     # 自动修复代码问题
npm run type-check   # TypeScript 类型检查
npm run format       # 代码格式化
```

## 📁 项目结构

```
vite-antd-pc/
├── docs/                      # 📚 项目文档
├── src/
│   ├── api/                   # 🌐 API 接口层
│   ├── component/             # 🧩 组件库
│   │   ├── business/          # 业务组件
│   │   ├── form/              # 表单组件系统
│   │   ├── layout/            # 布局组件
│   │   └── table/             # 表格组件
│   ├── hook/                  # 🎣 自定义 Hooks
│   ├── page/                  # 📄 页面组件
│   ├── route/                 # 🛣️ 路由配置
│   ├── store/                 # 🗂️ 状态管理
│   ├── style/                 # 🎨 样式文件
│   ├── types/                 # 📝 类型定义
│   └── utils/                 # 🔧 工具函数
├── .vscode/                   # VSCode 配置
├── .github/                   # GitHub Actions
└── docker/                    # Docker 配置
```

## 🎨 核心功能

### 动态表单系统

```typescript
import { Form } from '@/component';

const fields = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    rules: [{ required: true }],
  },
  {
    type: 'select',
    label: '角色',
    name: 'role',
    cProps: { fetch: getRoleOptions },
  },
];

<Form fields={fields} onFinish={handleSubmit} />
```

### 数据表格

```typescript
import { PageTable } from '@/component';

<PageTable
  fetch={getUserList}
  columns={columns}
  searchFields={searchFields}
/>
```

### 状态管理

```typescript
import { create } from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

## 📖 文档

详细文档请查看 [docs](./docs) 目录：

- [📚 文档中心](./docs/README.md) - 完整的文档导航
- [🏗️ 技术方案](./docs/technical-solution.md) - 详细的技术方案文档
- [🎯 开发指南](./docs/development-guide.md) - 开发规范和最佳实践
- [📐 系统架构](./docs/architecture.md) - 系统架构图和设计说明

## 🛠️ 技术栈

| 技术                                          | 版本 | 说明         |
| --------------------------------------------- | ---- | ------------ |
| [React](https://reactjs.org/)                 | 19.x | 前端框架     |
| [TypeScript](https://www.typescriptlang.org/) | 5.x  | 类型系统     |
| [Vite](https://vitejs.dev/)                   | 6.x  | 构建工具     |
| [Ant Design](https://ant.design/)             | 5.x  | UI 组件库    |
| [Zustand](https://github.com/pmndrs/zustand)  | 5.x  | 状态管理     |
| [React Router](https://reactrouter.com/)      | 7.x  | 路由管理     |
| [Axios](https://axios-http.com/)              | 1.x  | HTTP 客户端  |
| [Sass](https://sass-lang.com/)                | 1.x  | CSS 预处理器 |

## 🐳 Docker 部署

```bash
# 构建镜像
docker build -t vite-antd-pc .

# 运行容器
docker run -p 80:80 vite-antd-pc

# 使用 docker-compose
docker-compose up -d
```

## 🤝 贡献

欢迎贡献代码！请查看 [贡献指南](./CONTRIBUTING.md) 了解详情。

### 开发流程

1. Fork 项目
2. 创建特性分支: `git checkout -b feature/amazing-feature`
3. 提交更改: `git commit -m 'feat: add amazing feature'`
4. 推送分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

## 📄 许可证

本项目基于 [MIT](./LICENSE) 许可证开源。

## 🙏 致谢

感谢所有贡献者和以下开源项目：

- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Ant Design](https://ant.design/) - 企业级 UI 设计语言
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集

---

⭐ 如果这个项目对你有帮助，请给我们一个 Star！
