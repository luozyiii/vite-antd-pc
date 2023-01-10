module.exports = {
  extends: ['react-app', 'plugin:react-hooks/recommended'],
  rules: {
    // 注释符后添加空格
    'spaced-comment': ['error', 'always'],
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    project: './tsconfig.json',
  },
};
