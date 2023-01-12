# vite-antd-pc

vite + antd pc 模版

### 启动

```bash
npm run start
```

#### vite

[vite](https://cn.vitejs.dev/)
[vite 支持 react](https://www.npmjs.com/package/@vitejs/plugin-react)

### react-router-dom v6

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

### 常用库

- [lodash-es](https://www.npmjs.com/package/lodash-es)

- [date-fns：日期处理](https://www.npmjs.com/package/date-fns)

- [zustand：状态管理](https://github.com/pmndrs/zustand)

### 问题

##### Qa: Cannot access '...' before initialization, es 循环依赖导致

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
