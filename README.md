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

#### [编码规范](https://github.com/luozyiii/code-guide)

#### 目录

```bash
├── .vscode                     # 该项目 vscode 配置
├── config                      # 项目配置
│   └── proxy.ts                # 代理
├── public                      # 资源文件
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

### 遇到问题？

##### Qa: Cannot access '...' before initialization? es module 循环引用导致

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

### antd form 表单封装

```bash
# input 类型
input
inputGroup
textarea
password

#
```

### thank you
