// @ts-check
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  {
    ignores: ['dist', 'node_modules', 'serve'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      import: importPlugin,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,

      // 注释符后添加空格
      'spaced-comment': ['error', 'always', { markers: ['/'] }],

      // Unused imports
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // React 相关
      'react/display-name': 'off',
      'react/prop-types': 'off', // 使用TypeScript，不需要prop-types
      'react/jsx-uses-react': 'off', // React 17+ 不需要导入 React
      'react/react-in-jsx-scope': 'off', // React 17+ 不需要导入 React
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // TypeScript 相关
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-var-requires': 'error',

      // 代码质量
      'prefer-const': 'error',
      'no-var': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'no-alert': 'warn',

      // Import 排序规则
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js 内置模块
            'external', // 第三方库
            'internal', // 内部模块 (@/...)
            'parent', // 父级目录 (../)
            'sibling', // 同级目录 (./)
            'index', // index 文件
            'object', // object imports
            'type', // 类型导入
          ],
          pathGroups: [
            // React 相关 - 最高优先级
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react/**', group: 'builtin', position: 'before' },

            // Antd 相关 - 在框架之后
            { pattern: 'antd', group: 'external', position: 'after' },
            { pattern: 'antd/**', group: 'external', position: 'after' },
            { pattern: '@ant-design/**', group: 'external', position: 'after' },

            // 内部模块
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          distinctGroup: false,
          warnOnUnassignedImports: false,
        },
      ],

      // Import 相关规则
      'import/no-unresolved': 'off', // 关闭未解析导入检查，由 TypeScript 处理
      'import/named': 'off', // 关闭命名导入检查，由 TypeScript 处理
      'import/default': 'off', // 关闭默认导入检查，由 TypeScript 处理
      'import/namespace': 'off', // 关闭命名空间导入检查，由 TypeScript 处理
      'import/no-duplicates': 'error', // 禁止重复导入
      'import/no-self-import': 'error', // 禁止自导入
      'import/no-cycle': 'warn', // 警告循环依赖
      'import/no-useless-path-segments': 'error', // 禁止无用的路径段
      'import/newline-after-import': 'error', // 导入后需要换行
    },
  },
);
