# vite-antd-pc

vite + antd pc 模版 [github](https://github.com/luozyiii/vite-antd-pc)

### 整体架构

#### 基础

###### [前端开发与构建工具 vite](https://cn.vitejs.dev/guide/)

###### [vite 支持 react](https://www.npmjs.com/package/@vitejs/plugin-react)

###### [用于构建用户界面的 JavaScript 库 React](https://react.docschina.org/)

###### [路由 react-router](https://reactrouter.com/en/main)

###### [react-router-dom](https://www.npmjs.com/package/react-router-dom)

###### [组件库 antd](https://ant.design/index-cn)

#### 工具库

###### [基于 promise 的网络请求库 axios](https://www.axios-http.cn/)

###### [实用工具集 loadsh-es](https://www.lodashjs.com/)

###### [React hook 状态管理 zustand](https://github.com/pmndrs/zustand)

###### [日期处理 date-fns](https://www.npmjs.com/package/date-fns)

#### 编码规范

###### [可组装的 JavaScript 和 JSX 检查工具 ESLint](http://eslint.cn/docs/user-guide/getting-started)

###### [一个“有态度”的代码格式化工具 Prettier](https://www.prettier.cn/)

###### [git commit 规范 commitlint](https://commitlint.js.org/#/)

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

### 常用命令

```bash
# 开发
npm run start
# 构建
npm run build
```

### eslint 配置教程

```bash
# http://eslint.cn/docs/user-guide/getting-started
# 安装
npm install eslint --save-dev

# 设置配置，确定配置自动安排相应插件，并生成.eslintrc.js
./node_modules/.bin/eslint --init

# 调试 https://eslint.org/docs/latest/user-guide/command-line-interface#--fix
npx eslint --fix src/App.tsx

# import 导入排序
# https://github.com/import-js/eslint-plugin-import/blob/6304ddc70fc187e248aa65c69bc8983c5051ecd3/docs/rules/order.md
npm install eslint-plugin-import --save-dev
```

#### .eslintrc.js import/order 规则

```js
module.exports = {
  ...,
  plugins: ['eslint-plugin-import'],
  rules: {
    // 注释符后添加空格
    'spaced-comment': ['error', 'always'],
    // eslint-plugin-import 导入排序规则
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
        pathGroups: [
          {
            pattern: 'react**',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '.scss',
            group: 'type',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'never',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
  },
};

```

#### vscode 配置

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  }
}
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

### thank you
