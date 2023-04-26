# vite-antd-pc

vite 4 + react 18 + ts + react-router-dom v6 + zustand + antd 5

### 常用命令

```bash
# 开发
npm run start
# 构建
npm run build
```

### 整体架构

#### 基础

###### [前端开发与构建工具 vite](https://cn.vitejs.dev/guide/)

###### [vite 支持 react](https://www.npmjs.com/package/@vitejs/plugin-react)

###### [用于构建用户界面的 JavaScript 库 React](https://react.docschina.org/)

###### [类型系统 typescript](https://www.typescriptlang.org/)

###### [路由 react-router](https://reactrouter.com/en/main)

###### [react-router-dom](https://www.npmjs.com/package/react-router-dom)

###### [组件库 antd](https://ant.design/index-cn)

#### 工具库

###### [基于 promise 的网络请求库 axios](https://www.axios-http.cn/)

###### [实用工具集 loadsh-es](https://www.lodashjs.com/)

###### [React hook 状态管理 zustand](https://github.com/pmndrs/zustand)

###### [日期处理 date-fns](https://www.npmjs.com/package/date-fns)

> 备注：使用 dayjs, 与 antd 保持一致，纯了解 date-fns。

#### [编码规范](https://github.com/luozyiii/code-guide)

#### 目录

```bash
├── .vscode                     # 该项目 vscode 配置
├── config                      # 项目配置
│   └── proxy.ts                # 代理
├── public                      # 资源文件
├── serve                       # node 服务
├── src                         # 源码目录
│   ├── component               # 全局组件
│   ├── page                    # 页面组件
│   ├── route                   # 路由配置
│   ├── store                   # zustand：react hook 状态管理
│   ├── style                   # 样式自定义
│   ├── util                    # 工具库
│   │   └── index.ts            # 工具方法
│   ├── app.tsx                 # 主组件
│   ├── index.css               # 全局样式
│   ├── main.tsx                # 主入口
│   └── vite-env.d.ts
├── .commitlintrc.js            # git commit 规范配置
├── .eslintrc.js                # eslint 配置
├── .gitignore                  # git忽略文件
├── .prettierrc.js              # prettier 配置
├── index.html                  # html模版
├── package.json
├── README.md                   # 文档说明
├── tsconfig.json               # ts 配置
└── tsconfig.node.json          # ts node 配置

```

### zustand：react hook 状态管理

```ts
// 根目录store
// eg1: 简单使用 useBear.ts
import { create } from '@/store';

interface BearState {
  bear: number;
  increase: () => void;
  reduce: () => void;
}

const useBearStore = create<BearState>()((set) => ({
  bear: 0,
  increase: () => set((state) => ({ bear: state.bear + 1 })),
  reduce: () => set((state) => ({ bear: state.bear - 1 })),
}));

export default useBearStore;

// eg2: 持久化用户信息
import { create, persist, createJSONStorage } from '@/store';

interface UserInfoProps {
  name: string;
  phone: string | number;
}

interface UserInfoState {
  isLogin: boolean;
  token: string;
  userInfo: UserInfoProps | null;
  setUserInfo: (value: UserInfoProps) => void;
  setToken: (token: string) => void;
  reset: () => void;
}
/**
 * 登录信息
 * token信息
 * 用户信息
 * 持久化storage
 */
const useUserInfoStore = create<UserInfoState>()(
  persist(
    (set) => ({
      isLogin: false,
      token: '',
      userInfo: null,
      setUserInfo: (userInfo: UserInfoProps) => {
        set(() => ({ userInfo, isLogin: true }));
      },
      setToken: (token: string) => {
        set(() => ({ token }));
      },
      reset: () => {
        set(() => ({ userInfo: null, isLogin: false, token: '' }));
      },
    }),
    {
      name: 'USER_INFO',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useUserInfoStore;
```

### node 服务

> 快速验证打包后的产物，模拟生产环境，`类 nginx` 的环境

```bash
# 执行该命令前请先构建项目 npm run build
npm run serve
```

参考 [quick-nginx](https://github.com/luozyiii/quick-nginx)

### 遇到问题？

##### Qa1: Cannot access '...' before initialization? es module 循环引用导致

```ts
// https://github.com/vitejs/vite/issues/3033
// vite.config.ts
export default defineConfig({
  plugins: [
    // your plugins,
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
});
```

继续思考其他解决方案

##### Qa2: antd 样式在低版本浏览器无法识别

Ant Design 支持最近 2 个版本的现代浏览器。如果你需要兼容旧版浏览器，请根据实际需求进行降级处理：[样式兼容](https://ant.design/docs/react/compatible-style-cn)

[:where 兼容性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:where#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9%E6%80%A7)

##### Qa3: 部分用户（老板）没有关闭网页的习惯，在网页有新版本更新或问题修复时，用户继续使用旧的版本，影响用户体验和后端数据准确性。也有可能会出现报错（文件 404）、白屏的情况。

- 方法一：引入 React 错误边界来解决该问题，通过友好的提醒，让用户刷新浏览器。

```tsx
// src/component/error-boundary
import { ErrorBoundary as ErrorBoundaryComp } from 'react-error-boundary';
import styles from './index.module.scss';

function ErrorFallback({ error }: any) {
  function goHome() {
    location.href = '/';
  }

  return (
    <div className={styles.ErrorBoundaryBox}>
      <h1>Something went wrong: </h1>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button onClick={() => location.reload()}>刷新试试</button>&nbsp;&nbsp;
      <button onClick={goHome}>返回首页</button>
    </div>
  );
}

const ErrorBoundary: React.FC<any> = ({ children }) => {
  return <ErrorBoundaryComp FallbackComponent={ErrorFallback}>{children}</ErrorBoundaryComp>;
};

export default ErrorBoundary;
```

```tsx
// src/component/layout
<ErrorBoundary>
  <Outlet />
</ErrorBoundary>
```

- 方法二：检测网页更新并通知用户刷新，支持 vite、umijs 和 webpack 插件。例如：plugin-web-update-notification

> 我们使用 `react 错误边界`完全可以自己实现类似检测网页更新的功能。

### antd form 表单封装

#### 基础表单

- input
- number
- password
- textarea
- radio
- select
- checkbox
- switch

> checkbox select radio 的 options 支持异步获取

#### 日期时间

- datepicker
- daterangepicker
- timepicker
- timerangepicker

#### 上传

- upload

#### 自定义表单

- priceUnit

#### 表单联动

/demo/form/linkage

#### 筛选表单 FilterForm + PageTable

> /demo/form/filter

colType 属性

| colType | default | large |
| ------- | ------- | ----- |
| xxl     | 4       | 8     |
| xl      | 6       | 12    |
| lg      | 8       | 16    |
| md      | 12      | 24    |
| xs      | 24      | 24    |

#### useTable

hook/useTable

### axios 二次封装

util/fetch.ts

- 示例
  page/demo/project/fetch

### thank you
